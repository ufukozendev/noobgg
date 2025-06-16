import { Hono } from 'hono';
import {
  getAllGameModesController,
  getGameModeByIdController,
  createGameModeController,
  updateGameModeController,
  deleteGameModeController,
} from '../../controllers/v1/game-modes.controller';

const gameModes = new Hono();

gameModes.get('/', getAllGameModesController);
gameModes.get('/:id', getGameModeByIdController);
gameModes.post('/', createGameModeController);
gameModes.put('/:id', updateGameModeController);
gameModes.delete('/:id', deleteGameModeController);

export default gameModes;