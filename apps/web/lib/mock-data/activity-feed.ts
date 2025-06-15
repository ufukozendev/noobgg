export interface ActivityItem {
  id: string;
  type: "join" | "win" | "create" | "achievement";
  user: {
    username: string;
    avatar: string;
    rank?: string;
  };
  game?: {
    name: string;
    logo: string;
    color: string;
  };
  action: string;
  details?: string;
  timestamp: number;
  region?: string;
}

// Mock activity data generator
export const generateMockActivity = (): ActivityItem => {
  const users = [
    { username: "ProGamer123", avatar: "/avatars/user1.jpg", rank: "Diamond" },
    { username: "AWPMaster", avatar: "/avatars/user2.jpg", rank: "Gold" },
    { username: "SummonerX", avatar: "/avatars/user3.jpg", rank: "Platinum" },
    { username: "BuildMaster", avatar: "/avatars/user4.jpg", rank: "Champion" },
    { username: "SquadLeader", avatar: "/avatars/user5.jpg", rank: "Master" },
    { username: "NinjaPlayer", avatar: "/avatars/user6.jpg", rank: "Silver" },
    { username: "GamerGirl", avatar: "/avatars/user7.jpg", rank: "Gold" },
    { username: "FpsKing", avatar: "/avatars/user8.jpg", rank: "Diamond" }
  ];

  const games = [
    { name: "Valorant", logo: "/logos/valorant-logo.svg", color: "#ff4655" },
    { name: "CS2", logo: "/logos/counter-strike-2.svg", color: "#f7941d" },
    { name: "League of Legends", logo: "/logos/league-of-legends-logo.svg", color: "#c89b3c" },
    { name: "Fortnite", logo: "/logos/fortnite-logo.svg", color: "#00a2e8" },
    { name: "PUBG", logo: "/logos/pubg-logo.webp", color: "#f3a011" }
  ];

  const regions = ["EU West", "EU East", "North America", "Asia", "OCE"];

  const activities = [
    {
      type: "join" as const,
      actions: [
        "joined a competitive lobby",
        "found their perfect squad",
        "connected with teammates",
        "joined a ranked match"
      ]
    },
    {
      type: "win" as const,
      actions: [
        "just won an epic match!",
        "clutched a 1v4 situation!",
        "achieved Victory Royale!",
        "completed a perfect game!"
      ]
    },
    {
      type: "create" as const,
      actions: [
        "created a new lobby",
        "started recruiting teammates",
        "opened a competitive lobby",
        "formed a new squad"
      ]
    },
    {
      type: "achievement" as const,
      actions: [
        "ranked up to the next tier!",
        "completed weekly challenges!",
        "earned a new achievement!",
        "reached a new milestone!"
      ]
    }
  ];

  const randomUser = users[Math.floor(Math.random() * users.length)];
  const randomGame = games[Math.floor(Math.random() * games.length)];
  const randomRegion = regions[Math.floor(Math.random() * regions.length)];
  const randomActivityType = activities[Math.floor(Math.random() * activities.length)];
  const randomAction = randomActivityType.actions[Math.floor(Math.random() * randomActivityType.actions.length)];

  return {
    id: `activity-${Date.now()}-${Math.random()}`,
    type: randomActivityType.type,
    user: randomUser,
    game: randomGame,
    action: randomAction,
    details: randomActivityType.type === "create" ? "Looking for skilled players" : undefined,
    timestamp: Date.now(),
    region: randomRegion
  };
};
