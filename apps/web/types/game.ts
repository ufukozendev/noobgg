export type Game = {
  id: string;
  name: string;
  description: string | null;
  logo: string | null;
};

export type GamesResponse = Game[];
