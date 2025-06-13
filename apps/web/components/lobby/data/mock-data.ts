import type { Player, Game, Lobby } from "@/types/lfg"

export const mockPlayers: Player[] = [
  { id: "1", name: "iShieldo", avatarUrl: "/lobby/gamer-avatar-1.png" },
  { id: "2", name: "ReyPlays", avatarUrl: "/lobby/gamer-avatar-2.png" },
  { id: "3", name: "AlperTunga", avatarUrl: "/lobby/gamer-avatar-3.png" },
  { id: "4", name: "NinjaX", avatarUrl: "/lobby/gamer-avatar-4.png" },
  { id: "5", name: "ShadowStrike", avatarUrl: "/lobby/gamer-avatar-5.png" },
]

export const games: Game[] = [
  { id: "valorant", name: "Valorant", iconUrl: "/lobby/valorant-game-logo.png" },
  { id: "rl", name: "Rocket League", iconUrl: "/lobby/rocket-league-logo.png" },
  { id: "lol", name: "League of Legends", iconUrl: "/lobby/generic-online-game-logo.png" },
  { id: "apex", name: "Apex Legends", iconUrl: "/lobby/placeholder-1n1kj.png" },
]

export const ranksData = {
  valorant: [
    { name: "Iron", tier: 1, iconUrl: "/lobby/placeholder-uc4rx.png" },
    { name: "Bronze", tier: 2, iconUrl: "/lobby/placeholder-snr0k.png" },
    { name: "Silver", tier: 3, iconUrl: "/lobby/placeholder-xnp0w.png" },
    { name: "Gold", tier: 4, iconUrl: "/lobby/placeholder.svg?width=20&height=20" },
    { name: "Platinum", tier: 5, iconUrl: "/lobby/placeholder.svg?width=20&height=20" },
    { name: "Diamond", tier: 6, iconUrl: "/lobby/placeholder.svg?width=20&height=20" },
  ],
  rl: [
    // ... Rocket League ranks
  ],
}

export const mockLobbies: Lobby[] = [
  {
    id: "lobby1",
    owner: mockPlayers[0],
    game: games[0], // Valorant
    platform: "PC",
    notes: "Chill games, looking for 2 more to complete team. Let's rank up!",
    gameType: "Competitive",
    rank: ranksData.valorant[4], // Platinum
    partySize: { current: 3, max: 5, members: [mockPlayers[0], mockPlayers[1], mockPlayers[2]] },
    playingFor: "Rank Up",
    region: "Europe",
    language: "English",
    micRequired: true,
    isPrivate: false,
    joinMethod: "join",
    createdAt: new Date(Date.now() - 3600 * 1000 * 1), // 1 hour ago
    tags: ["Experienced", "Team Player"],
  },
  {
    id: "lobby2",
    owner: mockPlayers[1],
    game: games[1], // Rocket League
    platform: "PC",
    gameType: "Casual",
    rank: { name: "Diamond II", tier: 5, iconUrl: "/lobby/placeholder.svg?width=20&height=20" },
    partySize: { current: 1, max: 3, members: [mockPlayers[1]] },
    playingFor: "For Fun",
    region: "North America",
    language: "English",
    micRequired: false,
    isPrivate: true,
    joinMethod: "request",
    createdAt: new Date(Date.now() - 3600 * 1000 * 2), // 2 hours ago
  },
  {
    id: "lobby3",
    owner: mockPlayers[3],
    game: games[2], // LoL
    platform: "PC",
    notes: "ADC main LFG for duo queue. Gold+",
    gameType: "Ranked Duo",
    rank: { name: "Gold III", tier: 4, iconUrl: "/lobby/placeholder.svg?width=20&height=20" },
    partySize: { current: 1, max: 2, members: [mockPlayers[3]] },
    playingFor: "Rank Up",
    region: "Europe",
    language: "English",
    micRequired: true,
    isPrivate: false,
    joinMethod: "join",
    createdAt: new Date(Date.now() - 3600 * 1000 * 0.5), // 30 mins ago
  },
  {
    id: "lobby4",
    owner: mockPlayers[4],
    game: games[3], // Apex
    platform: "PlayStation",
    gameType: "Trios",
    partySize: { current: 3, max: 3, members: [mockPlayers[4], mockPlayers[0], mockPlayers[1]] },
    playingFor: "Wins",
    region: "Asia",
    language: "Japanese",
    micRequired: true,
    isPrivate: false,
    joinMethod: "full",
    createdAt: new Date(Date.now() - 3600 * 1000 * 5), // 5 hours ago
    tags: ["Aggressive Playstyle"],
  },
]

export const platforms = ["PC", "PlayStation", "Xbox", "Switch"]
export const regions = ["All Regions", "North America", "Europe", "Asia", "South America", "Oceania"]
export const languages = [
  "All Languages",
  "English",
  "Spanish",
  "French",
  "German",
  "Turkish",
  "Portuguese",
  "Japanese",
]
export const gameModes = ["All Modes", "Competitive", "Casual", "Ranked", "Tournament", "Scrim"]
export const playingForOptions = ["Anything", "Rank Up", "For Fun", "Practice", "Team Building", "Wins"]
