import { Context } from "hono";
import { db } from "../../db";
import { events } from "../../db/schemas/events.drizzle";
import {
  eq,
  and,
  desc,
  asc,
  gte,
  lte,
  like,
  or,
  sql,
  isNull,
  SQL,
} from "drizzle-orm";
import { convertBigIntToString } from "../../utils/bigint-serializer";


// GET /api/events - List all events with advanced filtering and pagination
export const getEvents = async (c: Context) => {
  try {
    const page = Math.max(1, parseInt(c.req.query("page") || "1") || 1);
    const limit = Math.min(
      100,
      Math.max(1, parseInt(c.req.query("limit") || "10") || 10)
    );
    const offset = (page - 1) * limit;

    const eventType = c.req.query("eventType");
    const isOnline = c.req.query("isOnline");
    const isOfficial = c.req.query("isOfficial");
    const search = c.req.query("search");
    const startDate = c.req.query("startDate");
    const endDate = c.req.query("endDate");
    const creatorId = c.req.query("creatorId");
    const countryId = c.req.query("countryId");
    const cityId = c.req.query("cityId");
    const sortBy = c.req.query("sortBy") || "startTime";
    const sortOrder = c.req.query("sortOrder") || "asc";

    const whereConditions = [isNull(events.deletedAt)];

    if (eventType && ["meetup", "tournament", "other"].includes(eventType)) {
      whereConditions.push(eq(events.eventType, eventType as any));
    }

    if (isOnline !== undefined) {
      whereConditions.push(eq(events.isOnline, isOnline === "true"));
    }

    if (isOfficial !== undefined) {
      whereConditions.push(eq(events.isOfficial, isOfficial === "true"));
    }

    if (search) {
      const searchPattern = `%${search}%`;
      const searchConditions: SQL[] = [];

      searchConditions.push(like(events.title, searchPattern));
      searchConditions.push(like(events.description, searchPattern));
      searchConditions.push(like(events.place, searchPattern));

      if (searchConditions.length > 0) {
        whereConditions.push(or(...searchConditions)!);
      }
    }

    if (startDate) {
      whereConditions.push(gte(events.startTime, new Date(startDate)));
    }

    if (endDate) {
      whereConditions.push(lte(events.endTime, new Date(endDate)));
    }

    if (creatorId) {
      whereConditions.push(eq(events.creatorId, BigInt(creatorId)));
    }

    if (countryId) {
      whereConditions.push(eq(events.countryId, BigInt(countryId)));
    }

    if (cityId) {
      whereConditions.push(eq(events.cityId, BigInt(cityId)));
    }

    const whereCondition = and(...whereConditions);

    const orderByColumn =
      sortBy === "attendeesCount"
        ? events.attendeesCount
        : sortBy === "createdAt"
          ? events.createdAt
          : events.startTime;
    const orderDirection =
      sortOrder === "desc" ? desc(orderByColumn) : asc(orderByColumn);

    const eventsList = await db
      .select()
      .from(events)
      .where(whereCondition)
      .orderBy(orderDirection)
      .limit(limit)
      .offset(offset);

    const totalCount = await db
      .select({ count: sql`count(*)` })
      .from(events)
      .where(whereCondition);
    
    return c.json({
      data: convertBigIntToString(eventsList),
      pagination: {
        page,
        limit,
        total: totalCount[0].count,
        totalPages: Math.ceil(Number(totalCount[0].count) / limit),
      },
      filters: {
        eventType,
        isOnline,
        isOfficial,
        search,
        startDate,
        endDate,
        sortBy,
        sortOrder,
      },
    });
  } catch (error) {
    return c.json({ error: "Failed to fetch events" }, 500);
  }
};

// GET /api/events/:id - Get specific event with detailed information
export const getEventById = async (c: Context) => {
  try {
    const id = c.req.param("id");
    
    const event = await db
      .select()
      .from(events)
      .where(and(eq(events.id, BigInt(id)), isNull(events.deletedAt)))
      .limit(1);

    if (event.length === 0) {
      return c.json({ error: "Event not found" }, 404);
    }
    
    return c.json({ data: convertBigIntToString(event[0]) });
  } catch {
    return c.json({ error: "Failed to fetch event" }, 500);
  }
};

// GET /api/events/upcoming - Get upcoming events
export const getUpcomingEvents = async (c: Context) => {
  try {
    const limit = parseInt(c.req.query("limit") || "10");
    const eventType = c.req.query("eventType");
    const isOnline = c.req.query("isOnline");

    const whereConditions = [
      isNull(events.deletedAt),
      gte(events.startTime, new Date()),
    ];

    if (eventType && ["meetup", "tournament", "other"].includes(eventType)) {
      whereConditions.push(eq(events.eventType, eventType as any));
    }

    if (isOnline !== undefined) {
      whereConditions.push(eq(events.isOnline, isOnline === "true"));
    }

    const upcomingEvents = await db
      .select()
      .from(events)
      .where(and(...whereConditions))
      .orderBy(asc(events.startTime))
      .limit(limit);

    return c.json({ data: convertBigIntToString(upcomingEvents) });
  } catch {
    return c.json({ error: "Failed to fetch upcoming events" }, 500);
  }
};

// GET /api/events/popular - Get popular events (by attendees count)
export const getPopularEvents = async (c: Context) => {
  try {
    const limit = parseInt(c.req.query("limit") || "10");
    const timeframe = c.req.query("timeframe") || "week"; // week, month, all

    const whereConditions = [isNull(events.deletedAt)];

    if (timeframe === "week") {
      const weekAgo = new Date();
      weekAgo.setDate(weekAgo.getDate() - 7);
      whereConditions.push(gte(events.createdAt, weekAgo));
    } else if (timeframe === "month") {
      const monthAgo = new Date();
      monthAgo.setMonth(monthAgo.getMonth() - 1);
      whereConditions.push(gte(events.createdAt, monthAgo));
    }

    const popularEvents = await db
      .select()
      .from(events)
      .where(and(...whereConditions))
      .orderBy(desc(events.attendeesCount))
      .limit(limit);

    return c.json({ data: convertBigIntToString(popularEvents) });
  } catch (error) {
    return c.json({ error: "Failed to fetch popular events" }, 500);
  }
};

// POST /api/events - Create new event
export const createEvent = async (c: Context) => {
  try {
    const body = await c.req.json();
    console.log("Creating event with body:", body);
    
    const {
      title,
      description,
      startTime,
      endTime,
      place,
      isOnline = false,
      imageUrl,
      isOfficial = false,
      creatorId,
      minAgeRestriction,
      languageId,
      countryId,
      cityId,
      eventType,
    } = body;

    // Validate required fields
    if (!title || !startTime || !endTime || !creatorId || !eventType) {
      return c.json(
        {
          error:
            "Missing required fields: title, startTime, endTime, creatorId, eventType",
        },
        400
      );
    }

    // Validate event type
    if (!["meetup", "tournament", "other"].includes(eventType)) {
      return c.json({ error: "Invalid event type" }, 400);
    }

    // Validate dates
    const start = new Date(startTime);
    const end = new Date(endTime);
    if (start >= end) {
      return c.json({ error: "End time must be after start time" }, 400);
    }

    if (start < new Date()) {
      return c.json({ error: "Start time cannot be in the past" }, 400);
    }

    const newEvent = await db
      .insert(events)
      .values({
        title,
        description,
        startTime: start,
        endTime: end,
        place,
        isOnline,
        imageUrl,
        isOfficial,
        creatorId: BigInt(creatorId),
        minAgeRestriction,
        languageId: languageId ? BigInt(languageId) : null,
        countryId: countryId ? BigInt(countryId) : null,
        cityId: cityId ? BigInt(cityId) : null,
        eventType,
        attendeesCount: 0,
      })
      .returning();

    return c.json({ data: convertBigIntToString(newEvent[0] )}, 201);
  } catch (error) {
    console.log("Error creating event:", error);
    
    return c.json({ error: "Failed to create event" }, 500);
  }
};

// PUT /api/events/:id - Update event
export const updateEvent = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();

    // Check if event exists
    const existingEvent = await db
      .select()
      .from(events)
      .where(and(eq(events.id, BigInt(id)), isNull(events.deletedAt)))
      .limit(1);

    if (existingEvent.length === 0) {
      return c.json({ error: "Event not found" }, 404);
    }

    // Validate dates if provided
    if (body.startTime && body.endTime) {
      const start = new Date(body.startTime);
      const end = new Date(body.endTime);
      if (start >= end) {
        return c.json({ error: "End time must be after start time" }, 400);
      }
    }

    // Validate event type if provided
    if (
      body.eventType &&
      !["meetup", "tournament", "other"].includes(body.eventType)
    ) {
      return c.json({ error: "Invalid event type" }, 400);
    }

    const updateData: any = {
      updatedAt: new Date(),
    };

    // Only update provided fields
    const allowedFields = [
      "title",
      "description",
      "startTime",
      "endTime",
      "place",
      "isOnline",
      "imageUrl",
      "isOfficial",
      "minAgeRestriction",
      "languageId",
      "countryId",
      "cityId",
      "eventType",
    ];

    allowedFields.forEach((field) => {
      if (body[field] !== undefined) {
        if (
          ["languageId", "countryId", "cityId"].includes(field) &&
          body[field]
        ) {
          updateData[field] = BigInt(body[field]);
        } else if (["startTime", "endTime"].includes(field)) {
          updateData[field] = new Date(body[field]);
        } else {
          updateData[field] = body[field];
        }
      }
    });

    const updatedEvent = await db
      .update(events)
      .set(updateData)
      .where(eq(events.id, BigInt(id)))
      .returning();

    return c.json({ data: convertBigIntToString(updatedEvent[0]) });
  } catch (error) {
    return c.json({ error: "Failed to update event" }, 500);
  }
};

// DELETE /api/events/:id - Delete event (soft delete)
export const deleteEvent = async (c: Context) => {
  try {
    const id = c.req.param("id");

    const deletedEvent = await db
      .update(events)
      .set({
        deletedAt: new Date(),
        updatedAt: new Date(),
      })
      .where(eq(events.id, BigInt(id)))
      .returning();

    if (deletedEvent.length === 0) {
      return c.json({ error: "Event not found" }, 404);
    }

    return c.json({ message: "Event deleted successfully" });
  } catch (error) {
    return c.json({ error: "Failed to delete event" }, 500);
  }
};

// PUT /api/events/:id/attendees-count - Update attendees count
export const updateAttendeesCount = async (c: Context) => {
  try {
    const id = c.req.param("id");
    const body = await c.req.json();
    const { increment = true } = body;

    const event = await db
      .select()
      .from(events)
      .where(and(eq(events.id, BigInt(id)), isNull(events.deletedAt)))
      .limit(1);

    if (event.length === 0) {
      return c.json({ error: "Event not found" }, 404);
    }

    const currentCount = event[0].attendeesCount || 0;
    const newCount = increment
      ? currentCount + 1
      : Math.max(0, currentCount - 1);

    const updatedEvent = await db
      .update(events)
      .set({
        attendeesCount: newCount,
        updatedAt: new Date(),
      })
      .where(eq(events.id, BigInt(id)))
      .returning();

    return c.json({ data: convertBigIntToString(updatedEvent[0]) });
  } catch (error) {
    return c.json({ error: "Failed to update attendees count" }, 500);
  }
};
