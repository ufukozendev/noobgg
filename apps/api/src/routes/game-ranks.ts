import { Hono } from "hono";
import {
  getAllGameRanksController,
  getGameRankByIdController,
  createGameRankController,
  updateGameRankController,
  deleteGameRankController,
} from "../controllers/game-ranks.controller";

const gameRanksRoutes = new Hono();

gameRanksRoutes.get("/game-ranks", getAllGameRanksController);
gameRanksRoutes.get("/game-ranks/:id", getGameRankByIdController);
gameRanksRoutes.post("/game-ranks", createGameRankController);
gameRanksRoutes.put("/game-ranks/:id", updateGameRankController);
gameRanksRoutes.delete("/game-ranks/:id", deleteGameRankController);

export default gameRanksRoutes;
