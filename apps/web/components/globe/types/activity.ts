export interface Player {
  id: string;
  username: string;
  avatar: string;
  level?: number;
}

export interface CommunityActivity {
  id: string;
  type: 'matchmaking' | 'tournament' | 'squad_formation' | 'game_session' | 'event' | 'lfg';
  city: string;
  country: string;
  playerCount: number;
  title: string;
  description: string;
  timestamp: Date;
  status: 'active' | 'waiting' | 'completed';
  gameType?: string;
  priority: 'low' | 'medium' | 'high';
  players?: Player[];
  maxPlayers?: number;
}

export interface ActivityTypeConfig {
  icon: string;
  color: string;
  highlightColor: string;
  label: string;
}

export const ACTIVITY_TYPES: Record<CommunityActivity['type'], ActivityTypeConfig> = {
  matchmaking: {
    icon: '🎮',
    color: '#3B82F6', // blue
    highlightColor: '#60A5FA',
    label: 'Matchmaking'
  },
  tournament: {
    icon: '🏆',
    color: '#F59E0B', // amber
    highlightColor: '#FBBF24',
    label: 'Tournament'
  },
  squad_formation: {
    icon: '👥',
    color: '#10B981', // emerald
    highlightColor: '#34D399',
    label: 'Squad Formation'
  },
  game_session: {
    icon: '⚡',
    color: '#8B5CF6', // violet
    highlightColor: '#A78BFA',
    label: 'Live Game'
  },
  event: {
    icon: '🎉',
    color: '#EF4444', // red
    highlightColor: '#F87171',
    label: 'Special Event'
  },
  lfg: {
    icon: '🔍',
    color: '#06B6D4', // cyan
    highlightColor: '#22D3EE',
    label: 'LFG'
  }
};
