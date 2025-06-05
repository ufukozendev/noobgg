export type UserProfile = {
  id: string;
  userKeycloakId: string;
  createdAt: string;
  updatedAt: string | null;
  deletedAt: string | null;
  birthDate: string | null;
  userName: string;
  firstName: string | null;
  lastName: string | null;
  profileImageUrl: string | null;
  bannerImageUrl: string | null;
  bio: string | null;
  website: string | null;
  gender: 'male' | 'female' | 'unknown';
  regionType: 'north_america' | 'south_america' | 'europe' | 'asia' | 'oceania' | 'middle_east' | 'africa' | 'russia_cis' | 'unknown';
  lastOnline: string;
  rowVersion: string;
  // Gaming specific fields
  nickname?: string | null;
  club?: string | null;
  tagline?: string | null;
  currentStatus?: 'online' | 'afk' | 'offline' | 'in-game';
  gamerType?: string | null;
  professionalBackground?: string | null;
};

export type UserProfileResponse = UserProfile[];

// Profile page specific types
export type ProfileStats = {
  posts: number;
  followers: number;
  following: number;
};

// Gaming specific types
export type GameStats = {
  winRate: number;
  totalGames: number;
  rank: string;
  rating: number;
  hoursPlayed: number;
};

export type FavoriteGame = {
  id: string;
  name: string;
  iconUrl: string | null;
  stats: GameStats;
  platform: string;
};

export type PCHardware = {
  id: string;
  component: 'cpu' | 'gpu' | 'ram' | 'motherboard' | 'storage' | 'psu' | 'case' | 'monitor' | 'keyboard' | 'mouse' | 'headset';
  brand: string;
  model: string;
  imageUrl?: string | null;
};

export type GamerExperience = {
  id: string;
  game: string;
  platform: string;
  rank: string;
  experience: 'beginner' | 'intermediate' | 'advanced' | 'professional';
  startDate: string;
  achievements: string[];
};

export type ConnectedPlatform = {
  id: string;
  platform: 'steam' | 'epic' | 'origin' | 'uplay' | 'battlenet' | 'xbox' | 'playstation' | 'nintendo';
  username: string;
  profileUrl: string;
  verified: boolean;
};

export type GameReview = {
  id: string;
  gameId: string;
  gameName: string;
  gameImageUrl: string | null;
  rating: number; // 1-5 stars
  reviewText: string;
  playedHours: number;
  platform: string;
  createdAt: string;
  likes: number;
  helpful: number;
};

export type SocialLink = {
  platform: 'facebook' | 'twitter' | 'instagram' | 'youtube' | 'discord' | 'twitch';
  url: string;
};

export type Friend = {
  id: string;
  userName: string;
  profileImageUrl: string | null;
  isOnline: boolean;
  currentGame?: string | null;
  status?: 'online' | 'afk' | 'offline' | 'in-game';
};

export type Group = {
  id: string;
  name: string;
  iconUrl: string | null;
  memberCount: number;
  lastActivity?: string | null;
  category?: 'gaming' | 'esports' | 'streaming' | 'community';
  isOfficial?: boolean;
};

export type Post = {
  id: string;
  userId: string;
  userName: string;
  userProfileImageUrl: string | null;
  content: string;
  images: string[];
  createdAt: string;
  likes: number;
  comments: number;
  shares: number;
  gameTag?: string | null;
  postType?: 'achievement' | 'screenshot' | 'review' | 'general';
};

export type Photo = {
  id: string;
  url: string;
  caption: string | null;
  createdAt: string;
  category?: 'setup' | 'gameplay' | 'achievement' | 'team' | 'general';
};

export type ProfileTabType = 'about' | 'professional' | 'gamer-experience' | 'timeline' | 'media' | 'friends' | 'reviews'; 