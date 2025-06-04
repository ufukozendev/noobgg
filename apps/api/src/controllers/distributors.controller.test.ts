import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Context } from 'hono';
import { db } from '../db';
import { createDistributorController, updateDistributorController, getDistributorByIdController, getAllDistributorsController, deleteDistributorController } from './distributors.controller';
import { createDistributorSchema, updateDistributorSchema } from '../lib/zod-schemas/distributors';

// Mock the db module
vi.mock('../db', () => ({
  db: {
    insert: vi.fn().mockReturnThis(),
    values: vi.fn().mockReturnThis(),
    returning: vi.fn(),
    select: vi.fn().mockReturnThis(),
    from: vi.fn().mockReturnThis(),
    where: vi.fn().mockReturnThis(),
    update: vi.fn().mockReturnThis(),
    set: vi.fn().mockReturnThis(),
    delete: vi.fn().mockReturnThis(),
  },
}));

// Mock Hono's context
const mockContext = (body: any = {}, params: any = {}) => {
  const req = {
    json: vi.fn().mockResolvedValue(body),
    param: vi.fn((key) => params[key]),
  };
  return {
    req,
    json: vi.fn(),
  } as unknown as Context;
};


describe('Distributors Controller', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('createDistributorController', () => {
    it('should create a distributor successfully', async () => {
      const distributorData = { name: 'Test Distributor', description: 'Test Desc', website: 'http://test.com', logo: 'logo.png' };
      const mockDistributor = { id: 1, ...distributorData };
      (db.insert().values().returning as vi.Mock).mockResolvedValue([mockDistributor]);
      const c = mockContext(distributorData);

      await createDistributorController(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything()); // Assuming distributorsTable is passed
      expect(db.values).toHaveBeenCalledWith(distributorData);
      expect(db.returning).toHaveBeenCalled();
      expect(c.json).toHaveBeenCalledWith(mockDistributor, 201);
    });

    it('should return 400 if name is missing', async () => {
      const distributorData = { description: 'Test Desc' };
      const c = mockContext(distributorData);

      await createDistributorController(c);

      expect(c.json).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: [ 'Name is required' ] }
      }), 400);
    });

    it('should return 400 if name is longer than 255 characters', async () => {
      const distributorData = { name: 'a'.repeat(256) };
      const c = mockContext(distributorData);

      await createDistributorController(c);

      expect(c.json).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: [ 'Name must be 255 characters or less' ] }
      }), 400);
    });

    it('should return 400 if name is not a string', async () => {
      const distributorData = { name: 123 };
      const c = mockContext(distributorData);

      await createDistributorController(c);
      expect(c.json).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: [ "Expected string, received number" ] }
      }), 400);
    });

    it('should return 400 if website is longer than 255 characters', async () => {
      const distributorData = { name: "Valid Name", website: 'http://' + 'a'.repeat(248) + '.com' }; // > 255
      const c = mockContext(distributorData);
      await createDistributorController(c);
      expect(c.json).toHaveBeenCalledWith(expect.objectContaining({
         error: { website: [ 'Website must be 255 characters or less' ] }
      }), 400);
    });
  });

  describe('updateDistributorController', () => {
    it('should update a distributor successfully with partial data', async () => {
      const updateData = { description: 'Updated Description' };
      const mockUpdatedDistributor = { id: 1, name: 'Old Name', ...updateData };
      (db.update().set().where().returning as vi.Mock).mockResolvedValue([mockUpdatedDistributor]);
      const c = mockContext(updateData, { id: '1' });

      await updateDistributorController(c);

      expect(c.req.param).toHaveBeenCalledWith('id');
      expect(db.update).toHaveBeenCalledWith(expect.anything()); // distributorsTable
      expect(db.set).toHaveBeenCalledWith(updateData);
      expect(db.where).toHaveBeenCalledWith(expect.anything()); // eq(distributorsTable.id, 1)
      expect(db.returning).toHaveBeenCalled();
      expect(c.json).toHaveBeenCalledWith(mockUpdatedDistributor);
    });

    it('should return 400 if website is longer than 255 characters', async () => {
      const updateData = { website: 'http://' + 'a'.repeat(248) + '.com' }; // > 255
      const c = mockContext(updateData, { id: '1' });
      await updateDistributorController(c);
      expect(c.json).toHaveBeenCalledWith(expect.objectContaining({
        error: { website: [ 'Website must be 255 characters or less' ] }
      }), 400);
    });

    it('should return 400 if name is provided as a number', async () => {
      const updateData = { name: 123 };
      const c = mockContext(updateData, { id: '1' });
      await updateDistributorController(c);
      expect(c.json).toHaveBeenCalledWith(expect.objectContaining({
        error: { name: [ "Expected string, received number" ] }
      }), 400);
    });

    it('should return 400 for an invalid ID', async () => {
      const c = mockContext({}, { id: 'abc' });
      await updateDistributorController(c);
      expect(c.json).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 if distributor to update is not found', async () => {
      const updateData = { name: 'Any Name' };
      (db.update().set().where().returning as vi.Mock).mockResolvedValue([]); // Simulate not found
      const c = mockContext(updateData, { id: '999' });
      await updateDistributorController(c);
      expect(c.json).toHaveBeenCalledWith({ error: "Distributor not found" }, 404);
    });

    it('should return 400 if no data is provided for update', async () => {
      const c = mockContext({}, { id: '1' }); // Empty body
      await updateDistributorController(c);
      // The schema has all fields optional, so an empty object is valid by zod.
      // The controller has a specific check for empty result.data
      expect(c.json).toHaveBeenCalledWith({ error: "No data provided" }, 400);
    });
  });
});
