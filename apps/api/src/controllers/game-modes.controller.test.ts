import { describe, it, expect, mock, beforeEach } from 'bun:test';
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
  getAllGameModesController,
  getGameModeByIdController,
  createGameModeController,
  updateGameModeController,
  deleteGameModeController,
} from './v1/game-modes.controller';

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

describe('Game Modes Controller', () => {
  beforeEach(() => {
    mockJson.mockReset();
    mockReqJson.mockReset();

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

  describe('getAllGameModesController', () => {
    it('should return all game modes successfully', async () => {
      const mockGameModes = [
        { 
          id: 1, 
          name: 'Competitive',
          description: '5v5 ranked matches',
          order: 1,
          gameId: 1,
          minTeamSize: 5,
          maxTeamSize: 5,
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: null,
          deletedAt: null
        },
        { 
          id: 2, 
          name: 'Casual',
          description: 'Unranked matches',
          order: 2,
          gameId: 1,
          minTeamSize: 1,
          maxTeamSize: 10,
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: null,
          deletedAt: null
        }
      ];
      
      const fromMock = mock().mockResolvedValue(mockGameModes);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllGameModesController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockGameModes);
    });

    it('should return empty array when no game modes exist', async () => {
      const mockGameModes: any[] = [];
      
      const fromMock = mock().mockResolvedValue(mockGameModes);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllGameModesController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockGameModes);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext();
      await getAllGameModesController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('getGameModeByIdController', () => {
    it('should return game mode by id successfully', async () => {
      const mockGameMode = { 
        id: 1, 
        name: 'Competitive',
        description: '5v5 ranked matches',
        order: 1,
        gameId: 1,
        minTeamSize: 5,
        maxTeamSize: 5,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };
      
      const whereMock = mock().mockResolvedValue([mockGameMode]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '1' });
      await getGameModeByIdController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockGameMode);
    });

    it('should return 400 for invalid id (non-numeric)', async () => {
      const c = mockContext({}, { id: 'abc' });
      await getGameModeByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid id (zero)', async () => {
      const c = mockContext({}, { id: '0' });
      await getGameModeByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid id (negative)', async () => {
      const c = mockContext({}, { id: '-1' });
      await getGameModeByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing id', async () => {
      const c = mockContext({}, {});
      await getGameModeByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if game mode not found', async () => {
      const whereMock = mock().mockResolvedValue([]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '999' });
      await getGameModeByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game mode not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await getGameModeByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('createGameModeController', () => {
    it('should create a game mode successfully', async () => {
      const newGameMode = {
        name: 'Battle Royale',
        description: '100 players compete',
        order: 3,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 4
      };
      const createdGameMode = {
        id: 1,
        name: 'Battle Royale',
        description: '100 players compete',
        order: 3,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 4,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([createdGameMode]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newGameMode);
      await createGameModeController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(valuesMock).toHaveBeenCalledWith(expect.objectContaining({
        name: newGameMode.name,
        description: newGameMode.description,
        order: newGameMode.order,
        minTeamSize: newGameMode.minTeamSize,
        maxTeamSize: newGameMode.maxTeamSize,
        gameId: expect.any(BigInt)
      }));
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(createdGameMode, 201);
    });

    it('should create a game mode with gameId as string', async () => {
      const newGameMode = {
        name: 'Deathmatch',
        order: 4,
        gameId: "1",
        minTeamSize: 1,
        maxTeamSize: 8
      };
      const createdGameMode = {
        id: 1,
        name: 'Deathmatch',
        description: null,
        order: 4,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 8,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([createdGameMode]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newGameMode);
      await createGameModeController(c);

      expect(valuesMock).toHaveBeenCalledWith(expect.objectContaining({
        gameId: expect.any(BigInt)
      }));
      expect(mockJson).toHaveBeenCalledWith(createdGameMode, 201);
    });

    it('should return 400 if name is missing', async () => {
      const invalidData = { 
        description: 'Mode without name',
        order: 1,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 1
      };
      const c = mockContext(invalidData);
      await createGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.any(Array) })
      }), 400);
    });

    it('should return 400 if name is empty string', async () => {
      const invalidData = { 
        name: '',
        order: 1,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 1
      };
      const c = mockContext(invalidData);
      await createGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.any(Array) })
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { 
        name: 'a'.repeat(151),
        order: 1,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 1
      };
      const c = mockContext(invalidData);
      await createGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.any(Array) })
      }), 400);
    });

    it('should return 400 if required fields are missing', async () => {
      const invalidData = { name: 'Valid Name' };
      const c = mockContext(invalidData);
      await createGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(Object)
      }), 400);
    });

    it('should return 500 on database error', async () => {
      const newGameMode = {
        name: 'Test Mode',
        order: 1,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 1
      };

      const insertMock = db.insert as any;
      insertMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(newGameMode);
      await createGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('updateGameModeController', () => {
    it('should update a game mode successfully', async () => {
      const updateData = {
        name: 'Updated Competitive',
        description: 'Updated description',
        order: 5,
        minTeamSize: 3,
        maxTeamSize: 6
      };
      const updatedGameMode = {
        id: 1,
        name: 'Updated Competitive',
        description: 'Updated description',
        order: 5,
        gameId: 1,
        minTeamSize: 3,
        maxTeamSize: 6,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([updatedGameMode]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameModeController(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(updateData);
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(updatedGameMode);
    });

    it('should update gameId field with string conversion', async () => {
      const updateData = { 
        name: 'Updated Mode',
        gameId: "2"
      };
      const updatedGameMode = {
        id: 1,
        name: 'Updated Mode',
        description: 'Original description',
        order: 1,
        gameId: 2,
        minTeamSize: 1,
        maxTeamSize: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([updatedGameMode]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameModeController(c);

      expect(setMock).toHaveBeenCalledWith(expect.objectContaining({
        name: 'Updated Mode',
        gameId: expect.any(BigInt)
      }));
      expect(mockJson).toHaveBeenCalledWith(updatedGameMode);
    });

    it('should return 400 for invalid ID (non-numeric)', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: 'abc' });
      await updateGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (zero)', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: '0' });
      await updateGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (negative)', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: '-1' });
      await updateGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing ID', async () => {
      const c = mockContext({ name: 'Valid Data' }, {});
      await updateGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 if name is empty string', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(Object)
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(151) };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.any(Object)
      }), 400);
    });

    it('should return 400 if no valid fields provided for update', async () => {
      const emptyData = {};
      const c = mockContext(emptyData, { id: '1' });
      await updateGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "No valid fields provided for update" }, 400);
    });

    it('should return 404 if game mode not found', async () => {
      const updateData = { name: 'Test' };

      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '999' });
      await updateGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game mode not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const updateData = { name: 'Test' };

      const updateMock = db.update as any;
      updateMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(updateData, { id: '1' });
      await updateGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('deleteGameModeController', () => {
    it('should delete a game mode successfully', async () => {
      const deletedGameMode = {
        id: 1,
        name: 'Deleted Mode',
        description: 'This mode will be deleted',
        order: 1,
        gameId: 1,
        minTeamSize: 1,
        maxTeamSize: 1,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([deletedGameMode]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '1' });
      await deleteGameModeController(c);

      expect(db.delete).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(deletedGameMode);
    });

    it('should return 400 for invalid ID (non-numeric)', async () => {
      const c = mockContext({}, { id: 'abc' });
      await deleteGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (zero)', async () => {
      const c = mockContext({}, { id: '0' });
      await deleteGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (negative)', async () => {
      const c = mockContext({}, { id: '-1' });
      await deleteGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing ID', async () => {
      const c = mockContext({}, {});
      await deleteGameModeController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if game mode not found', async () => {
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '999' });
      await deleteGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game mode not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const deleteMock = db.delete as any;
      deleteMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await deleteGameModeController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });
});
