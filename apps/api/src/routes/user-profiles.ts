import { Hono } from 'hono';
import {
  getUserProfileController,
  createUserProfileController,
  updateUserProfileController,
  deleteUserProfileController,
} from '../controllers/user-profiles.controller';

const userProfiles = new Hono().basePath('/user-profiles');

userProfiles.get('/:id', getUserProfileController);
userProfiles.post('/', createUserProfileController);
userProfiles.patch('/:id', updateUserProfileController);
userProfiles.delete('/:id', deleteUserProfileController);

export default userProfiles;
