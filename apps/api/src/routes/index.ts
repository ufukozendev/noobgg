import { Hono } from "hono";
import { homeController } from "../controllers/main.controller";
import anyRoutes from "./any-route";
import gamesRoutes from "./games";

const router = new Hono();

router.get("/", homeController);
router.route("/", anyRoutes);
router.route("/", gamesRoutes);

export default router;
