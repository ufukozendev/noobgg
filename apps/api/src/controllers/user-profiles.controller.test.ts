import { describe, it, expect, mock, beforeEach } from 'bun:test';
import { Context } from 'hono';

// Helper function for query builder mock
function createQueryBuilderMock() {
  return {
    from: mock().mockReturnThis(),
    where: mock().mockReturnThis(),
    returning: mock(),
    limit: mock(),
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
    transaction: mock(),
  }
}));

// Import AFTER mocking
import { db } from '../db';
import {
  getUserProfile,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
} from './v1/user-profiles.controller';

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

describe('UserProfiles Controller', () => {
  beforeEach(() => {
    mockJson.mockClear();
    mockReqJson.mockClear();

    // Reset db spies to prevent cross-test bleed
    (db.select as any).mockReset().mockReturnValue(createQueryBuilderMock());
    (db.insert as any).mockReset().mockReturnValue({
      values: mock().mockReturnValue({ returning: mock() }),
    });
    (db.update as any).mockReset().mockReturnValue({
      set: mock().mockReturnValue({
        where: mock().mockReturnValue({ returning: mock() }),
      }),
    });
    (db.transaction as any).mockReset();
  });

  describe('getUserProfile', () => {
    it('should return user profile successfully', async () => {
      const mockUser = {
        id: BigInt(1),
        userKeycloakId: 'keycloak-123',
        userName: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        gender: 'male',
        regionType: 'europe',
        createdAt: new Date(),
      };

      const whereMock = mock().mockResolvedValue([mockUser]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '1' });
      await getUserProfile(c);

      expect(db.select).toHaveBeenCalled();
      expect(fromMock).toHaveBeenCalledWith(expect.anything());
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      // BigInt conversion happens in convertBigIntToString function
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        id: '1',
        userKeycloakId: 'keycloak-123',
        userName: 'testuser',
      }));
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext({}, { id: 'invalid' });
      await getUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing id', async () => {
      const c = mockContext({}, {});
      await getUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 when user not found', async () => {
      const whereMock = mock().mockResolvedValue([]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: '1' });
      await getUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "User not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const selectMock = db.select as any;
      selectMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await getUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('createUserProfile', () => {
    const validUserData = {
      userKeycloakId: 'keycloak-123',
      userName: 'testuser',
      firstName: 'Test',
      lastName: 'User',
      gender: 'male',
      regionType: 'europe',
    };

    it('should create user profile successfully', async () => {
      const createdUser = {
        id: BigInt(1),
        ...validUserData,
        createdAt: new Date(),
      };

      // Mock successful transaction - no existing users, successful insert
      (db.transaction as any).mockImplementation(async (callback: any) => {
        const txMock = {
          select: mock().mockReturnValue({
            from: mock().mockReturnValue({
              where: mock().mockResolvedValue([]) // No existing users for both checks
            })
          }),
          insert: mock().mockReturnValue({
            values: mock().mockReturnValue({
              returning: mock().mockResolvedValue([createdUser])
            })
          })
        };
        return await callback(txMock);
      });

      const c = mockContext(validUserData);
      await createUserProfile(c);

      expect(db.transaction).toHaveBeenCalled();
      // BigInt conversion happens in convertBigIntToString function
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        id: '1',
        userKeycloakId: 'keycloak-123',
        userName: 'testuser',
      }), 201);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = { userName: '' }; // Missing required fields
      const c = mockContext(invalidData);
      await createUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Object) }),
        400
      );
    });

    it('should return 409 when Keycloak ID already exists', async () => {
      const existingUser = { id: BigInt(2), userKeycloakId: 'keycloak-123' };

      // Mock transaction that finds existing Keycloak ID
      (db.transaction as any).mockImplementation(async (callback: any) => {
        const txMock = {
          select: mock().mockReturnValue({
            from: mock().mockReturnValue({
              where: mock().mockResolvedValue([existingUser]) // Existing user found
            })
          })
        };
        return await callback(txMock);
      });

      const c = mockContext(validUserData);
      await createUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Keycloak ID already exists" }, 409);
    });

    it('should return 409 when username already exists', async () => {
      const existingUser = { id: BigInt(2), userName: 'testuser' };

      // Mock transaction: Keycloak ID check passes, username check fails
      (db.transaction as any).mockImplementation(async (callback: any) => {
        const txMock = {
          select: mock()
            .mockReturnValueOnce({
              from: mock().mockReturnValue({
                where: mock().mockResolvedValue([]) // No existing Keycloak ID
              })
            })
            .mockReturnValueOnce({
              from: mock().mockReturnValue({
                where: mock().mockResolvedValue([existingUser]) // Existing username
              })
            })
        };
        return await callback(txMock);
      });

      const c = mockContext(validUserData);
      await createUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Username already exists" }, 409);
    });

    it('should return 500 on database error', async () => {
      (db.transaction as any).mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(validUserData);
      await createUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('updateUserProfile', () => {
    const validUpdateData = {
      firstName: 'Updated',
      lastName: 'Name',
      gender: 'male',
      regionType: 'europe',
    };

    it('should update user profile successfully', async () => {
      const updatedUser = {
        id: BigInt(1),
        userKeycloakId: 'keycloak-123',
        userName: 'testuser',
        firstName: 'Updated',
        lastName: 'Name',
        gender: 'male',
        regionType: 'europe',
        updatedAt: new Date(),
      };

      // Mock successful update chain - AFTER beforeEach reset
      const returningMock = mock().mockResolvedValue([updatedUser]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      (db.update as any).mockReturnValue({ set: setMock });

      const c = mockContext(validUpdateData, { id: '1' });
      await updateUserProfile(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(expect.objectContaining({
        firstName: 'Updated',
        lastName: 'Name',
        updatedAt: expect.any(Date),
      }));
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      // BigInt conversion happens in convertBigIntToString function
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        id: '1',
        firstName: 'Updated',
        lastName: 'Name',
      }));
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext(validUpdateData, { id: 'invalid' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing id', async () => {
      const c = mockContext(validUpdateData, {});
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for invalid data', async () => {
      const invalidData = { userName: '' }; // Invalid username
      const c = mockContext(invalidData, { id: '1' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Object) }),
        400
      );
    });

    it('should return 400 for empty payload', async () => {
      // Empty body - updateUserProfileSchema will fail validation due to required fields
      const c = mockContext({}, { id: '1' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({ error: expect.any(Object) }),
        400
      );
    });

    it('should return 409 when Keycloak ID already exists for different user', async () => {
      const updateData = { userKeycloakId: 'keycloak-456', gender: 'male', regionType: 'europe' };
      const existingUser = { id: BigInt(2), userKeycloakId: 'keycloak-456' };

      const whereMock = mock().mockResolvedValue([existingUser]);
      const fromMock = mock().mockReturnValue({ where: whereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: fromMock });

      const c = mockContext(updateData, { id: '1' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Keycloak ID already exists" }, 409);
    });

    it('should return 409 when username already exists for different user', async () => {
      const updateData = { userName: 'existinguser', gender: 'male', regionType: 'europe' };
      const existingUser = { id: BigInt(2), userName: 'existinguser' };

      // Mock username check - since no Keycloak ID provided, only username check happens
      const usernameWhereMock = mock().mockResolvedValue([existingUser]);
      const usernameFromMock = mock().mockReturnValue({ where: usernameWhereMock });
      const selectMock = db.select as any;
      selectMock.mockReturnValue({ from: usernameFromMock });

      const c = mockContext(updateData, { id: '1' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Username already exists" }, 409);
    });

    it('should return 404 when user not found', async () => {
      // Mock update chain to return empty array (user not found)
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      (db.update as any).mockReturnValue({ set: setMock });

      const c = mockContext(validUpdateData, { id: '1' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "User not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      // Mock db.update to throw an error
      (db.update as any).mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext(validUpdateData, { id: '1' });
      await updateUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });

  describe('deleteUserProfile', () => {
    it('should delete user profile successfully (soft delete)', async () => {
      const deletedUser = {
        id: BigInt(1),
        userKeycloakId: 'keycloak-123',
        userName: 'testuser',
        firstName: 'Test',
        lastName: 'User',
        gender: 'male',
        regionType: 'europe',
        deletedAt: new Date(),
        updatedAt: new Date(),
      };

      const returningMock = mock().mockResolvedValue([deletedUser]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext({}, { id: '1' });
      await deleteUserProfile(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(expect.objectContaining({
        deletedAt: expect.any(Date),
        updatedAt: expect.any(Date),
      }));
      expect(whereMock).toHaveBeenCalledWith(expect.anything());
      expect(returningMock).toHaveBeenCalled();
      // BigInt conversion happens in convertBigIntToString function
      expect(mockJson).toHaveBeenCalledWith(expect.objectContaining({
        id: '1',
        userKeycloakId: 'keycloak-123',
        userName: 'testuser',
      }));
    });

    it('should return 400 for invalid id', async () => {
      const c = mockContext({}, { id: 'invalid' });
      await deleteUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 400 for missing id', async () => {
      const c = mockContext({}, {});
      await deleteUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Invalid id" }, 400);
    });

    it('should return 404 when user not found', async () => {
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext({}, { id: '1' });
      await deleteUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "User not found" }, 404);
    });

    it('should return 500 on database error', async () => {
      const updateMock = db.update as any;
      updateMock.mockImplementation(() => {
        throw new Error('Database error');
      });

      const c = mockContext({}, { id: '1' });
      await deleteUserProfile(c);

      expect(mockJson).toHaveBeenCalledWith({ error: "Internal server error" }, 500);
    });
  });
});