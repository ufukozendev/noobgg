import { Hono } from 'hono';
import {
  getAllPlatformsController,
  getPlatformByIdController,
  createPlatformController,
  updatePlatformController,
  deletePlatformController,
} from '../controllers/platforms.controller';

const platforms = new Hono().basePath('/platforms');

platforms.get('/', getAllPlatformsController);
platforms.get('/:id', getPlatformByIdController);
platforms.post('/', createPlatformController);
platforms.put('/:id', updatePlatformController);
platforms.delete('/:id', deletePlatformController);

export default platforms;
