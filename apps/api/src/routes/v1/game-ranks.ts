import { Hono } from 'hono';
import {
  getAllGameRanksController,
  getGameRankByIdController,
  createGameRankController,
  updateGameRankController,
  deleteGameRankController,
} from '../../controllers/v1/game-ranks.controller';

const gameRanksRoutes = new Hono();

gameRanksRoutes.get('/', getAllGameRanksController);
gameRanksRoutes.get('/:id', getGameRankByIdController);
gameRanksRoutes.post('/', createGameRankController);
gameRanksRoutes.put('/:id', updateGameRankController);
gameRanksRoutes.delete('/:id', deleteGameRankController);

export default gameRanksRoutes;
