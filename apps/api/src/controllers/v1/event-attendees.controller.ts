import { Context } from "hono";
import { db } from "../../db";
import { eventAttendees } from "../../db/schemas/event-attendees.drizzle";
import { eq, and, desc, sql, isNull } from "drizzle-orm";
import { createEventAttendeeDto } from "@repo/shared/dto/event-attendee.dto";
import { convertBigIntToString } from "../../utils/bigint-serializer";
import { ApiError } from "../../middleware/errorHandler";

export const getEventAttendees = async (c: Context) => {
  const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(c.req.query("limit") || "10") || 10)
  );
  const offset = (page - 1) * limit;
  const attendees = await db
    .select()
    .from(eventAttendees)
    .where(isNull(eventAttendees.deletedAt))
    .orderBy(desc(eventAttendees.createdAt))
    .limit(limit)
    .offset(offset);
  const total = await db
    .select({ count: sql`count(*)` })
    .from(eventAttendees)
    .where(isNull(eventAttendees.deletedAt));

  return c.json({
    data: convertBigIntToString(attendees),
    pagination: {
      page,
      limit,
      total: Number(total[0].count),
      totalPages: Math.ceil(Number(total[0].count) / limit),
    },
  });
};

export const getEventAttendeeById = async (c: Context) => {
  const id = c.req.param("id");
  if (!id || isNaN(Number(id))) {
    throw new ApiError("Invalid ID parameter", 400);
  }
  const attendee = await db
    .select()
    .from(eventAttendees)
    .where(
      and(eq(eventAttendees.id, BigInt(id)), isNull(eventAttendees.deletedAt))
    )
    .limit(1);
  if (attendee.length === 0) {
    throw new ApiError("Event attendee not found", 404);
  }
  return c.json({ data: convertBigIntToString(attendee[0]) });
};

export const getEventAttendeesByEvent = async (c: Context) => {
  const eventId = c.req.param("eventId");
  if (!eventId || isNaN(Number(eventId))) {
    throw new ApiError("Invalid event ID parameter", 400);
  }
  const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
  const limit = Math.min(
    100,
    Math.max(1, parseInt(c.req.query("limit") || "10") || 10)
  );
  const offset = (page - 1) * limit;
  const attendees = await db
    .select()
    .from(eventAttendees)
    .where(
      and(
        eq(eventAttendees.eventId, BigInt(eventId)),
        isNull(eventAttendees.deletedAt)
      )
    )
    .orderBy(desc(eventAttendees.joinedAt))
    .limit(limit)
    .offset(offset);
  const total = await db
    .select({ count: sql`count(*)` })
    .from(eventAttendees)
    .where(
      and(
        eq(eventAttendees.eventId, BigInt(eventId)),
        isNull(eventAttendees.deletedAt)
      )
    );

  return c.json({
    data: convertBigIntToString(attendees),
    pagination: {
      page,
      limit,
      total: Number(total[0].count),
      totalPages: Math.ceil(Number(total[0].count) / limit),
    },
  });
};

export const createEventAttendee = async (c: Context) => {
  const body = await c.req.json();
  const result = createEventAttendeeDto.safeParse(body);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  const { eventId, userProfileId } = result.data;

  // Check if already attending
  const existing = await db
    .select()
    .from(eventAttendees)
    .where(
      and(
        eq(eventAttendees.eventId, BigInt(eventId)),
        eq(eventAttendees.userProfileId, BigInt(userProfileId)),
        isNull(eventAttendees.deletedAt)
      )
    )
    .limit(1);
  if (existing.length > 0) {
    throw new ApiError("User is already attending this event", 409);
  }
  const newAttendee = await db
    .insert(eventAttendees)
    .values({
      eventId: BigInt(eventId),
      userProfileId: BigInt(userProfileId),
      joinedAt: result.data.joinedAt
        ? new Date(result.data.joinedAt)
        : new Date(),
    })
    .returning();
  return c.json(
    {
      success: true,
      message: "Event attendee created successfully",
      data: convertBigIntToString(newAttendee[0]),
    },
    200
  );
};

export const deleteEventAttendee = async (c: Context) => {
  const id = c.req.param("id");
  if (!id || isNaN(Number(id))) {
    throw new ApiError("Invalid ID parameter", 400);
  }
  const existing = await db
    .select()
    .from(eventAttendees)
    .where(
      and(eq(eventAttendees.id, BigInt(id)), isNull(eventAttendees.deletedAt))
    )
    .limit(1);
  if (existing.length === 0) {
    throw new ApiError("Event attendee not found", 404);
  }
  const deletedAttendee = await db
    .update(eventAttendees)
    .set({
      deletedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(eventAttendees.id, BigInt(id)))
    .returning();
  if (deletedAttendee.length === 0) {
    throw new ApiError("Event attendee not found", 404);
  }
  return c.json(
    {
      success: true,
      message: "Event attendee removed successfully",
    },
    200
  );
};
