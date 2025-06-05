import { useQuery } from '@tanstack/react-query';
import {
  getUserProfile,
  getUserProfileByUsername,
  getAllUserProfiles,
} from './actions';

export function useUserProfiles() {
  return useQuery({ 
    queryKey: ['user-profiles'], 
    queryFn: getAllUserProfiles 
  });
}

export function useUserProfile(id: string) {
  return useQuery({
    queryKey: ['user-profile', id],
    queryFn: () => getUserProfile(id),
    enabled: !!id,
  });
}

export function useUserProfileByUsername(username: string) {
  return useQuery({
    queryKey: ['user-profile', 'username', username],
    queryFn: () => getUserProfileByUsername(username),
    enabled: !!username,
  });
} 