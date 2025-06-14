import { beforeEach, describe, expect, it, mock } from 'bun:test';
import { Context } from 'hono';

// Helper function for query builder mock
function createQueryBuilderMock() {
  return {
    from: mock().mockReturnThis(),
    where: mock().mockReturnThis(),
    returning: mock(),
  };
}

// Mock the db module BEFORE importing anything that depends on it
mock.module('../db', () => ({
  db: {
    select: mock().mockReturnValue(createQueryBuilderMock()),
    insert: mock().mockReturnValue({
      values: mock().mockReturnValue({ returning: mock() })
    }),
    update: mock().mockReturnValue({
      set: mock().mockReturnValue({
        where: mock().mockReturnValue({ returning: mock() })
      })
    }),
    delete: mock().mockReturnValue({
      where: mock().mockReturnValue({ returning: mock() })
    }),
  }
}));

// Import AFTER mocking
import { db } from '../db';
import {
    createLobbyController,
    deleteLobbyController,
    getAllLobbiesController,
    getLobbyByIdController,
    updateLobbyController,
} from './v1/lobbies.controller';

// Mock Hono's context
const mockJson = mock();
const mockReqJson = mock();

const mockContext = (body?: Record<string, unknown>, params?: Record<string, string>) => ({
  req: {
    json: mockReqJson.mockResolvedValue(body || {}),
    param: (key: string) => params?.[key]
  },
  json: mockJson,
}) as unknown as Context;

describe('Lobbies Controller', () => {
  beforeEach(() => {
    mockJson.mockClear();
    mockReqJson.mockClear();

    // Reset db spies to a clean baseline to prevent cross-test bleed
    (db.select as any).mockReset().mockReturnValue(createQueryBuilderMock());
    (db.insert as any).mockReset().mockReturnValue({
      values: mock().mockReturnValue({ returning: mock() }),
    });
    (db.update as any).mockReset().mockReturnValue({
      set: mock().mockReturnValue({
        where: mock().mockReturnValue({ returning: mock() }),
      }),
    });
    (db.delete as any).mockReset().mockReturnValue({
      where: mock().mockReturnValue({ returning: mock() }),
    });
  });

  describe('getAllLobbiesController', () => {
    it('should return all lobbies successfully', async () => {
      const mockLobbies = [
        { 
          id: BigInt(1), 
          gameId: BigInt(1), 
          regionId: BigInt(1), 
          modeId: BigInt(1), 
          minTeamSize: 2, 
          maxTeamSize: 5,
          type: 'public',
          creatorId: BigInt(1),
          ownerId: BigInt(1)
        },
        { 
          id: BigInt(2), 
          gameId: BigInt(2), 
          regionId: BigInt(1), 
          modeId: BigInt(2), 
          minTeamSize: 1, 
          maxTeamSize: 4,
          type: 'private',
          creatorId: BigInt(2),
          ownerId: BigInt(2)
        }
      ];
      
      const fromMock = mock().mockResolvedValue(mockLobbies);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllLobbiesController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(expect.any(Array));
    });

    it('should return empty array when no lobbies exist', async () => {
      const fromMock = mock().mockResolvedValue([]);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllLobbiesController(c);

      expect(mockJson).toHaveBeenCalledWith([]);
    });
  });

  describe('getLobbyByIdController', () => {
    it('should return lobby by id successfully', async () => {
      const mockLobby = { 
        id: BigInt(1), 
        gameId: BigInt(1), 
        regionId: BigInt(1), 
        modeId: BigInt(1), 
        minTeamSize: 2, 
        maxTeamSize: 5,
        type: 'public',
        creatorId: BigInt(1),
        ownerId: BigInt(1)
      };
      
      const whereMock = mock().mockResolvedValue([mockLobby]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '1' });
      await getLobbyByIdController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw error for invalid id (non-numeric)', async () => {
      const c = mockContext({}, { id: 'abc' });
      
      await expect(getLobbyByIdController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error for invalid id (negative)', async () => {
      const c = mockContext({}, { id: '-1' });
      
      await expect(getLobbyByIdController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error for missing id', async () => {
      const c = mockContext({}, {});
      
      await expect(getLobbyByIdController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error if lobby not found', async () => {
      const whereMock = mock().mockResolvedValue([]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '999' });
      
      await expect(getLobbyByIdController(c)).rejects.toThrow('Lobby not found');
    });
  });

  describe('createLobbyController', () => {
    const validLobbyData = {
      gameId: 1,
      regionId: 1,
      modeId: 1,
      minTeamSize: 2,
      maxTeamSize: 5,
      type: 'public',
      creatorId: 1,
      ownerId: 1
    };

    it('should create a lobby successfully with required fields only', async () => {
      const createdLobby = { 
        id: BigInt(1), 
        ...validLobbyData,
        gameId: BigInt(1),
        regionId: BigInt(1),
        modeId: BigInt(1),
        creatorId: BigInt(1),
        ownerId: BigInt(1)
      };
      
      const returningMock = mock().mockResolvedValue([createdLobby]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(validLobbyData);
      await createLobbyController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(valuesMock).toHaveBeenCalledWith(expect.objectContaining({
        gameId: 1n,
        regionId: 1n,
        modeId: 1n,
        minTeamSize: 2,
        maxTeamSize: 5,
        creatorId: 1n,
        ownerId: 1n
      }));
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(expect.any(Object), 201);
    });

    it('should create a lobby successfully with all optional fields', async () => {
      const fullLobbyData = {
        ...validLobbyData,
        minRankId: 1,
        maxRankId: 5,
        isMicRequired: true,
        note: 'Looking for experienced players',
        discordLink: 'https://discord.gg/example'
      };

      const createdLobby = { 
        id: 1n, 
        ...fullLobbyData,
        gameId: 1n,
        regionId: 1n,
        modeId: 1n,
        minRankId: 1n,
        maxRankId: 5n,
        creatorId: 1n,
        ownerId: 1n
      };
      
      const returningMock = mock().mockResolvedValue([createdLobby]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(fullLobbyData);
      await createLobbyController(c);

      expect(valuesMock).toHaveBeenCalledWith(expect.objectContaining({
        minRankId: 1n,
        maxRankId: 5n,
        isMicRequired: true,
        note: 'Looking for experienced players',
        discordLink: 'https://discord.gg/example'
      }));
    });

    it('should throw error if gameId is missing', async () => {
      const invalidData = { ...validLobbyData };
      delete invalidData.gameId;
      
      const c = mockContext(invalidData);
      
      await expect(createLobbyController(c)).rejects.toThrow();
    });

    it('should throw error if minTeamSize is missing', async () => {
      const invalidData = { ...validLobbyData };
      delete invalidData.minTeamSize;
      
      const c = mockContext(invalidData);
      
      await expect(createLobbyController(c)).rejects.toThrow();
    });

    it('should throw error if maxTeamSize is missing', async () => {
      const invalidData = { ...validLobbyData };
      delete invalidData.maxTeamSize;
      
      const c = mockContext(invalidData);
      
      await expect(createLobbyController(c)).rejects.toThrow();
    });

    it('should throw error if creatorId is missing', async () => {
      const invalidData = { ...validLobbyData };
      delete invalidData.creatorId;
      
      const c = mockContext(invalidData);
      
      await expect(createLobbyController(c)).rejects.toThrow();
    });

    it('should throw error if ownerId is missing', async () => {
      const invalidData = { ...validLobbyData };
      delete invalidData.ownerId;
      
      const c = mockContext(invalidData);
      
      await expect(createLobbyController(c)).rejects.toThrow();
    });

    it('should throw error if discordLink is too long', async () => {
      const invalidData = { 
        ...validLobbyData,
        discordLink: 'a'.repeat(256)
      };
      
      const c = mockContext(invalidData);
      
      await expect(createLobbyController(c)).rejects.toThrow();
    });
  });

  describe('updateLobbyController', () => {
    const validUpdateData = {
      minTeamSize: 3,
      maxTeamSize: 6,
      note: 'Updated note'
    };

    it('should update a lobby successfully', async () => {
      const updatedLobby = { 
        id: 1n, 
        gameId: 1n,
        regionId: 1n,
        modeId: 1n,
        ...validUpdateData,
        creatorId: 1n,
        ownerId: 1n
      };
      
      const returningMock = mock().mockResolvedValue([updatedLobby]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(validUpdateData, { id: '1' });
      await updateLobbyController(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(expect.objectContaining({
        minTeamSize: 3,
        maxTeamSize: 6,
        note: 'Updated note'
      }));
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw error for invalid id', async () => {
      const c = mockContext(validUpdateData, { id: 'abc' });
      
      await expect(updateLobbyController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error for missing id', async () => {
      const c = mockContext(validUpdateData, {});
      
      await expect(updateLobbyController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error if no data provided', async () => {
      const c = mockContext({}, { id: '1' });
      
      await expect(updateLobbyController(c)).rejects.toThrow('No data provided');
    });

    it('should throw error if lobby not found', async () => {
      const returningMock = mock().mockResolvedValue([undefined]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(validUpdateData, { id: '999' });
      
      await expect(updateLobbyController(c)).rejects.toThrow('Lobby not found');
    });

    it('should handle BigInt conversion for update fields', async () => {
      const updateDataWithIds = {
        gameId: 2,
        regionId: 3,
        modeId: 4,
        minRankId: 1,
        maxRankId: 5,
        creatorId: 10,
        ownerId: 11
      };

      const updatedLobby = { 
        id: 1n, 
        ...updateDataWithIds,
        gameId: 2n,
        regionId: 3n,
        modeId: 4n,
        minRankId: 1n,
        maxRankId: 5n,
        creatorId: 10n,
        ownerId: 11n
      };
      
      const returningMock = mock().mockResolvedValue([updatedLobby]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateDataWithIds, { id: '1' });
      await updateLobbyController(c);

      expect(setMock).toHaveBeenCalledWith(expect.objectContaining({
        gameId: 2n,
        regionId: 3n,
        modeId: 4n,
        minRankId: 1n,
        maxRankId: 5n,
        creatorId: 10n,
        ownerId: 11n
      }));
    });
  });

  describe('deleteLobbyController', () => {
    it('should delete a lobby successfully', async () => {
      const deletedLobby = { 
        id: 1n, 
        gameId: 1n,
        regionId: 1n,
        modeId: 1n,
        minTeamSize: 2,
        maxTeamSize: 5,
        creatorId: 1n,
        ownerId: 1n
      };
      
      const returningMock = mock().mockResolvedValue([deletedLobby]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '1' });
      await deleteLobbyController(c);

      expect(db.delete).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(expect.any(Object));
    });

    it('should throw error for invalid id', async () => {
      const c = mockContext({}, { id: 'abc' });
      
      await expect(deleteLobbyController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error for missing id', async () => {
      const c = mockContext({}, {});
      
      await expect(deleteLobbyController(c)).rejects.toThrow('Invalid id');
    });

    it('should throw error if lobby not found', async () => {
      const returningMock = mock().mockResolvedValue([undefined]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '999' });
      
      await expect(deleteLobbyController(c)).rejects.toThrow('Lobby not found');
    });
  });
}); 