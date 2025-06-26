import { Hono } from 'hono';
import {
  getAllUserSocialLinksController,
  getUserSocialLinkByIdController,
  createUserSocialLinkController,
  updateUserSocialLinkController,
  deleteUserSocialLinkController,
} from '../../controllers/v1/user-social-links.controller';

const userSocialLinks = new Hono();

userSocialLinks.get('/', getAllUserSocialLinksController);
userSocialLinks.get('/:id', getUserSocialLinkByIdController);
userSocialLinks.post('/', createUserSocialLinkController);
userSocialLinks.put('/:id', updateUserSocialLinkController);
userSocialLinks.delete('/:id', deleteUserSocialLinkController);

export default userSocialLinks;