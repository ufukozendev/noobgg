import { OpenAPIHono } from "@hono/zod-openapi";
import { homeController } from "../controllers/main.controller";
import anyRoutes from "./any-route";
import gamesRoutes from "./games";
import distributorsRoutes from "./distributors";
import platformsRoutes from "./platforms";
import gameRanksRoutes from "./game-ranks";
import userProfilesRoutes from "./user-profiles";


const router = new OpenAPIHono();

router.get("/", homeController);
router.route("/", anyRoutes);
router.route("/", gamesRoutes);
router.route("/", distributorsRoutes);
router.route("/", platformsRoutes);
router.route("/", gameRanksRoutes);
router.route("/", userProfilesRoutes);

export default router;
