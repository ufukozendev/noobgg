import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllPlatforms,
  getPlatform,
  createPlatform,
  updatePlatform,
  deletePlatform,
} from './actions';
import type { Platform } from '@/types/platform';

export function usePlatforms() {
  return useQuery({ queryKey: ['platforms'], queryFn: getAllPlatforms });
}

export function usePlatform(id: number) {
  return useQuery({
    queryKey: ['platform', id],
    queryFn: () => getPlatform(id),
    enabled: !!id,
  });
}

export function useCreatePlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createPlatform,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['platforms'] }),
  });
}

export function useUpdatePlatform(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Platform>) => updatePlatform(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['platforms'] }),
  });
}

export function useDeletePlatform() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deletePlatform,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['platforms'] }),
  });
}
