import { Context } from "hono";
import { db } from "../db";
import { eventInvitations, invitationStatusEnum } from "../db/schemas/event-invitations.drizzle";
import { eq, and, desc, or } from "drizzle-orm";
import { sql } from "drizzle-orm";

// GET /api/event-invitations - List all event invitations with pagination
export const getEventInvitations = async (c: Context) => {
  try {
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10") || 10));
    const offset = (page - 1) * limit;
    const status = c.req.query("status");

    let whereCondition = eq(eventInvitations.deletedAt, null);

    if (status && ["pending", "accepted", "declined"].includes(status)) {
      whereCondition = and(
        eq(eventInvitations.deletedAt, null),
        eq(eventInvitations.status, status as typeof invitationStatusEnum.enumValues[number])
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
      data: invitations,
      pagination: {
        page,
        limit,
        total: total[0].count,
        totalPages: Math.ceil(Number(total[0].count) / limit),
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch event invitations" }, 500);
  }
};

// GET /api/event-invitations/:id - Get specific event invitation
export const getEventInvitationById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const invitation = await db
      .select()
      .from(eventInvitations)
      .where(and(
        eq(eventInvitations.id, BigInt(id)),
        eq(eventInvitations.deletedAt, null)
      ))
      .limit(1);

    if (invitation.length === 0) {
      return c.json({ error: "Event invitation not found" }, 404);
    }

    return c.json({ data: invitation[0] });
  } catch (error) {
    return c.json({ error: "Failed to fetch event invitation" }, 500);
  }
};

// GET /api/users/:userId/invitations - Get invitations for specific user
export const getUserInvitations = async (c: Context) => {
  try {
    const userId = c.req.param("userId");
    const type = c.req.query("type"); // 'sent' or 'received'
    const status = c.req.query("status");
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10") || 10));
    const offset = (page - 1) * limit;

    let whereCondition;

    if (type === "sent") {
      whereCondition = and(
        eq(eventInvitations.inviterId, BigInt(userId)),
        eq(eventInvitations.deletedAt, null)
      );
    } else if (type === "received") {
      whereCondition = and(
        eq(eventInvitations.inviteeId, BigInt(userId)),
        eq(eventInvitations.deletedAt, null)
      );
    } else {
      // Both sent and received
      whereCondition = and(
        or(
          eq(eventInvitations.inviterId, BigInt(userId)),
          eq(eventInvitations.inviteeId, BigInt(userId))
        ),
        eq(eventInvitations.deletedAt, null)
      );
    }

    if (status && ["pending", "accepted", "declined"].includes(status)) {
      whereCondition = and(
        whereCondition,
        eq(eventInvitations.status, status as any)
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
      .from(eventInvitations).where(whereCondition);


    return c.json({
      data: invitations,
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

// GET /api/events/:eventId/invitations - Get invitations for specific event
export const getEventInvitationsByEvent = async (c: Context) => {
  try {
    const eventId = c.req.param("eventId");
    const status = c.req.query("status");
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(100, Math.max(1, parseInt(c.req.query("limit") || "10") || 10));
    const offset = (page - 1) * limit;

    let whereCondition = and(
      eq(eventInvitations.eventId, BigInt(eventId)),
      eq(eventInvitations.deletedAt, null)
    );

    if (status && ["pending", "accepted", "declined"].includes(status)) {
      whereCondition = and(
        whereCondition,
        eq(eventInvitations.status, status as any)
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
      .from(eventInvitations).where(whereCondition);


    return c.json({
      data: invitations,
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

// POST /api/event-invitations - Create new event invitation
export const createEventInvitation = async (c: Context) => {
  try {
    const body = await c.req.json();
    const { inviterId, inviteeId, eventId } = body;

    // Check if invitation already exists
    const existing = await db
      .select()
      .from(eventInvitations)
      .where(and(
        eq(eventInvitations.inviterId, BigInt(inviterId)),
        eq(eventInvitations.inviteeId, BigInt(inviteeId)),
        eq(eventInvitations.eventId, BigInt(eventId)),
        eq(eventInvitations.deletedAt, null)
      ))
      .limit(1);

    if (existing.length > 0) {
      return c.json({ error: "Invitation already exists for this user and event" }, 409);
    }

    // Check if user is trying to invite themselves
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

    // NOT: Bildirim sistemi entegrasyonu: Davet edilen kişiye yeni bir davetiye gönderildiğini bildirin.

    return c.json({ data: newInvitation[0] }, 201);
  } catch (error) {
    return c.json({ error: "Failed to create event invitation" }, 500);
  }
};

// PUT /api/event-invitations/:id/respond - Respond to invitation (accept/decline)
export const respondToInvitation = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { status } = body;

    if (!status || !["accepted", "declined"].includes(status)) {
      return c.json({ error: "Invalid status. Must be 'accepted' or 'declined'" }, 400);
    }

    // Check if invitation exists and is pending
    const existing = await db
      .select()
      .from(eventInvitations)
      .where(and(
        eq(eventInvitations.id, BigInt(id)),
        eq(eventInvitations.deletedAt, null)
      ))
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
        status: status as any,
        respondedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(eventInvitations.id, BigInt(id)))
      .returning();

    // NOT: Bildirim sistemi entegrasyonu: Davet eden kişiye davetiye yanıtlandığını bildirin.
    // NOT: Bildirim sistemi entegrasyonu: İsteğe bağlı olarak, davet edilen kişiye davetiyenin durumu güncellendiğini bildirin.

    return c.json({ data: updatedInvitation[0] });
  } catch (error) {
    return c.json({ error: "Failed to respond to invitation" }, 500);
  }
};

// DELETE /api/event-invitations/:id - Cancel/delete invitation
export const deleteEventInvitation = async (c: Context) => {
  try {
    const id = c.req.param("id");

    const deletedInvitation = await db
      .update(eventInvitations)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date()
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