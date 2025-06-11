import { Hono } from "hono";
import gamesRoutes from "./games";
import platformsRoutes from "./platforms";
import distributorsRoutes from "./distributors";
import gameRanksRoutes from "./game-ranks";
import userProfilesRoutes from "./user-profiles";
import eventAttendeesRouter from "./event-attendees";
import eventInvitationsRouter from "./event-invitations";
import eventsRouter from "./events";
const v1Router = new Hono();

v1Router.route("/games", gamesRoutes);
v1Router.route("/platforms", platformsRoutes);
v1Router.route("/distributors", distributorsRoutes);
v1Router.route("/game-ranks", gameRanksRoutes);
v1Router.route("/user-profiles", userProfilesRoutes);
v1Router.route("/event-attendees", eventAttendeesRouter);
v1Router.route("/event-invitations", eventInvitationsRouter);
v1Router.route("/events", eventsRouter);

export default v1Router;
