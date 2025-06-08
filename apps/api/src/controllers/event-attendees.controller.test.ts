import { describe, it, expect, mock, beforeEach } from "bun:test";
import { Context } from "hono";
import { db } from "../db";
import {
  getEventAttendees,
  getEventAttendeeById,
  getEventAttendeesByEvent,
  createEventAttendee,
  deleteEventAttendee,
} from "./event-attendees.controller";

// Mock the db module
mock.module("../db", () => ({
  db: {
    select: mock().mockReturnThis(),
    from: mock().mockReturnThis(),
    where: mock().mockReturnThis(),
    orderBy: mock().mockReturnThis(),
    limit: mock().mockReturnThis(),
    offset: mock().mockReturnThis(),
    insert: mock().mockImplementation(() => ({
      values: mock().mockImplementation(() => ({
        returning: mock(),
      })),
    })),
    update: mock().mockImplementation(() => ({
      set: mock().mockImplementation(() => ({
        where: mock().mockImplementation(() => ({
          returning: mock(),
        })),
      })),
    })),
    delete: mock().mockReturnThis(),
  },
}));

// Mock Hono's context
const mockJson = mock();
const mockReqJson = mock();
const mockReqQuery = mock();

const mockContext = (
  body?: Record<string, unknown>,
  params?: Record<string, string>,
  query?: Record<string, string>
) =>
  ({
    req: {
      json: mockReqJson.mockResolvedValue(body || {}),
      param: (key: string) => params?.[key],
      query: (key: string) => query?.[key],
    },
    json: mockJson,
  }) as unknown as Context;

describe("Event Attendees Controller", () => {
  beforeEach(() => {
    mockJson.mockClear();
    mockReqJson.mockClear();
    mockReqQuery.mockClear();
    // Clear all db mock calls
    (db.select as any).mockClear();
    (db.insert as any).mockClear();
    (db.update as any).mockClear();
  });

  describe("getEventAttendees", () => {
    it("should get all event attendees with pagination successfully", async () => {
      const mockAttendees = [
        {
          id: BigInt(1),
          eventId: BigInt(1),
          userProfileId: BigInt(1),
          joinedAt: new Date(),
        },
        {
          id: BigInt(2),
          eventId: BigInt(2),
          userProfileId: BigInt(2),
          joinedAt: new Date(),
        },
      ];
      const mockCount = [{ count: 10 }];

      // Mock the select chain for attendees
      const offsetMock = mock().mockResolvedValue(mockAttendees);
      const limitMock = mock().mockReturnValue({ offset: offsetMock });
      const orderByMock = mock().mockReturnValue({ limit: limitMock });
      const whereMock = mock().mockReturnValue({ orderBy: orderByMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValueOnce({ from: fromMock });

      // Mock the select chain for count
      const countFromMock = mock().mockReturnValue({
        where: mock().mockResolvedValue(mockCount),
      });
      (db.select as any).mockReturnValueOnce({ from: countFromMock });

      const c = mockContext({}, {}, { page: "1", limit: "10" });
      await getEventAttendees(c);

      expect(mockJson).toHaveBeenCalledWith({
        data: mockAttendees,
        pagination: {
          page: 1,
          limit: 10,
          total: 10,
          totalPages: 1,
        },
      });
    });

    it("should handle pagination parameters correctly", async () => {
      const mockAttendees: any[] = [];
      const mockCount = [{ count: 0 }];

      const offsetMock = mock().mockResolvedValue(mockAttendees);
      const limitMock = mock().mockReturnValue({ offset: offsetMock });
      const orderByMock = mock().mockReturnValue({ limit: limitMock });
      const whereMock = mock().mockReturnValue({ orderBy: orderByMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValueOnce({ from: fromMock });

      const countFromMock = mock().mockReturnValue({
        where: mock().mockResolvedValue(mockCount),
      });
      (db.select as any).mockReturnValueOnce({ from: countFromMock });

      const c = mockContext({}, {}, { page: "2", limit: "5" });
      await getEventAttendees(c);

      expect(mockJson).toHaveBeenCalledWith({
        data: mockAttendees,
        pagination: {
          page: 2,
          limit: 5,
          total: 0,
          totalPages: 0,
        },
      });
    });
  });

  describe("getEventAttendeeById", () => {
    it("should get event attendee by id successfully", async () => {
      const mockAttendee = {
        id: BigInt(1),
        eventId: BigInt(1),
        userProfileId: BigInt(1),
        joinedAt: new Date(),
      };

      const limitMock = mock().mockResolvedValue([mockAttendee]);
      const whereMock = mock().mockReturnValue({ limit: limitMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: "1" });
      await getEventAttendeeById(c);

      expect(mockJson).toHaveBeenCalledWith({ data: mockAttendee });
    });

    it("should return 404 if event attendee not found", async () => {
      const limitMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ limit: limitMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext({}, { id: "999" });
      await getEventAttendeeById(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "Event attendee not found" },
        404
      );
    });
  });

  describe("getEventAttendeesByEvent", () => {
    it("should get attendees by event id successfully", async () => {
      const mockAttendees = [
        {
          id: BigInt(1),
          eventId: BigInt(1),
          userProfileId: BigInt(1),
          joinedAt: new Date(),
        },
        {
          id: BigInt(2),
          eventId: BigInt(1),
          userProfileId: BigInt(2),
          joinedAt: new Date(),
        },
      ];

      const offsetMock = mock().mockResolvedValue(mockAttendees);
      const limitMock = mock().mockReturnValue({ offset: offsetMock });
      const orderByMock = mock().mockReturnValue({ limit: limitMock });
      const whereMock = mock().mockReturnValue({ orderBy: orderByMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext({}, { eventId: "1" }, { page: "1", limit: "10" });
      await getEventAttendeesByEvent(c);

      expect(mockJson).toHaveBeenCalledWith({ data: mockAttendees });
    });
  });

  describe("createEventAttendee", () => {
    it("should create event attendee successfully", async () => {
      const newAttendee = { eventId: "1", userProfileId: "1" };
      const createdAttendee = {
        id: BigInt(1),
        eventId: BigInt(1),
        userProfileId: BigInt(1),
        joinedAt: new Date(),
      };

      // Mock existing check - no existing attendee
      const limitMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ limit: limitMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      // Mock insert
      const returningMock = mock().mockResolvedValue([createdAttendee]);
      const valuesMock = mock().mockReturnValue({ returning: returningMock });
      const insertMock = db.insert as any;
      insertMock.mockReturnValue({ values: valuesMock });

      const c = mockContext(newAttendee);
      await createEventAttendee(c);

      expect(db.insert).toHaveBeenCalledWith(expect.anything());
      expect(mockJson).toHaveBeenCalledWith({ data: createdAttendee }, 201);
    });

    it("should return 400 if eventId is missing", async () => {
      const invalidData = { userProfileId: "1" };
      const c = mockContext(invalidData);
      await createEventAttendee(c);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          error: "Invalid input",
          details: expect.any(Object),
        }),
        400
      );
    });

    it("should return 400 if userProfileId is missing", async () => {
      const invalidData = { eventId: "1" };
      const c = mockContext(invalidData);
      await createEventAttendee(c);

      expect(mockJson).toHaveBeenCalledWith(
        expect.objectContaining({
          error: "Invalid input",
          details: expect.any(Object),
        }),
        400
      );
    });

    it("should return 409 if user is already attending the event", async () => {
      const newAttendee = { eventId: "1", userProfileId: "1" };
      const existingAttendee = {
        id: BigInt(1),
        eventId: BigInt(1),
        userProfileId: BigInt(1),
      };

      // Mock existing check - attendee already exists
      const limitMock = mock().mockResolvedValue([existingAttendee]);
      const whereMock = mock().mockReturnValue({ limit: limitMock });
      const fromMock = mock().mockReturnValue({ where: whereMock });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext(newAttendee);
      await createEventAttendee(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "User is already attending this event" },
        409
      );
    });
  });

  describe("deleteEventAttendee", () => {
    it("should delete event attendee successfully (soft delete)", async () => {
      const deletedAttendee = {
        id: BigInt(1),
        eventId: BigInt(1),
        userProfileId: BigInt(1),
        deletedAt: new Date(),
      };

      const returningMock = mock().mockResolvedValue([deletedAttendee]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext({}, { id: "1" });
      await deleteEventAttendee(c);

      expect(db.update).toHaveBeenCalledWith(expect.anything());
      expect(setMock).toHaveBeenCalledWith(
        expect.objectContaining({
          deletedAt: expect.any(Date),
          updatedAt: expect.any(Date),
        })
      );
      expect(mockJson).toHaveBeenCalledWith({
        message: "Event attendee removed successfully",
      });
    });

    it("should return 404 if event attendee not found for deletion", async () => {
      const returningMock = mock().mockResolvedValue([]);
      const whereMock = mock().mockReturnValue({ returning: returningMock });
      const setMock = mock().mockReturnValue({ where: whereMock });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext({}, { id: "999" });
      await deleteEventAttendee(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "Event attendee not found" },
        404
      );
    });
  });

  describe("Error handling", () => {
    it("should handle database errors in getEventAttendees", async () => {
      const fromMock = mock().mockImplementation(() => {
        throw new Error("Database error");
      });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext({}, {}, { page: "1", limit: "10" });
      await getEventAttendees(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "Failed to fetch event attendees" },
        500
      );
    });

    it("should handle database errors in createEventAttendee", async () => {
      const newAttendee = { eventId: "1", userProfileId: "1" };

      const fromMock = mock().mockImplementation(() => {
        throw new Error("Database error");
      });
      (db.select as any).mockReturnValue({ from: fromMock });

      const c = mockContext(newAttendee);
      await createEventAttendee(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "Failed to create event attendee" },
        500
      );
    });

    it("should handle database errors in deleteEventAttendee", async () => {
      const setMock = mock().mockImplementation(() => {
        throw new Error("Database error");
      });
      const updateMock = db.update as any;
      updateMock.mockReturnValue({ set: setMock });

      const c = mockContext({}, { id: "1" });
      await deleteEventAttendee(c);

      expect(mockJson).toHaveBeenCalledWith(
        { error: "Failed to remove event attendee" },
        500
      );
    });
  });
});
