import { Hono } from "hono";
import {
  getEventInvitations,
  getEventInvitationById,
  getUserInvitations,
  getEventInvitationsByEvent,
  createEventInvitation,
  respondToInvitation,
  deleteEventInvitation,
} from "../../controllers/v1/event-invitations.controller";
import { zValidator } from "@hono/zod-validator";
import {
  createEventInvitationSchema,
  respondToInvitationSchema,
  getEventInvitationsSchema,
} from "@repo/shared";

const eventInvitationsRouter = new Hono();

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
eventInvitationsRouter.get(
  "/users/:userId/invitations",
  zValidator("query", getEventInvitationsSchema),
  getUserInvitations
);
eventInvitationsRouter.get(
  "/events/:eventId/invitations",
  zValidator("query", getEventInvitationsSchema),
  getEventInvitationsByEvent
);

export default eventInvitationsRouter;
