// Mock data for LFG lobbies
export interface Player {
  id: string;
  username: string;
  avatar: string;
  level?: number;
  rank?: string;
}

export interface Lobby {
  id: number;
  game: {
    name: string;
    icon: string;
    color: string;
  };
  owner: {
    username: string;
    avatar: string;
  };
  players?: Player[];
  mode: string;
  region: string;
  currentSize: number;
  maxSize: number;
  minRank: string;
  maxRank: string;
  isMicRequired: boolean;
  type: "public" | "private";
  status: "waiting" | "in-game" | "full";
  note?: string;
  createdAt: string;
  tags: string[];
}

export const mockLobbies: Lobby[] = [  {
    id: 1,
    game: {
      name: "Valorant",
      icon: "/logos/valorant-logo.svg",
      color: "#ff4655",
    },
    owner: { username: "ProGamer123", avatar: "/avatars/user1.jpg" },
    players: [
      {
        id: "1",
        username: "ProGamer123",
        avatar: "https://ui-avatars.com/api/?name=ProGamer123&background=ff4655&color=fff&size=32",
        level: 87,
        rank: "Gold"
      },
      {
        id: "2", 
        username: "ShadowNinja",
        avatar: "https://ui-avatars.com/api/?name=ShadowNinja&background=3b82f6&color=fff&size=32",
        level: 76,
        rank: "Gold"
      },
      {
        id: "3",
        username: "DragonSlayer",
        avatar: "https://ui-avatars.com/api/?name=DragonSlayer&background=10b981&color=fff&size=32", 
        level: 92,
        rank: "Platinum"
      }
    ],
    mode: "Competitive",
    region: "EU West",
    currentSize: 3,
    maxSize: 5,
    minRank: "Gold",
    maxRank: "Platinum",
    isMicRequired: true,
    type: "public" as const,
    status: "waiting" as const,
    note: "Looking for chill players, no rage pls",
    createdAt: "2024-06-13T10:30:00Z",
    tags: ["English", "18+", "Chill"],
  },  {
    id: 2,
    game: {
      name: "Counter Strike 2",
      icon: "/logos/counter-strike-2.svg",
      color: "#f7941d",
    },
    owner: { username: "AWPMaster", avatar: "/avatars/user2.jpg" },
    players: [
      {
        id: "4",
        username: "AWPMaster",
        avatar: "https://ui-avatars.com/api/?name=AWPMaster&background=f7941d&color=fff&size=32",
        level: 156,
        rank: "Master Guardian"
      },
      {
        id: "5",
        username: "FlashGod",
        avatar: "https://ui-avatars.com/api/?name=FlashGod&background=8b5cf6&color=fff&size=32",
        level: 134,
        rank: "Master Guardian"
      },
      {
        id: "6",
        username: "SmokeKing",
        avatar: "https://ui-avatars.com/api/?name=SmokeKing&background=ef4444&color=fff&size=32",
        level: 167,
        rank: "Legendary Eagle"
      },
      {
        id: "7",
        username: "BombDefuser",
        avatar: "https://ui-avatars.com/api/?name=BombDefuser&background=06b6d4&color=fff&size=32",
        level: 143,
        rank: "Master Guardian"
      }
    ],
    mode: "Competitive",
    region: "EU East",
    currentSize: 4,
    maxSize: 5,
    minRank: "Master Guardian",
    maxRank: "Legendary Eagle",
    isMicRequired: true,
    type: "public" as const,
    status: "waiting" as const,
    note: "Need 1 more for full team. Must have good aim!",
    createdAt: "2024-06-13T11:15:00Z",
    tags: ["Skilled", "Russian/English", "Serious"],
  },
  {
    id: 3,
    game: {
      name: "League of Legends",
      icon: "/logos/league-of-legends-logo.svg",
      color: "#c89b3c",
    },
    owner: { username: "SummonerX", avatar: "/avatars/user3.jpg" },
    mode: "Ranked Solo/Duo",
    region: "EU West",
    currentSize: 2,
    maxSize: 2,
    minRank: "Gold",
    maxRank: "Platinum",
    isMicRequired: false,
    type: "public" as const,
    status: "waiting" as const,
    note: "Duo queue for ranked climb",
    createdAt: "2024-06-13T09:45:00Z",
    tags: ["Duo", "Ranked", "Climb"],
  },
  {
    id: 4,
    game: {
      name: "Fortnite",
      icon: "/logos/fortnite-logo.svg",
      color: "#00a2e8",
    },
    owner: { username: "BuildMaster", avatar: "/avatars/user4.jpg" },
    mode: "Battle Royale",
    region: "North America",
    currentSize: 2,
    maxSize: 4,
    minRank: "Champion",
    maxRank: "Unreal",
    isMicRequired: true,
    type: "public" as const,
    status: "waiting" as const,
    note: "Squad up for Victory Royales!",
    createdAt: "2024-06-13T08:20:00Z",
    tags: ["Squad", "Building", "BR"],
  },
  {
    id: 5,
    game: {
      name: "PUBG",
      icon: "/logos/pubg-logo.webp",
      color: "#f3a011",
    },
    owner: { username: "SquadLeader", avatar: "/avatars/user5.jpg" },
    mode: "Squad TPP",
    region: "Asia",
    currentSize: 3,
    maxSize: 4,
    minRank: "Diamond",
    maxRank: "Conqueror",
    isMicRequired: true,
    type: "public" as const,
    status: "waiting" as const,
    note: "Chicken dinner time! Need 1 more",    createdAt: "2024-06-13T07:30:00Z",
    tags: ["Squad", "TPP", "Experienced"],
  },
];
