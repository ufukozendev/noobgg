export type GameRank = {
  id: number;
  name: string;
  image: string;
  order: number;
  gameId: number;
};

export type GameRanksResponse = GameRank[];
