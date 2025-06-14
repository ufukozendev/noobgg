"use client";

import { useState, useMemo } from "react";
import { TooltipProvider } from "@/components/ui/tooltip";

// Types
type Player = {
  id: string;
  name: string;
  avatarUrl: string;
};

type Lobby = {
  id: string;
  owner: Player;
  game: { id: string; name: string; iconUrl: string };
  platform: string;
  notes?: string;
  gameType: string;
  rank?: { name: string; tier: number; iconUrl: string };
  partySize: {
    current: number;
    max: number;
    members: Player[];
  };
  playingFor: string;
  region: string;
  language: string;
  micRequired: boolean;
  isPrivate: boolean;
  joinMethod: "join" | "request" | "full";
  createdAt: Date;
  tags?: string[];
};

// Mock Data
const mockPlayers: Player[] = [
  { id: "1", name: "iShieldo", avatarUrl: "/gamer-avatar-1.png" },
  { id: "2", name: "ReyPlays", avatarUrl: "/gamer-avatar-2.png" },
  { id: "3", name: "AlperTunga", avatarUrl: "/gamer-avatar-3.png" },
  { id: "4", name: "NinjaX", avatarUrl: "/gamer-avatar-4.png" },
  { id: "5", name: "ShadowStrike", avatarUrl: "/gamer-avatar-5.png" },
];

const games = [
  { id: "valorant", name: "Valorant", iconUrl: "/valorant-game-logo.png" },
  { id: "rl", name: "Rocket League", iconUrl: "/rocket-league-logo.png" },
  {
    id: "lol",
    name: "League of Legends",
    iconUrl: "/generic-online-game-logo.png",
  },
  { id: "apex", name: "Apex Legends", iconUrl: "/placeholder-1n1kj.png" },
];

const ranksData = {
  valorant: [
    { name: "Iron", tier: 1, iconUrl: "/placeholder-uc4rx.png" },
    { name: "Bronze", tier: 2, iconUrl: "/placeholder-snr0k.png" },
    { name: "Silver", tier: 3, iconUrl: "/placeholder-xnp0w.png" },
    { name: "Gold", tier: 4, iconUrl: "/placeholder.svg?width=20&height=20" },
    {
      name: "Platinum",
      tier: 5,
      iconUrl: "/placeholder.svg?width=20&height=20",
    },
    {
      name: "Diamond",
      tier: 6,
      iconUrl: "/placeholder.svg?width=20&height=20",
    },
  ],
  rl: [
    // ... Rocket League ranks
  ],
};

const mockLobbies: Lobby[] = [
  {
    id: "lobby1",
    owner: mockPlayers[0],
    game: games[0], // Valorant
    platform: "PC",
    notes: "Chill games, looking for 2 more to complete team. Let's rank up!",
    gameType: "Competitive",
    rank: ranksData.valorant[4], // Platinum
    partySize: {
      current: 3,
      max: 5,
      members: [mockPlayers[0], mockPlayers[1], mockPlayers[2]],
    },
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
    rank: {
      name: "Diamond II",
      tier: 5,
      iconUrl: "/lobby/placeholder.svg?width=20&height=20",
    },
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
    rank: {
      name: "Gold III",
      tier: 4,
      iconUrl: "/placeholder.svg?width=20&height=20",
    },
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
    partySize: {
      current: 3,
      max: 3,
      members: [mockPlayers[4], mockPlayers[0], mockPlayers[1]],
    },
    playingFor: "Wins",
    region: "Asia",
    language: "Japanese",
    micRequired: true,
    isPrivate: false,
    joinMethod: "full",
    createdAt: new Date(Date.now() - 3600 * 1000 * 5), // 5 hours ago
    tags: ["Aggressive Playstyle"],
  },
];

import type { FilterState } from "@/types/lfg";
import { Sidebar } from "@/components/lobby/sidebar";
import { Header } from "@/components/lobby/header";
import { Filters } from "@/components/lobby/filters";
import { LobbyTable } from "@/components/lobby/lobby-table";
import { GlobalStyles } from "@/components/lobby/global-styles";

export default function LfgPage() {
  const [filters, setFilters] = useState<FilterState>({
    game: "all",
    platform: "all",
    region: ["All Regions"],
    language: ["All Languages"],
    mode: "All Modes",
    playingFor: "Anything",
    rankRange: [0, 10],
    partySize: "any",
    micRequired: "any",
    searchTerm: "",
  });

  const handleFilterChange = (filterName: string, value: any) => {
    setFilters((prev) => ({ ...prev, [filterName]: value }));
  };

  const filteredLobbies = useMemo(() => {
    return mockLobbies.filter((lobby) => {
      // Game filter
      if (filters.game !== "all" && lobby.game.id !== filters.game)
        return false;

      // Platform filter
      if (filters.platform !== "all" && lobby.platform !== filters.platform)
        return false;

      // Region filter
      if (
        !filters.region.includes("All Regions") &&
        !filters.region.includes(lobby.region)
      )
        return false;

      // Language filter
      if (
        !filters.language.includes("All Languages") &&
        !filters.language.includes(lobby.language)
      )
        return false;

      // Game mode filter
      if (filters.mode !== "All Modes" && lobby.gameType !== filters.mode)
        return false;

      // Playing for filter
      if (
        filters.playingFor !== "Anything" &&
        lobby.playingFor !== filters.playingFor
      )
        return false;

      // Mic required filter
      if (filters.micRequired !== "any") {
        if (filters.micRequired === "yes" && !lobby.micRequired) return false;
        if (filters.micRequired === "no" && lobby.micRequired) return false;
      }

      // Search term filter
      if (
        filters.searchTerm &&
        !lobby.owner.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) &&
        !lobby.game.name
          .toLowerCase()
          .includes(filters.searchTerm.toLowerCase()) &&
        !(
          lobby.notes &&
          lobby.notes.toLowerCase().includes(filters.searchTerm.toLowerCase())
        )
      ) {
        return false;
      }

      return true;
    });
  }, [filters]);

  return (
    <TooltipProvider>
      <GlobalStyles />
      <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200">
        <Sidebar activePage="/lfg" />

        <main className="flex-1 p-4 md:p-6 overflow-auto">
          <Header
            title="Find a Gaming Lobby"
            description="Discover and join lobbies matching your play style."
          />

          <Filters filters={filters} onFilterChange={handleFilterChange} />

          <LobbyTable lobbies={filteredLobbies} />
        </main>
      </div>
    </TooltipProvider>
  );
}
