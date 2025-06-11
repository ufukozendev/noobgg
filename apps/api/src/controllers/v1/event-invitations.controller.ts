import { Context } from "hono";
import { db } from "../../db";
import {
  eventInvitations,
  invitationStatusEnum,
} from "../../db/schemas/event-invitations.drizzle";
import { eq, and, desc, or, isNull, SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { convertBigIntToString } from "../../utils/bigint-serializer";

export const getEventInvitations = async (c: Context) => {
  try {
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(c.req.query("limit") || "10") || 10)
    );
    const offset = (page - 1) * limit;
    const status = c.req.query("status");
    let whereCondition: SQL | undefined = isNull(eventInvitations.deletedAt);
    if (status && ["pending", "accepted", "declined"].includes(status)) {
      whereCondition = and(
        isNull(eventInvitations.deletedAt),
        eq(
          eventInvitations.status,
          status as (typeof invitationStatusEnum.enumValues)[number]
        )
      );
    }
    const invitations = await db
      .select()
      .from(eventInvitations)
      .where(whereCondition)
      .orderBy(desc(eventInvitations.createdAt))
      .limit(limit)
      .offset(offset);
    const total = await db
      .select({ count: sql`count(*)` })
      .from(eventInvitations)
      .where(whereCondition);
    return c.json({
      data: convertBigIntToString(invitations),
      pagination: {
        page,
        limit,
        total: Number(total[0].count),
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch event invitations" }, 500);
  }
};

export const getEventInvitationById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const invitation = await db
      .select()
      .from(eventInvitations)
      .where(
        and(
          eq(eventInvitations.id, BigInt(id)),
          isNull(eventInvitations.deletedAt)
        )
      )
      .limit(1);
    if (invitation.length === 0) {
      return c.json({ error: "Event invitation not found" }, 404);
    }
    return c.json({ data: convertBigIntToString(invitation[0]) });
  } catch (error) {
    return c.json({ error: "Failed to fetch event invitation" }, 500);
  }
};

export const getUserInvitations = async (c: Context) => {
  try {
    const userId = c.req.param("userId");
    const type = c.req.query("type");
    const status = c.req.query("status");
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(c.req.query("limit") || "10") || 10)
    );
    const offset = (page - 1) * limit;
    let whereCondition: SQL | undefined;
    if (type === "sent") {
      whereCondition = and(
        eq(eventInvitations.inviterId, BigInt(userId)),
        isNull(eventInvitations.deletedAt)
      );
    } else if (type === "received") {
      whereCondition = and(
        eq(eventInvitations.inviteeId, BigInt(userId)),
        isNull(eventInvitations.deletedAt)
      );
    } else {
      whereCondition = and(
        or(
          eq(eventInvitations.inviterId, BigInt(userId)),
          eq(eventInvitations.inviteeId, BigInt(userId))
        ),
        isNull(eventInvitations.deletedAt)
      );
    }
    if (status && ["pending", "accepted", "declined"].includes(status)) {
      whereCondition = and(
        whereCondition,
        eq(
          eventInvitations.status,
          status as (typeof invitationStatusEnum.enumValues)[number]
        )
      );
    }
    const invitations = await db
      .select()
      .from(eventInvitations)
      .where(whereCondition)
      .orderBy(desc(eventInvitations.sentAt))
      .limit(limit)
      .offset(offset);
    const total = await db
      .select({ count: sql`count(*)` })
      .from(eventInvitations)
      .where(whereCondition);
    return c.json({
      data: convertBigIntToString(invitations),
      pagination: {
        page,
        limit,
        total: Number(total[0].count),
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch user invitations" }, 500);
  }
};

export const getEventInvitationsByEvent = async (c: Context) => {
  try {
    const eventId = c.req.param("eventId");
    const status = c.req.query("status");
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(c.req.query("limit") || "10") || 10)
    );
    const offset = (page - 1) * limit;
    let whereCondition = and(
      eq(eventInvitations.eventId, BigInt(eventId)),
      isNull(eventInvitations.deletedAt)
    );
    if (status && ["pending", "accepted", "declined"].includes(status)) {
      whereCondition = and(
        whereCondition,
        eq(
          eventInvitations.status,
          status as (typeof invitationStatusEnum.enumValues)[number]
        )
      );
    }
    const invitations = await db
      .select()
      .from(eventInvitations)
      .where(whereCondition)
      .orderBy(desc(eventInvitations.sentAt))
      .limit(limit)
      .offset(offset);
    const total = await db
      .select({ count: sql`count(*)` })
      .from(eventInvitations)
      .where(whereCondition);
    return c.json({
      data: convertBigIntToString(invitations),
      pagination: {
        page,
        limit,
        total: Number(total[0].count),
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch event invitations" }, 500);
  }
};

export const createEventInvitation = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { inviterId, inviteeId, eventId } = body;
    const existing = await db
      .select()
      .from(eventInvitations)
      .where(
        and(
          eq(eventInvitations.inviterId, BigInt(inviterId)),
          eq(eventInvitations.inviteeId, BigInt(inviteeId)),
          eq(eventInvitations.eventId, BigInt(eventId)),
          isNull(eventInvitations.deletedAt)
        )
      )
      .limit(1);
    if (existing.length > 0) {
      return c.json(
        { error: "Invitation already exists for this user and event" },
        409
      );
    }
    if (BigInt(inviterId) === BigInt(inviteeId)) {
      return c.json({ error: "Cannot invite yourself" }, 400);
    }
    const newInvitation = await db
      .insert(eventInvitations)
      .values({
        inviterId: BigInt(inviterId),
        inviteeId: BigInt(inviteeId),
        eventId: BigInt(eventId),
        sentAt: new Date(),
        status: "pending",
      })
      .returning();
    return c.json({ data: convertBigIntToString(newInvitation[0]) }, 201);
  } catch (error) {
    return c.json({ error: "Failed to create event invitation" }, 500);
  }
};

export const respondToInvitation = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;
    if (!status || !["accepted", "declined"].includes(status)) {
      return c.json(
        { error: "Invalid status. Must be 'accepted' or 'declined'" },
        400
      );
    }
    const existing = await db
      .select()
      .from(eventInvitations)
      .where(
        and(
          eq(eventInvitations.id, BigInt(id)),
          isNull(eventInvitations.deletedAt)
        )
      )
      .limit(1);
    if (existing.length === 0) {
      return c.json({ error: "Invitation not found" }, 404);
    }
    if (existing[0].status !== "pending") {
      return c.json({ error: "Invitation has already been responded to" }, 409);
    }
    const updatedInvitation = await db
      .update(eventInvitations)
      .set({
        status: status as (typeof invitationStatusEnum.enumValues)[number],
        respondedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(eventInvitations.id, BigInt(id)))
      .returning();
    return c.json({ data: convertBigIntToString(updatedInvitation[0]) });
  } catch (error) {
    return c.json({ error: "Failed to respond to invitation" }, 500);
  }
};

export const deleteEventInvitation = async (c: Context) => {
  try {
    const id = c.req.param("id");
    if (!id || isNaN(Number(id))) {
      return c.json({ error: "Invalid ID format" }, 400);
    }
    const deletedInvitation = await db
      .update(eventInvitations)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(eventInvitations.id, BigInt(id)))
      .returning();
    if (deletedInvitation.length === 0) {
      return c.json({ error: "Event invitation not found" }, 404);
    }
    return c.json({ message: "Event invitation cancelled successfully" });
  } catch (error) {
    return c.json({ error: "Failed to cancel event invitation" }, 500);
  }
};
