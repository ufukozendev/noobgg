import { Hono } from "hono";
import {
  getEventInvitations,
  getEventInvitationById,
  getUserInvitations,
  getEventInvitationsByEvent,
  createEventInvitation,
  respondToInvitation,
  deleteEventInvitation,
} from "../controllers/event-invitations.controller";
import { zValidator } from "@hono/zod-validator";
import {
  createEventInvitationSchema,
  respondToInvitationSchema,
  getEventInvitationsSchema,
} from "@repo/shared";

const eventInvitationsRouter = new Hono();

// Event Invitations CRUD routes
eventInvitationsRouter.get(
  "/",
  zValidator("query", getEventInvitationsSchema),
  getEventInvitations
);
eventInvitationsRouter.get("/:id", getEventInvitationById);
eventInvitationsRouter.post(
  "/",
  zValidator("json", createEventInvitationSchema),
  createEventInvitation
);
eventInvitationsRouter.put(
  "/:id/respond",
  zValidator("json", respondToInvitationSchema),
  respondToInvitation
);
eventInvitationsRouter.delete("/:id", deleteEventInvitation);

// User-specific invitation routes
eventInvitationsRouter.get(
  "/users/:userId/invitations",
  zValidator("query", getEventInvitationsSchema),
  getUserInvitations
);

// Event-specific invitation routes
eventInvitationsRouter.get(
  "/events/:eventId/invitations",
  zValidator("query", getEventInvitationsSchema),
  getEventInvitationsByEvent
);

export { eventInvitationsRouter };