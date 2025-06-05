import { Hono } from 'hono';
import {
  getAllUserProfilesController,
  getUserProfileByUsernameController,
  getUserProfileController,
  createUserProfileController,
  updateUserProfileController,
  deleteUserProfileController,
} from '../controllers/user-profiles.controller';

const userProfiles = new Hono().basePath('/user-profiles');

userProfiles.post('/', createUserProfileController);
userProfiles.get('/', getAllUserProfilesController);
userProfiles.get('/username/:username', getUserProfileByUsernameController);
userProfiles.get('/:id', getUserProfileController);
userProfiles.patch('/:id', updateUserProfileController);
userProfiles.delete('/:id', deleteUserProfileController);

export default userProfiles;
