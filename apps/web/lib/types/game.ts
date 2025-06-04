export type Game = {
  id: number;
  name: string;
  description: string | null;
  logo: string | null;
};

export type GamesResponse = Game[];
