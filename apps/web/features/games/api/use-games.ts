import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
} from './actions';
import type { Game } from '@/types/game';

export function useGames() {
  return useQuery({ queryKey: ['games'], queryFn: getAllGames });
}

export function useGame(id: string) {
  return useQuery({
    queryKey: ['game', id],
    queryFn: () => getGame(id),
    enabled: !!id,
  });
}

export function useCreateGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
  });
}

export function useUpdateGame(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Game>) => updateGame(id, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
  });
}

export function useDeleteGame() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGame,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['games'] }),
  });
}
