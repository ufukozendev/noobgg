import { Hono } from "hono";
import distributorsRoutes from "./distributors";
import eventAttendeesRouter from "./event-attendees";
import eventInvitationsRouter from "./event-invitations";
import eventsRouter from "./events";
import gameRanksRoutes from "./game-ranks";
import gamesRoutes from "./games";
import languagesRouter from "./languages";
import lobbiesRoutes from "./lobbies";
import platformsRoutes from "./platforms";
import userProfilesRoutes from "./user-profiles";

const v1Router = new Hono();

v1Router.route("/games", gamesRoutes);
v1Router.route("/platforms", platformsRoutes);
v1Router.route("/distributors", distributorsRoutes);
v1Router.route("/game-ranks", gameRanksRoutes);
v1Router.route("/user-profiles", userProfilesRoutes);
v1Router.route("/event-attendees", eventAttendeesRouter);
v1Router.route("/event-invitations", eventInvitationsRouter);
v1Router.route("/events", eventsRouter);
v1Router.route('/languages', languagesRouter);
v1Router.route('/lobbies', lobbiesRoutes);

export default v1Router;

