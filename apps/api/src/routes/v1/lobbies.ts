import { Hono } from "hono";
import {
    createLobbyController,
    deleteLobbyController,
    getAllLobbiesController,
    getLobbyByIdController,
    updateLobbyController,
} from "../../controllers/v1/lobbies.controller";

const lobbiesRoutes = new Hono();

lobbiesRoutes.get("/", getAllLobbiesController);
lobbiesRoutes.get("/:id", getLobbyByIdController);
lobbiesRoutes.post("/", createLobbyController);
lobbiesRoutes.put("/:id", updateLobbyController);
lobbiesRoutes.delete("/:id", deleteLobbyController);

export default lobbiesRoutes; 