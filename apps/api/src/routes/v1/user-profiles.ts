import { Hono } from 'hono'
import { 
    createUserProfile, 
    deleteUserProfile, 
    getUserProfile, 
    updateUserProfile 
} from '../../controllers/v1/user-profiles.controller'

const userProfiles = new Hono()

userProfiles.get('/:id', getUserProfile)
userProfiles.post('/', createUserProfile)
userProfiles.patch('/:id', updateUserProfile)
userProfiles.delete('/:id', deleteUserProfile)

export default userProfiles
