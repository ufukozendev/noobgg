import { OpenAPIHono } from "@hono/zod-openapi";
import {
  getAllGamesRoute,
  getGameByIdRoute,
  createGameRoute,
  updateGameRoute,
  deleteGameRoute,
  getAllGamesController,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
} from "../controllers/games.controller";

const games = new OpenAPIHono().basePath("/games");

// Use OpenAPI routes with existing controllers
games.openapi(getAllGamesRoute, getAllGamesController);
games.openapi(getGameByIdRoute, getGameByIdController);
games.openapi(createGameRoute, createGameController);
games.openapi(updateGameRoute, updateGameController);
games.openapi(deleteGameRoute, deleteGameController);

export default games;
