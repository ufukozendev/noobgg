"use client";

import React, { useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/hooks/use-debounce';
import { FilterBarSimple } from '@/components/dashboard/filter-bar-simple';
import { LobbyCardSimple } from '@/components/dashboard/lobby-card-simple';
import { LobbyListItem } from '@/components/dashboard/lobby-list-item';
import { Users, Grid3X3, List, LayoutGrid } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

// Enhanced mock data with real game logos
const mockLobbies = [
  {
    id: 1,
    game: { 
      name: "Valorant", 
      icon: "/logos/valorant-logo.svg", 
      color: "#ff4655" 
    },
    owner: { username: "ProGamer123", avatar: "/avatars/user1.jpg" },
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
    tags: ["English", "18+", "Chill"]
  },
  {
    id: 2,
    game: { 
      name: "Counter Strike 2", 
      icon: "/logos/counter-strike-2.svg", 
      color: "#f7941d" 
    },
    owner: { username: "AWPMaster", avatar: "/avatars/user2.jpg" },
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
    tags: ["Skilled", "Russian/English", "Serious"]
  },
  {
    id: 3,
    game: { 
      name: "League of Legends", 
      icon: "/logos/league-of-legends-logo.svg", 
      color: "#c89b3c" 
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
    tags: ["Duo", "Ranked", "Climb"]
  },
  {
    id: 4,
    game: { 
      name: "Fortnite", 
      icon: "/logos/fortnite-logo.svg", 
      color: "#00a2e8" 
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
    tags: ["Squad", "Building", "BR"]
  },
  {
    id: 5,
    game: { 
      name: "PUBG", 
      icon: "/logos/pubg-logo.webp", 
      color: "#f3a011" 
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
    status: "waiting" as const,    note: "Chicken dinner time! Need 1 more",
    createdAt: "2024-06-13T07:30:00Z",
    tags: ["Squad", "TPP", "Experienced"]
  }
];

export default function LobbiesPage() {
  const router = useRouter();
    // Filter states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedGame, setSelectedGame] = useState('all');
  const [selectedRegion, setSelectedRegion] = useState('all');
  const [selectedMode, setSelectedMode] = useState('all');
  const [sortBy, setSortBy] = useState('created');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');
  // Multi-select states
  const [selectedGames, setSelectedGames] = useState<string[]>([]);
  const [selectedRegions, setSelectedRegions] = useState<string[]>([]);
  const [selectedModes, setSelectedModes] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>([]);
  const [selectedPlayingFor, setSelectedPlayingFor] = useState<string[]>([]);
  const [selectedMicRequired, setSelectedMicRequired] = useState<string[]>([]);
    // Rank range states
  const [minRank, setMinRank] = useState('bronze');
  const [maxRank, setMaxRank] = useState('platinum');
  
  const debouncedSearchTerm = useDebounce(searchTerm, 300);

  const handleRankRangeChange = (newMinRank: string, newMaxRank: string) => {
    setMinRank(newMinRank);
    setMaxRank(newMaxRank);
  };
  // Calculate stats
  const stats = useMemo(() => ({
    totalLobbies: mockLobbies.length,
    activeLobbies: mockLobbies.filter(l => l.status === 'waiting').length,
    totalPlayers: mockLobbies.reduce((sum, lobby) => sum + lobby.currentSize, 0),
    yourLobbies: 2 // Mock user's lobbies
  }), []);
  // Filter and sort lobbies
  const filteredAndSortedLobbies = useMemo(() => {
    let filtered = mockLobbies.filter(lobby => {
      const matchesSearch = !debouncedSearchTerm || 
        lobby.game.name.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lobby.owner.username.toLowerCase().includes(debouncedSearchTerm.toLowerCase()) ||
        lobby.note?.toLowerCase().includes(debouncedSearchTerm.toLowerCase());
      
      // Single select filters (fallback)
      const matchesGame = selectedGame === 'all' || 
        lobby.game.name.toLowerCase().includes(selectedGame.toLowerCase());
      
      const matchesRegion = selectedRegion === 'all' ||
        lobby.region.toLowerCase().replace(/\s+/g, '-').includes(selectedRegion);
      
      const matchesMode = selectedMode === 'all' ||
        lobby.mode.toLowerCase().includes(selectedMode.toLowerCase());

      // Multi-select filters (priority over single select)
      const matchesGames = selectedGames.length === 0 || 
        selectedGames.some(game => lobby.game.name.toLowerCase().includes(game.toLowerCase()));
      
      const matchesRegions = selectedRegions.length === 0 ||
        selectedRegions.some(region => lobby.region.toLowerCase().replace(/\s+/g, '-').includes(region));
      
      const matchesModes = selectedModes.length === 0 ||
        selectedModes.some(mode => lobby.mode.toLowerCase().includes(mode.toLowerCase()));      // Rank range filtering
      const matchesRankRange = (() => {
        // Get rank order values for comparison
        const rankOrder = {
          'iron': 1,
          'bronze': 2,
          'silver': 3,
          'gold': 4,
          'platinum': 5,
          'diamond': 6,
          'ascendant': 7,
          'immortal': 8,
          'radiant': 9,
          'conqueror': 9
        };

        const minRankOrder = rankOrder[minRank.toLowerCase() as keyof typeof rankOrder] || 1;
        const maxRankOrder = rankOrder[maxRank.toLowerCase() as keyof typeof rankOrder] || 9;
        
        const lobbyMinRankOrder = rankOrder[lobby.minRank.toLowerCase() as keyof typeof rankOrder] || 1;
        const lobbyMaxRankOrder = rankOrder[lobby.maxRank.toLowerCase() as keyof typeof rankOrder] || 9;

        // Check if there's any overlap between selected range and lobby's range
        return lobbyMaxRankOrder >= minRankOrder && lobbyMinRankOrder <= maxRankOrder;
      })();

      // Use multi-select if available, otherwise fallback to single select
      const finalGameMatch = selectedGames.length > 0 ? matchesGames : matchesGame;
      const finalRegionMatch = selectedRegions.length > 0 ? matchesRegions : matchesRegion;
      const finalModeMatch = selectedModes.length > 0 ? matchesModes : matchesMode;

      return matchesSearch && finalGameMatch && finalRegionMatch && finalModeMatch && matchesRankRange;
    });// Sort lobbies
    filtered.sort((a, b) => {
      let aValue: any, bValue: any;
      
      switch (sortBy) {
        case 'players':
          aValue = a.currentSize;
          bValue = b.currentSize;
          break;
        case 'rank':
          aValue = a.minRank;
          bValue = b.minRank;
          break;
        case 'game':
          aValue = a.game.name;
          bValue = b.game.name;
          break;
        case 'created':
        default:
          aValue = new Date(a.createdAt).getTime();
          bValue = new Date(b.createdAt).getTime();
          break;
      }

      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return sortOrder === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortOrder === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      return 0;
    });    return filtered;
  }, [debouncedSearchTerm, selectedGame, selectedRegion, selectedMode, selectedGames, selectedRegions, selectedModes, selectedLanguages, selectedPlatforms, selectedPlayingFor, selectedMicRequired, minRank, maxRank, sortBy, sortOrder]);

  const handleCreateLobby = () => {
    router.push('/dashboard/lobbies/new');
  };
  const handleJoinLobby = (id: number) => {
    // Mock join functionality
    console.log('Joining lobby:', id);
    // In real app: API call to join lobby
  };

  const handleEditLobby = (id: number) => {
    router.push(`/dashboard/lobbies/${id}/edit`);
  };

  const handleDeleteLobby = (id: number) => {
    console.log('Deleting lobby:', id);
    // Delete lobby logic here
  };  const handleClearFilters = () => {
    setSearchTerm('');
    setSelectedGame('all');
    setSelectedRegion('all');
    setSelectedMode('all');
    setSelectedGames([]);
    setSelectedRegions([]);
    setSelectedModes([]);
    setSelectedLanguages([]);
    setSelectedPlatforms([]);
    setSelectedPlayingFor([]);
    setSelectedMicRequired([]);
    setMinRank('bronze');
    setMaxRank('platinum');
  };
  const handleSortOrderChange = () => {
    setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
  };
  // Calculate active filters for display
  const activeFilters = useMemo(() => [
    ...selectedGames.map(game => `Game: ${game}`),
    ...selectedRegions.map(region => `Region: ${region}`),
    ...selectedModes.map(mode => `Mode: ${mode}`),
    ...selectedLanguages.map(lang => `Language: ${lang}`),
    ...selectedPlatforms.map(platform => `Platform: ${platform}`),
    ...selectedPlayingFor.map(playing => `Playing: ${playing}`),
    ...selectedMicRequired.map(mic => `Mic: ${mic}`),
    ...(minRank !== 'bronze' || maxRank !== 'platinum' ? [`Rank: ${minRank} - ${maxRank}`] : [])
  ], [selectedGames, selectedRegions, selectedModes, selectedLanguages, selectedPlatforms, selectedPlayingFor, selectedMicRequired, minRank, maxRank]);  return (
    <div className="min-h-screen p-8">
      <div className="relative max-w-7xl mx-auto space-y-8">
        {/* Filter Bar */}
        <FilterBarSimple
          searchTerm={searchTerm}
          onSearchChange={setSearchTerm}
          selectedGame={selectedGame}
          onGameChange={setSelectedGame}
          selectedGames={selectedGames}
          onGamesChange={setSelectedGames}
          selectedRegion={selectedRegion}
          onRegionChange={setSelectedRegion}
          selectedRegions={selectedRegions}
          onRegionsChange={setSelectedRegions}
          selectedMode={selectedMode}
          onModeChange={setSelectedMode}
          selectedModes={selectedModes}
          onModesChange={setSelectedModes}
          selectedLanguages={selectedLanguages}
          onLanguagesChange={setSelectedLanguages}
          selectedPlatforms={selectedPlatforms}
          onPlatformsChange={setSelectedPlatforms}
          selectedPlayingFor={selectedPlayingFor}
          onPlayingForChange={setSelectedPlayingFor}
          selectedMicRequired={selectedMicRequired}
          onMicRequiredChange={setSelectedMicRequired}
          minRank={minRank}
          maxRank={maxRank}
          onRankRangeChange={handleRankRangeChange}
          viewMode={viewMode}
          onViewModeChange={setViewMode}
          activeFilters={activeFilters}
          onClearFilters={handleClearFilters}
        />        
          {/* Lobbies Content */}
        {viewMode === 'grid' ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4 gap-6 items-stretch">
            {filteredAndSortedLobbies.length > 0 ? (
              filteredAndSortedLobbies.map((lobby) => (
                <LobbyCardSimple
                  key={lobby.id}
                  lobby={lobby}
                  onJoin={handleJoinLobby}
                  onEdit={handleEditLobby}
                  onDelete={handleDeleteLobby}
                />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center justify-center py-16">
                <div className={cn(
                  "bg-white/5 backdrop-blur-xl border border-white/10",
                  "rounded-2xl p-8 text-center max-w-md"
                )}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No lobbies found</h3>
                  <p className="text-white/60 mb-4">
                    Try adjusting your filters or create a new lobby to get started.
                  </p>
                  <button
                    onClick={handleCreateLobby}
                    className={cn(
                      "bg-blue-600 hover:bg-blue-700",
                      "text-white px-6 py-2 rounded-lg transition-all duration-300"
                    )}
                  >
                    Create Lobby
                  </button>
                </div>
              </div>
            )}
          </div>) : (
          <div className="space-y-3">
            {/* List Header */}
            <div className="bg-white/[0.02] backdrop-blur-3xl rounded-2xl p-3 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.12)]">
              <div className="grid grid-cols-12 gap-4 items-center text-xs font-medium text-gray-400 uppercase tracking-wider">
                <div className="col-span-3">Game</div>
                <div className="col-span-2">Owner</div>
                <div className="col-span-1 text-center">Players</div>
                <div className="col-span-1 text-center">Region</div>
                <div className="col-span-2 text-center">Rank Range</div>
                <div className="col-span-1 text-center">Status</div>
                <div className="col-span-2 text-center">Actions</div>
              </div>
            </div>
            
            {filteredAndSortedLobbies.length > 0 ? (
              filteredAndSortedLobbies.map((lobby) => (
                <LobbyListItem
                  key={lobby.id}
                  lobby={lobby}
                  onJoin={handleJoinLobby}
                  onEdit={handleEditLobby}
                  onDelete={handleDeleteLobby}
                />
              ))
            ) : (
              <div className="flex flex-col items-center justify-center py-16">
                <div className={cn(
                  "bg-white/5 backdrop-blur-xl border border-white/10",
                  "rounded-2xl p-8 text-center max-w-md"
                )}>
                  <div className="w-16 h-16 mx-auto mb-4 bg-purple-500/20 rounded-full flex items-center justify-center">
                    <Users className="w-8 h-8 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-2">No lobbies found</h3>
                  <p className="text-white/60 mb-4">
                    Try adjusting your filters or create a new lobby to get started.
                  </p>
                  <button
                    onClick={handleCreateLobby}
                    className={cn(
                      "bg-blue-600 hover:bg-blue-700",
                      "text-white px-6 py-2 rounded-lg transition-all duration-300"
                    )}
                  >
                    Create Lobby
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
