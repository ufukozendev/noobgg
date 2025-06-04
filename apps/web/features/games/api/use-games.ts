import { useQuery } from '@tanstack/react-query';
import { getAllGames } from './actions';

export function useGames() {
  return useQuery({ queryKey: ['games'], queryFn: getAllGames });
}
