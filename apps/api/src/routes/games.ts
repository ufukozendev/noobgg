import { Hono } from "hono";
import {
  getAllGamesController,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
} from "../controllers/games.controller";

const games = new Hono().basePath("/games");

games.get("/", getAllGamesController);
games.get("/:id", getGameByIdController);
games.post("/", createGameController);
games.put("/:id", updateGameController);
games.delete("/:id", deleteGameController);

export default games;
