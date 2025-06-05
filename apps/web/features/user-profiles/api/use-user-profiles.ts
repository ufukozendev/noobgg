import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import type { CreateUserProfileInput, UpdateUserProfileInput } from "@repo/shared";
import {
  getUserProfile,
  getUserProfileByUsername,
  getAllUserProfiles,
  createUserProfile,
  updateUserProfile,
  deleteUserProfile,
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

export function useCreateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: CreateUserProfileInput) => createUserProfile(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
    },
  });
}

export function useUpdateUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: UpdateUserProfileInput }) =>
      updateUserProfile(id, data),
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile', variables.id] });
    },
  });
}

export function useDeleteUserProfile() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteUserProfile,
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({ queryKey: ['user-profiles'] });
      queryClient.invalidateQueries({ queryKey: ['user-profile', id] });
    },
  });
}