import { Hono } from "hono";
import {
  getAllGameRanksController,
  getGameRankByIdController,
  createGameRankController,
  updateGameRankController,
  deleteGameRankController,
} from "../controllers/game-ranks.controller";

const gameRanks = new Hono().basePath("/game-ranks");

gameRanks.get("/", getAllGameRanksController);
gameRanks.get("/:id", getGameRankByIdController);
gameRanks.post("/", createGameRankController);
gameRanks.put("/:id", updateGameRankController);
gameRanks.delete("/:id", deleteGameRankController);

export default gameRanks;
