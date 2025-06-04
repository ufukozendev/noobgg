import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllGameRanks,
  getGameRank,
  createGameRank,
  updateGameRank,
  deleteGameRank,
} from './actions';
import type { GameRank } from '@/types/gamerank';

export function useGameRanks() {
  return useQuery({ queryKey: ['gameranks'], queryFn: getAllGameRanks });
}

export function useGameRank(id: number) {
  return useQuery({
    queryKey: ['gamerank', id],
    queryFn: () => getGameRank(id),
    enabled: !!id,
  });
}

export function useCreateGameRank() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createGameRank,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameranks'] });
    },
  });
}

export function useUpdateGameRank(id: number) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<GameRank>) => updateGameRank(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['gameranks'] });
    },
  });
}

export function useDeleteGameRank() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteGameRank,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['gameranks'] }),
  });
}
