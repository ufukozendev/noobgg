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
};

export type UserProfileResponse = UserProfile[];

// Profile page specific types
export type ProfileStats = {
  posts: number;
  followers: number;
  following: number;
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
};

export type Group = {
  id: string;
  name: string;
  iconUrl: string | null;
  memberCount: number;
  lastActivity?: string | null;
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
};

export type Photo = {
  id: string;
  url: string;
  caption: string | null;
  createdAt: string;
};

export type ProfileTabType = 'about' | 'timeline' | 'gaming-gear' | 'gaming-experience' | 'gaming-stats' | 'friends' | 'groups' | 'videos' | 'photos'; 