import { Hono } from "hono";
import {
  getEventAttendees,
  getEventAttendeeById,
  getEventAttendeesByEvent,
  createEventAttendee,
  deleteEventAttendee,
} from "../../controllers/v1/event-attendees.controller";

const eventAttendeesRouter = new Hono();

eventAttendeesRouter.get("/", getEventAttendees);
eventAttendeesRouter.get("/:id", getEventAttendeeById);
eventAttendeesRouter.post("/", createEventAttendee);
eventAttendeesRouter.delete("/:id", deleteEventAttendee);
eventAttendeesRouter.get("/events/:eventId/attendees", getEventAttendeesByEvent);

export default eventAttendeesRouter;
