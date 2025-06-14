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
  getAllGameRanksController,
  getGameRankByIdController,
  createGameRankController,
  updateGameRankController,
  deleteGameRankController,
} from './v1/game-ranks.controller';

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

describe('Game Ranks Controller', () => {
  beforeEach(() => {
    mockJson.mockReset();
    mockReqJson.mockReset();
    // Reset all db mock calls
    (db.select as any).mockReset();
    (db.insert as any).mockReset();
    (db.update as any).mockReset();
    (db.delete as any).mockReset();
  });

  describe('getAllGameRanksController', () => {
    it('should return all game ranks successfully', async () => {
      const mockRanks = [
        { id: 1, name: 'Bronze', image: 'bronze.png', order: 1, gameId: 1 },
        { id: 2, name: 'Silver', image: 'silver.png', order: 2, gameId: 1 },
      ];

      const fromMock = mock().mockResolvedValue(mockRanks);
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllGameRanksController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(mockRanks);
    });

    it('should return 500 on database error', async () => {
      const fromMock = mock().mockRejectedValue(new Error('Database error'));
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllGameRanksController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('getGameRankByIdController', () => {
    it('should return game rank by id successfully', async () => {
      const mockRank = { id: 1, name: 'Bronze', image: 'bronze.png', order: 1, gameId: 1 };
      
      const whereMock = mock().mockResolvedValue([mockRank]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext(undefined, { id: '1' });
      await getGameRankByIdController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalled();
      expect(whereMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(mockRank);
    });

    it('should return 404 if game rank not found', async () => {
      const whereMock = mock().mockResolvedValue([]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext(undefined, { id: '999' });
      await getGameRankByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game rank not found" }, 404);
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext(undefined, { id: 'abc' });
      await getGameRankByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for negative id', async () => {
      const c = mockContext(undefined, { id: '-1' });
      await getGameRankByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for zero id', async () => {
      const c = mockContext(undefined, { id: '0' });
      await getGameRankByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 500 on database error', async () => {
      const whereMock = mock().mockRejectedValue(new Error('Database error'));
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext(undefined, { id: '1' });
      await getGameRankByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('createGameRankController', () => {
    it('should create game rank successfully', async () => {
      const newRank = { name: 'Gold', image: 'gold.png', order: 3, gameId: 1 };
      const createdRank = { id: 3, ...newRank };

      const returningMock = mock().mockResolvedValue([createdRank]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      (db.insert as any).mockReturnValue({ values: valuesMock });

      const c = mockContext(newRank);
      await createGameRankController(c);

      expect(db.insert).toHaveBeenCalled();
      expect(valuesMock).toHaveBeenCalledWith(expect.objectContaining(newRank));
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(createdRank, 201);
    });

    it('should return 400 if name is missing', async () => {
      const invalidData = { image: 'test.png', order: 1, gameId: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({
        error: { name: ["Required"] }
      }, 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(101), image: 'test.png', order: 1, gameId: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 100 characters or less"]) },
      }), 400);
    });

    it('should return 400 if image is missing', async () => {
      const invalidData = { name: 'Gold', order: 1, gameId: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({
        error: { image: ["Required"] }
      }, 400);
    });

    it('should return 400 if image is too long', async () => {
      const invalidData = { name: 'Gold', image: 'a'.repeat(256), order: 1, gameId: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { image: expect.arrayContaining(["Image must be 255 characters or less"]) },
      }), 400);
    });

    it('should return 400 if order is negative', async () => {
      const invalidData = { name: 'Gold', image: 'gold.png', order: -1, gameId: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { order: expect.arrayContaining(["Order must be non-negative"]) },
      }), 400);
    });

    it('should return 400 if order is not integer', async () => {
      const invalidData = { name: 'Gold', image: 'gold.png', order: 1.5, gameId: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { order: expect.arrayContaining(["Order must be an integer"]) },
      }), 400);
    });

    it('should return 400 if gameId is missing', async () => {
      const invalidData = { name: 'Gold', image: 'gold.png', order: 1 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({
        error: { gameId: ["Required"] }
      }, 400);
    });

    it('should return 400 if gameId is not positive', async () => {
      const invalidData = { name: 'Gold', image: 'gold.png', order: 1, gameId: 0 };
      const c = mockContext(invalidData);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { gameId: expect.arrayContaining(["Game ID is required"]) },
      }), 400);
    });

    it('should return 500 on database error', async () => {
      const newRank = { name: 'Gold', image: 'gold.png', order: 3, gameId: 1 };

      const returningMock = mock().mockRejectedValue(new Error('Database error'));
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      (db.insert as any).mockReturnValue({ values: valuesMock });

      const c = mockContext(newRank);
      await createGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('updateGameRankController', () => {
    it('should update game rank successfully', async () => {
      const updateData = { name: 'Updated Gold' };
      const updatedRank = { id: 1, name: 'Updated Gold', image: 'gold.png', order: 3, gameId: 1 };

      const returningMock = mock().mockResolvedValue([updatedRank]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      (db.update as any).mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameRankController(c);

      expect(db.update).toHaveBeenCalled();
      expect(setMock).toHaveBeenCalledWith(expect.objectContaining(updateData));
      expect(whereMock).toHaveBeenCalled();
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(updatedRank);
    });

    it('should return 404 if game rank not found', async () => {
      const updateData = { name: 'Updated Gold' };

      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      (db.update as any).mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '999' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game rank not found" }, 404);
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: 'abc' });
      await updateGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for negative id', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: '-1' });
      await updateGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for zero id', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: '0' });
      await updateGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 if no valid fields provided for update', async () => {
      const c = mockContext({}, { id: '1' });
      await updateGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "No valid fields provided for update" }, 400);
    });

    it('should return 400 if name is empty', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name is required"]) },
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(101) };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 100 characters or less"]) },
      }), 400);
    });

    it('should return 400 if image is empty', async () => {
      const invalidData = { image: '' };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { image: expect.arrayContaining(["Image is required"]) },
      }), 400);
    });

    it('should return 400 if image is too long', async () => {
      const invalidData = { image: 'a'.repeat(256) };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { image: expect.arrayContaining(["Image must be 255 characters or less"]) },
      }), 400);
    });

    it('should return 400 if order is negative', async () => {
      const invalidData = { order: -1 };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { order: expect.arrayContaining(["Order must be non-negative"]) },
      }), 400);
    });

    it('should return 400 if order is not integer', async () => {
      const invalidData = { order: 1.5 };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { order: expect.arrayContaining(["Order must be an integer"]) },
      }), 400);
    });

    it('should return 400 if gameId is not positive', async () => {
      const invalidData = { gameId: 0 };
      const c = mockContext(invalidData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { gameId: expect.arrayContaining(["Game ID is required"]) },
      }), 400);
    });

    it('should return 500 on database error', async () => {
      const updateData = { name: 'Updated Gold' };

      const returningMock = mock().mockRejectedValue(new Error('Database error'));
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      (db.update as any).mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updateGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('deleteGameRankController', () => {
    it('should delete game rank successfully', async () => {
      const deletedRank = { id: 1, name: 'Gold', image: 'gold.png', order: 3, gameId: 1 };

      const returningMock = mock().mockResolvedValue([deletedRank]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      (db.delete as any).mockReturnValue({ where: whereMock });

      const c = mockContext(undefined, { id: '1' });
      await deleteGameRankController(c);

      expect(db.delete).toHaveBeenCalled();
      expect(whereMock).toHaveBeenCalled();
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(deletedRank);
    });

    it('should return 404 if game rank not found', async () => {
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      (db.delete as any).mockReturnValue({ where: whereMock });

      const c = mockContext(undefined, { id: '999' });
      await deleteGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Game rank not found" }, 404);
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext(undefined, { id: 'abc' });
      await deleteGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for negative id', async () => {
      const c = mockContext(undefined, { id: '-1' });
      await deleteGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for zero id', async () => {
      const c = mockContext(undefined, { id: '0' });
      await deleteGameRankController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 500 on database error', async () => {
      const returningMock = mock().mockRejectedValue(new Error('Database error'));
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      (db.delete as any).mockReturnValue({ where: whereMock });

      const c = mockContext(undefined, { id: '1' });
      await deleteGameRankController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });
});
