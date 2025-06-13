import { Context } from "hono";
import { db } from "../../db";
import {
  eventInvitations,
  invitationStatusEnum,
} from "../../db/schemas/event-invitations.drizzle";
import { eq, and, desc, or, isNull, SQL } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { convertBigIntToString } from "../../utils/bigint-serializer";
import { ApiError } from "../../middleware/errorHandler";
import { createEventInvitationDto, updateEventInvitationDto } from "@repo/shared/dto/event-invitation.dto";

export const getEventInvitations = async (c: Context) => {
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
};

export const getEventInvitationById = async (c: Context) => {
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
    throw new ApiError("Event invitation not found", 404);
  }
  return c.json({ data: convertBigIntToString(invitation[0]) });
};

export const getUserInvitations = async (c: Context) => {
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
};

export const getEventInvitationsByEvent = async (c: Context) => {
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
};

export const createEventInvitation = async (c: Context) => {
  const body = await c.req.json();
  const result = createEventInvitationDto.safeParse(body);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  const { inviterId, inviteeId, eventId } = result.data;
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
    throw new ApiError("Invitation already exists for this user and event", 409);
  }
  if (BigInt(inviterId) === BigInt(inviteeId)) {
    throw new ApiError("Cannot invite yourself", 400);
  }
  const values = {
    ...result.data,
    inviterId: BigInt(inviterId),
    inviteeId: BigInt(inviteeId),
    eventId: BigInt(eventId),
    sentAt: result.data.sentAt ? new Date(result.data.sentAt) : new Date(),
    respondedAt: result.data.respondedAt ? new Date(result.data.respondedAt) : undefined,
    status: result.data.status || "pending",
  };
  const newInvitation = await db
    .insert(eventInvitations)
    .values(values)
    .returning();
  return c.json({ data: convertBigIntToString(newInvitation[0]) }, 201);
};

export const respondToInvitation = async (c: Context) => {
  const id = c.req.param("id");
  const body = await c.req.json();
  const result = updateEventInvitationDto.safeParse(body);
  if (!result.success) {
    throw new ApiError(JSON.stringify(result.error.flatten().fieldErrors), 400);
  }
  if (!result.data.status || !["accepted", "declined"].includes(result.data.status)) {
    throw new ApiError("Invalid status. Must be 'accepted' or 'declined'", 400);
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
    throw new ApiError("Invitation not found", 404);
  }
  if (existing[0].status !== "pending") {
    throw new ApiError("Invitation has already been responded to", 409);
  }
  const updatedInvitation = await db
    .update(eventInvitations)
    .set({
      status: result.data.status,
      respondedAt: new Date(),
      updatedAt: new Date(),
    })
    .where(eq(eventInvitations.id, BigInt(id)))
    .returning();
  return c.json({ data: convertBigIntToString(updatedInvitation[0]) });
};

export const deleteEventInvitation = async (c: Context) => {
  const id = c.req.param("id");
  if (!id || isNaN(Number(id))) {
    throw new ApiError("Invalid ID format", 400);
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
    throw new ApiError("Event invitation not found", 404);
  }
  return c.json({ message: "Event invitation cancelled successfully" });
};
