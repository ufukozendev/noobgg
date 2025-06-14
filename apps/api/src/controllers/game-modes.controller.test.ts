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
    select: mock(),
    insert: mock(),
    update: mock(),
    delete: mock(),
    transaction: mock(),
  }
}));

// Import AFTER mocking
import { db } from '../db';
import {
  getAllGameModesController,
} from './v1/game-modes.controller';

// Mock Hono's context
const mockJson = mock();

const mockContext = () => ({
  json: mockJson,
}) as unknown as Context;

describe('Game Modes Controller', () => {
  beforeEach(() => {
    mockJson.mockReset();

    // Reset db mocks to prevent cross-test bleed using mockImplementation for factory pattern
    (db.select as any).mockReset().mockImplementation(createQueryBuilderMock);
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

    // Provide default happy-path implementation for db.transaction to prevent false-negatives
    (db.transaction as any).mockReset().mockImplementation(async (cb: any) => {
      const txMock = {
        select: mock().mockImplementation(createQueryBuilderMock),
        insert: mock().mockReturnValue({
          values: mock().mockReturnValue({ returning: mock() }),
        }),
        update: mock().mockReturnValue({
          set: mock().mockReturnValue({
            where: mock().mockReturnValue({ returning: mock() }),
          }),
        }),
        delete: mock().mockReturnValue({
          where: mock().mockReturnValue({ returning: mock() }),
        }),
      };
      return await cb(txMock);
    });
  });

  describe('getAllGameModesController', () => {
    it('should return 501 not implemented status', async () => {
      const c = mockContext();
      await getAllGameModesController(c);

      expect(mockJson).toHaveBeenCalledWith(
        { message: "Game modes endpoint not implemented" },
        501
      );
    });

    it('should not interact with database since endpoint is not implemented', async () => {
      const c = mockContext();
      await getAllGameModesController(c);

      // Verify no database operations were attempted
      expect(db.select).not.toHaveBeenCalled();
      expect(db.insert).not.toHaveBeenCalled();
      expect(db.update).not.toHaveBeenCalled();
      expect(db.delete).not.toHaveBeenCalled();
    });
  });
});
