import { Hono } from "hono";
import {
  getEvents,
  getEventById,
  getUpcomingEvents,
  getPopularEvents,
  createEvent,
  updateEvent,
  deleteEvent,
  updateAttendeesCount,
} from "../../controllers/v1/events.controller";

const eventsRouter = new Hono();

eventsRouter.get("/", getEvents);
eventsRouter.get("/upcoming", getUpcomingEvents);
eventsRouter.get("/popular", getPopularEvents);
eventsRouter.get("/:id", getEventById);
eventsRouter.post("/", createEvent);
eventsRouter.put("/:id", updateEvent);
eventsRouter.delete("/:id", deleteEvent);
eventsRouter.put("/:id/attendees-count", updateAttendeesCount);

export default eventsRouter;
