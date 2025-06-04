import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Context } from 'hono';
import { db } from '../db';
import {
  createDistributorController,
  updateDistributorController,
  // getDistributorByIdController, // Not tested in this suite
  // getAllDistributorsController, // Not tested in this suite
  // deleteDistributorController   // Not tested in this suite
} from './distributors.controller';
// Removed unused imports for untested controllers to clean up.
// If tests for them were added, these would be re-introduced.
// import { createDistributorSchema, updateDistributorSchema } from '../lib/zod-schemas/distributors';
// Schemas are used by the controller, not directly by these tests after refactor.

// Mock the db module
vi.mock('../db', () => ({
  db: {
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  }
}));

// Mock Hono's context
const mockJson = vi.fn();
const mockReqJson = vi.fn();

const mockContext = (body?: any, params?: Record<string, string>) => ({
  req: {
    json: mockReqJson.mockResolvedValue(body || {}),
    param: (key: string) => params?.[key]
  },
  json: mockJson,
}) as unknown as Context;

describe('Distributors Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createDistributorController', () => {
    it('should create a distributor successfully', async () => {
      const newDistributor = { name: 'Test Distributor', website: 'http://test.com' };
      const createdDistributor = { id: 1, ...newDistributor };
      (db.insert(expect.anything()).values(expect.anything()).returning as vi.Mock).mockResolvedValue([createdDistributor]);

      const c = mockContext(newDistributor);
      await createDistributorController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(db.values).toHaveBeenCalledWith(newDistributor);
      expect(db.returning).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(createdDistributor, 201);
    });

    it('should return 400 if name is missing', async () => {
      const invalidData = { website: 'http://test.com' };
      const c = mockContext(invalidData);
      await createDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Required"]) }, // Adjusted to actual Zod default output
      }), 400);
    });

    it('should return 400 if name is too long', async () => {
      const invalidData = { name: 'a'.repeat(256) };
      const c = mockContext(invalidData);
      await createDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name must be 255 characters or less"]) },
      }), 400);
    });

    it('should return 400 if website is too long', async () => {
      const invalidData = { name: 'Valid Name', website: 'http://' + 'a'.repeat(250) + '.com' };
      const c = mockContext(invalidData);
      await createDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { website: expect.arrayContaining(["Website must be 255 characters or less"]) },
      }), 400);
    });

  });

  describe('updateDistributorController', () => {
    it('should update a distributor successfully', async () => {
      const updateData = { name: 'Updated Distributor' };
      const updatedDistributor = { id: 1, name: 'Updated Distributor' };
      (db.update(expect.anything()).set(expect.anything()).where(expect.anything()).returning as vi.Mock).mockResolvedValue([updatedDistributor]);

      const c = mockContext(updateData, { id: '1' });
      await updateDistributorController(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(db.set).toHaveBeenCalledWith(updateData);
      expect(db.where).toHaveBeenCalledWith(expect.anything());
      expect(db.returning).toHaveBeenCalled();
      expect(mockJson).toHaveBeenCalledWith(updatedDistributor);
    });

    it('should return 400 if name is an empty string', async () => {
      const invalidData = { name: '' };
      const c = mockContext(invalidData, { id: '1' });
      await updateDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: expect.arrayContaining(["Name cannot be empty"]) },
      }), 400);
    });

    it('should return 400 if website is too long', async () => {
      const invalidData = { website: 'http://' + 'a'.repeat(250) + '.com' };
      const c = mockContext(invalidData, { id: '1' });
      await updateDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        error: { website: expect.arrayContaining(["Website must be 255 characters or less"]) },
      }), 400);
    });

    it('should return 400 for invalid ID', async () => {
      const c = mockContext({ name: 'Valid Data' }, { id: 'abc' });
      await updateDistributorController(c);
      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if distributor not found', async () => {
      const updateData = { name: 'Test' };
      (db.update(expect.anything()).set(expect.anything()).where(expect.anything()).returning as vi.Mock).mockResolvedValue([]);

      const c = mockContext(updateData, { id: '999' });
      await updateDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Distributor not found" }, 404);
    });

    it('should return 400 if no valid fields provided for update', async () => {
      const emptyData = {};
      const c = mockContext(emptyData, { id: '1' });
      await updateDistributorController(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "No valid fields provided for update" }, 400);
    });
  });
});
