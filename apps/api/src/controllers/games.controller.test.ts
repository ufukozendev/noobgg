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
  getAllGamesController,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
} from './v1/games.controller';

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

describe('Games Controller', () => {
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

  describe('getAllGamesController', () => {
    it('should return all games successfully', async () => {
      const mockGames = [
        { 
          id: 1, 
          name: 'Counter-Strike 2', 
          description: 'Tactical FPS game',
          logo: 'https://example.com/cs2.png',
          createdAt: '2024-01-01T00:00:00Z',
          updatedAt: null,
          deletedAt: null
        },
        { 
          id: 2, 
          name: 'Valorant', 
          description: 'Tactical shooter',
          logo: 'https://example.com/valorant.png',
          createdAt: '2024-01-02T00:00:00Z',
          updatedAt: null,
          deletedAt: null
        }
      ];
      
      const fromMock = mock().mockResolvedValue(mockGames);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllGamesController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockGames);
    });

    it('should return empty array when no games exist', async () => {
      const mockGames: any[] = [];
      
      const fromMock = mock().mockResolvedValue(mockGames);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllGamesController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockGames);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext();
      await getAllGamesController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('getGameByIdController', () => {
    it('should return game by id successfully', async () => {
      const mockGame = { 
        id: 1, 
        name: 'Counter-Strike 2', 
        description: 'Tactical FPS game',
        logo: 'https://example.com/cs2.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };
      
      const whereMock = mock().mockResolvedValue([mockGame]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '1' });
      await getGameByIdController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockGame);
    });

    it('should return 400 for invalid id (non-numeric)', async () => {
      const c = mockContext({}, { id: 'abc' });
      await getGameByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid id (zero)', async () => {
      const c = mockContext({}, { id: '0' });
      await getGameByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid id (negative)', async () => {
      const c = mockContext({}, { id: '-1' });
      await getGameByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing id', async () => {
      const c = mockContext({}, {});
      await getGameByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if game not found', async () => {
      const whereMock = mock().mockResolvedValue([]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '999' });
      await getGameByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await getGameByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('createGameController', () => {
    it('should create a game successfully', async () => {
      const newGame = {
        name: 'League of Legends',
        description: 'MOBA game',
        logo: 'https://example.com/lol.png'
      };
      const createdGame = {
        id: 1,
        name: 'League of Legends',
        description: 'MOBA game',
        logo: 'https://example.com/lol.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([createdGame]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newGame);
      await createGameController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(valuesMock).toHaveBeenCalledWith(newGame);
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(createdGame, 201);
    });

    it('should create a game with minimal data (name only)', async () => {
      const newGame = { name: 'Minimal Game' };
      const createdGame = {
        id: 1,
        name: 'Minimal Game',
        description: null,
        logo: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([createdGame]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newGame);
      await createGameController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(valuesMock).toHaveBeenCalledWith(newGame);
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(createdGame, 201);
    });

    it('should return 400 if name is missing', async () => {
      const invalidData = { description: 'Game without name' };
      const c = mockContext(invalidData);
      await createGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.any(Array) })
      }), 400);
    });

    it('should return 400 if name is empty string', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData);
      await createGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.arrayContaining(["Name is required"]) })
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(151) };
      const c = mockContext(invalidData);
      await createGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 150 characters or less"]) },
      }), 400);
    });

    it('should return 400 if logo is too long', async () => {
      const invalidData = {
        name: 'Valid Game',
        logo: 'https://example.com/' + 'a'.repeat(250) + '.png'
      };
      const c = mockContext(invalidData);
      await createGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { logo: expect.arrayContaining(["Logo must be 255 characters or less"]) },
      }), 400);
    });

    it('should trim whitespace from name', async () => {
      const newGame = { name: '  Trimmed Game  ' };
      const expectedData = { name: 'Trimmed Game' };
      const createdGame = {
        id: 1,
        name: 'Trimmed Game',
        description: null,
        logo: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([createdGame]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newGame);
      await createGameController(c);

      expect(valuesMock).toHaveBeenCalledWith(expectedData);
      expect(mockJson).toHaveBeenCalledWith(createdGame, 201);
    });

    it('should return 500 on database error', async () => {
      const newGame = { name: 'Test Game' };

      const insertMock = db.insert as any;
      insertMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(newGame);
      await createGameController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('updateGameController', () => {
    it('should update a game successfully', async () => {
      const updateData = {
        name: 'Updated Game Name',
        description: 'Updated description',
        logo: 'https://example.com/updated.png'
      };
      const updatedGame = {
        id: 1,
        name: 'Updated Game Name',
        description: 'Updated description',
        logo: 'https://example.com/updated.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([updatedGame]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameController(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(updateData);
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(updatedGame);
    });

    it('should update only name field', async () => {
      const updateData = { name: 'Only Name Updated' };
      const updatedGame = {
        id: 1,
        name: 'Only Name Updated',
        description: 'Original description',
        logo: 'https://example.com/original.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([updatedGame]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameController(c);

      expect(setMock).toHaveBeenCalledWith(updateData);
      expect(mockJson).toHaveBeenCalledWith(updatedGame);
    });

    it('should return 400 for invalid ID (non-numeric)', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: 'abc' });
      await updateGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (zero)', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: '0' });
      await updateGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (negative)', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: '-1' });
      await updateGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing ID', async () => {
      const c = mockContext({ name: 'Valid Data' }, {});
      await updateGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 if name is empty string', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name cannot be empty"]) },
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(151) };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 150 characters or less"]) },
      }), 400);
    });

    it('should return 400 if logo is too long', async () => {
      const invalidData = {
        name: 'Valid Game',
        logo: 'https://example.com/' + 'a'.repeat(250) + '.png'
      };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { logo: expect.arrayContaining(["Logo must be 255 characters or less"]) },
      }), 400);
    });

    it('should return 400 if no valid fields provided for update', async () => {
      const emptyData = {};
      const c = mockContext(emptyData, { id: '1' });
      await updateGameController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "No valid fields provided for update" }, 400);
    });

    it('should trim whitespace from name', async () => {
      const updateData = { name: '  Trimmed Updated Name  ' };
      const expectedData = { name: 'Trimmed Updated Name' };
      const updatedGame = {
        id: 1,
        name: 'Trimmed Updated Name',
        description: null,
        logo: null,
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: '2024-01-02T00:00:00Z',
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([updatedGame]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameController(c);

      expect(setMock).toHaveBeenCalledWith(expectedData);
      expect(mockJson).toHaveBeenCalledWith(updatedGame);
    });

    it('should return 404 if game not found', async () => {
      const updateData = { name: 'Test' };

      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '999' });
      await updateGameController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const updateData = { name: 'Test' };

      const updateMock = db.update as any;
      updateMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(updateData, { id: '1' });
      await updateGameController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('deleteGameController', () => {
    it('should delete a game successfully', async () => {
      const deletedGame = {
        id: 1,
        name: 'Deleted Game',
        description: 'This game will be deleted',
        logo: 'https://example.com/deleted.png',
        createdAt: '2024-01-01T00:00:00Z',
        updatedAt: null,
        deletedAt: null
      };

      const returningMock = mock().mockResolvedValue([deletedGame]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '1' });
      await deleteGameController(c);

      expect(db.delete).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(deletedGame);
    });

    it('should return 400 for invalid ID (non-numeric)', async () => {
      const c = mockContext({}, { id: 'abc' });
      await deleteGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (zero)', async () => {
      const c = mockContext({}, { id: '0' });
      await deleteGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid ID (negative)', async () => {
      const c = mockContext({}, { id: '-1' });
      await deleteGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing ID', async () => {
      const c = mockContext({}, {});
      await deleteGameController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if game not found', async () => {
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '999' });
      await deleteGameController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const deleteMock = db.delete as any;
      deleteMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await deleteGameController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });
});
