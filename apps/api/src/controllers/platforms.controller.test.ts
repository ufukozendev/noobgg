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
  getAllPlatformsController,
  getPlatformByIdController,
  createPlatformController,
  updatePlatformController,
  deletePlatformController,
} from './v1/platforms.controller';

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

describe('Platforms Controller', () => {
  beforeEach(() => {
    mockJson.mockClear();
    mockReqJson.mockClear();
  });

  describe('getAllPlatformsController', () => {
    it('should return all platforms successfully', async () => {
      const mockPlatforms = [
        { id: 1, name: 'PC' },
        { id: 2, name: 'PlayStation' }
      ];
      
      const fromMock = mock().mockResolvedValue(mockPlatforms);
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext();
      await getAllPlatformsController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockPlatforms);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext();
      await getAllPlatformsController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('getPlatformByIdController', () => {
    it('should return platform by id successfully', async () => {
      const mockPlatform = { id: 1, name: 'PC' };
      
      const whereMock = mock().mockResolvedValue([mockPlatform]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '1' });
      await getPlatformByIdController(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith(mockPlatform);
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext({}, { id: 'abc' });
      await getPlatformByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing id', async () => {
      const c = mockContext({}, {});
      await getPlatformByIdController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if platform not found', async () => {
      const whereMock = mock().mockResolvedValue([]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '999' });
      await getPlatformByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Platform not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await getPlatformByIdController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('createPlatformController', () => {
    it('should create a platform successfully', async () => {
      const newPlatform = { name: 'Xbox' };
      const createdPlatform = { id: 1, name: 'Xbox' };
      
      const returningMock = mock().mockResolvedValue([createdPlatform]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newPlatform);
      await createPlatformController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(valuesMock).toHaveBeenCalledWith(newPlatform);
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(createdPlatform, 201);
    });

    it('should return 400 if name is missing', async () => {
      const invalidData = {};
      const c = mockContext(invalidData);
      await createPlatformController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.any(Array) })
      }), 400);
    });

    it('should return 400 if name is empty string', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData);
      await createPlatformController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: expect.objectContaining({ name: expect.arrayContaining(["Name is required"]) })
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(101) };
      const c = mockContext(invalidData);
      await createPlatformController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 100 characters or less"]) },
      }), 400);
    });

    it('should return 500 on database error', async () => {
      const newPlatform = { name: 'Xbox' };
      
      const insertMock = db.insert as any;
      insertMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(newPlatform);
      await createPlatformController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('updatePlatformController', () => {
    it('should update a platform successfully', async () => {
      const updateData = { name: 'Updated Platform' };
      const updatedPlatform = { id: 1, name: 'Updated Platform' };
      
      const returningMock = mock().mockResolvedValue([updatedPlatform]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '1' });
      await updatePlatformController(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(updateData);
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(updatedPlatform);
    });

    it('should return 400 for invalid ID', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: 'abc' });
      await updatePlatformController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing ID', async () => {
      const c = mockContext({ name: 'Valid Data' }, {});
      await updatePlatformController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 if name is empty string', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData, { id: '1' });
      await updatePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name cannot be empty"]) },
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(101) };
      const c = mockContext(invalidData, { id: '1' });
      await updatePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 100 characters or less"]) },
      }), 400);
    });

    it('should return 400 if no data provided', async () => {
      const emptyData = {};
      const c = mockContext(emptyData, { id: '1' });
      await updatePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "No data provided" }, 400);
    });

    it('should return 404 if platform not found', async () => {
      const updateData = { name: 'Test' };
      
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext(updateData, { id: '999' });
      await updatePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Platform not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const updateData = { name: 'Test' };
      
      const updateMock = db.update as any;
      updateMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(updateData, { id: '1' });
      await updatePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('deletePlatformController', () => {
    it('should delete a platform successfully', async () => {
      const deletedPlatform = { id: 1, name: 'PC' };
      
      const returningMock = mock().mockResolvedValue([deletedPlatform]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '1' });
      await deletePlatformController(c);

      expect(db.delete).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(deletedPlatform);
    });

    it('should return 400 for invalid ID', async () => {
      const c = mockContext({}, { id: 'abc' });
      await deletePlatformController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing ID', async () => {
      const c = mockContext({}, {});
      await deletePlatformController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if platform not found', async () => {
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const deleteMock = db.delete as any;
      deleteMock.mockReturnValue({ where: whereMock });

      const c = mockContext({}, { id: '999' });
      await deletePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Platform not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const deleteMock = db.delete as any;
      deleteMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await deletePlatformController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });
});
