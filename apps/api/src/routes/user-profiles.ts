import { Hono } from "hono";
import { 
    createUserProfile, 
    deleteUserProfile, 
    getUserProfile, 
    updateUserProfile 
} from "../controllers/user-profiles.controller";

const userProfile = new Hono().basePath('/user-profiles');

userProfile.get('/:id', getUserProfile);
userProfile.post('/', createUserProfile);
userProfile.patch('/:id', updateUserProfile);
userProfile.delete('/:id', deleteUserProfile);

export default userProfile;