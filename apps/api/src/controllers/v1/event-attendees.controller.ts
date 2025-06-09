// v1: event-attendees controller (boş şablon)
import { Context } from "hono";
import { db } from "../../db";
import { eventAttendees } from "../../db/schemas/event-attendees.drizzle";
import { eq, and, desc, sql, isNull } from "drizzle-orm";
import { createEventAttendeeSchema } from "../../../../../packages/shared/schemas/event-attendees";

export const getEventAttendees = async (c: Context) => {
  try {
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
      data: attendees,
      pagination: {
        page,
        limit,
        total: Number(total[0].count),
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch event attendees" }, 500);
  }
};

export const getEventAttendeeById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    if (!id || isNaN(Number(id))) {
      return c.json({ error: "Invalid ID parameter" }, 400);
    }
    const attendee = await db
      .select()
      .from(eventAttendees)
      .where(
        and(eq(eventAttendees.id, BigInt(id)), isNull(eventAttendees.deletedAt))
      )
      .limit(1);
    if (attendee.length === 0) {
      return c.json({ error: "Event attendee not found" }, 404);
    }
    return c.json({ data: attendee[0] });
  } catch (error) {
    return c.json({ error: "Failed to fetch event attendee" }, 500);
  }
};

export const getEventAttendeesByEvent = async (c: Context) => {
  try {
    const eventId = c.req.param("eventId");
    if (!eventId || isNaN(Number(eventId))) {
      return c.json({ error: "Invalid event ID parameter" }, 400);
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
      data: attendees,
      pagination: {
        page,
        limit,
        total: Number(total[0].count),
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch event attendees" }, 500);
  }
};

export const createEventAttendee = async (c: Context) => {
  try {
    const body = await c.req.json();
    const parse = createEventAttendeeSchema.safeParse(body);
    if (!parse.success) {
      return c.json(
        { error: "Invalid input", details: parse.error.flatten() },
        400
      );
    }
    const { eventId, userProfileId } = parse.data;
    const newAttendee = await db
      .insert(eventAttendees)
      .values({
        eventId: BigInt(eventId),
        userProfileId: BigInt(userProfileId),
        joinedAt: new Date(),
      })
      .returning();
    return c.json({ data: newAttendee[0] }, 201);
  } catch (dbError: any) {
    if (dbError.code === "23505" || dbError.constraint) {
      return c.json({ error: "User is already attending this event" }, 409);
    }
    throw dbError;
  }
};

export const deleteEventAttendee = async (c: Context) => {
  try {
    const id = c.req.param("id");
    if (!id || isNaN(Number(id))) {
      return c.json({ error: "Invalid ID parameter" }, 400);
    }
    const existing = await db
      .select()
      .from(eventAttendees)
      .where(
        and(eq(eventAttendees.id, BigInt(id)), isNull(eventAttendees.deletedAt))
      )
      .limit(1);
    if (existing.length === 0) {
      return c.json({ error: "Event attendee not found" }, 404);
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
      return c.json({ error: "Event attendee not found" }, 404);
    }
    return c.json({ message: "Event attendee removed successfully" });
  } catch (error) {
    return c.json({ error: "Failed to remove event attendee" }, 500);
  }
};
