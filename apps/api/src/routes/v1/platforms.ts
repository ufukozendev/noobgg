import { Hono } from 'hono';
import {
  getAllPlatformsController,
  getPlatformByIdController,
  createPlatformController,
  updatePlatformController,
  deletePlatformController,
} from '../../controllers/v1/platforms.controller';

const platforms = new Hono();

platforms.get('/', getAllPlatformsController);
platforms.get('/:id', getPlatformByIdController);
platforms.post('/', createPlatformController);
platforms.put('/:id', updatePlatformController);
platforms.delete('/:id', deletePlatformController);

export default platforms;
