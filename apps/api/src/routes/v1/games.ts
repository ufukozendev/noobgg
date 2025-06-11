import { Hono } from 'hono';
import {
  getAllGamesController,
  getGameByIdController,
  createGameController,
  updateGameController,
  deleteGameController,
} from '../../controllers/v1/games.controller';

const games = new Hono();

games.get('/', getAllGamesController);
games.get('/:id', getGameByIdController);
games.post('/', createGameController);
games.put('/:id', updateGameController);
games.delete('/:id', deleteGameController);

export default games;
