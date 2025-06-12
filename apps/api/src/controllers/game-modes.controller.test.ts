import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { Context } from 'hono';

// Mock the db module BEFORE importing anything that depends on it
mock.module('../db', () => ({
  db: {
    select: mock(),
    insert: mock(),
    update: mock(),
    delete: mock(),
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

    // Reset db mocks to prevent cross-test bleed
    (db.select as any).mockReset();
    (db.insert as any).mockReset();
    (db.update as any).mockReset();
    (db.delete as any).mockReset();
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
