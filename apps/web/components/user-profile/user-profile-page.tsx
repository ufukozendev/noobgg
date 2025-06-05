"use client";

import React, { useState } from 'react';
import { Navbar } from '@/components/ui/navbar';
import { ProfileHeader } from './profile-header';
import { ProfileNavigation } from './profile-navigation';
import { AboutTab } from './tabs/about-tab';
import { ProfessionalTab } from './tabs/professional-tab';
import { GamerExperienceTab } from './tabs/gamer-experience-tab';
import { TimelineTab } from './tabs/timeline-tab';
import { FriendsTab } from './tabs/friends-tab';
import { PhotosTab } from './tabs/photos-tab';
import { ReviewsTab } from './tabs/reviews-tab';
import type { 
  UserProfile, 
  ProfileStats, 
  SocialLink, 
  ProfileTabType,
  Post,
  Friend,
  Group,
  Photo,
  GamerExperience,
  ConnectedPlatform,
  FavoriteGame,
  PCHardware,
  GameReview
} from '@/types/user-profile';

interface UserProfilePageProps {
  profile: UserProfile;
  stats: ProfileStats;
  socialLinks: SocialLink[];
  posts: Post[];
  friends: Friend[];
  groups: Group[];
  photos: Photo[];
  // Gaming specific props
  gamerExperiences: GamerExperience[];
  connectedPlatforms: ConnectedPlatform[];
  favoriteGames: FavoriteGame[];
  pcHardware: PCHardware[];
  gameReviews: GameReview[];
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

// Media tab combines photos and videos
function MediaTab({ photos, isOwnProfile }: { photos: Photo[], isOwnProfile: boolean }) {
  return (
    <PhotosTab 
      photos={photos}
      isOwnProfile={isOwnProfile}
      onViewAll={() => {
        console.log('View all media');
      }}
      onPhotoClick={(photo) => {
        console.log('Photo clicked:', photo);
      }}
    />
  );
}

export function UserProfilePage({
  profile,
  stats,
  socialLinks,
  posts,
  friends,
  groups,
  photos,
  gamerExperiences,
  connectedPlatforms,
  favoriteGames,
  pcHardware,
  gameReviews,
  isOwnProfile = false,
  isFollowing = false,
  onFollow,
  onMessage,
}: UserProfilePageProps) {
  const [activeTab, setActiveTab] = useState<ProfileTabType>('about');

  const handleTabChange = (tab: ProfileTabType) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'about':
        return <AboutTab profile={profile} />;
      
      case 'professional':
        return (
          <ProfessionalTab 
            profile={profile}
            gamerExperiences={gamerExperiences}
            connectedPlatforms={connectedPlatforms}
          />
        );
      
      case 'gamer-experience':
        return (
          <GamerExperienceTab 
            profile={profile}
            favoriteGames={favoriteGames}
            pcHardware={pcHardware}
          />
        );
      
      case 'timeline':
        return (
          <TimelineTab 
            posts={posts}
            onLoadMore={() => {
              console.log('Load more posts');
            }}
            hasMore={false}
            isLoading={false}
          />
        );
      
      case 'media':
        return <MediaTab photos={photos} isOwnProfile={isOwnProfile} />;
      
      case 'friends':
        return (
          <FriendsTab 
            friends={friends}
            isOwnProfile={isOwnProfile}
            onViewAll={() => {
              console.log('View all friends');
            }}
            onMessage={(friendId) => {
              console.log('Message friend:', friendId);
            }}
            onRemoveFriend={(friendId) => {
              console.log('Remove friend:', friendId);
            }}
          />
        );
      
      case 'reviews':
        return (
          <ReviewsTab 
            reviews={gameReviews}
            onLoadMore={() => {
              console.log('Load more reviews');
            }}
            hasMore={false}
            isLoading={false}
          />
        );
      
      default:
        return <AboutTab profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Top Navbar */}
      <Navbar />
      
      {/* Main Content Area with Sidebar Layout */}
      <div className="flex">
        {/* Left Sidebar - Navigation */}
        <ProfileNavigation 
          activeTab={activeTab} 
          onTabChange={handleTabChange} 
        />

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col">
          {/* Profile Header */}
          <div className="p-6 border-b">
            <ProfileHeader
              profile={profile}
              stats={stats}
              socialLinks={socialLinks}
              isOwnProfile={isOwnProfile}
              isFollowing={isFollowing}
              onFollow={onFollow}
              onMessage={onMessage}
            />
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6 px-12">
            <div className="max-w-6xl mx-auto">
              {renderTabContent()}
            </div>
          </div>
        </div>

        {/* Right Sidebar - Credits, Badges, Quests */}
        <div className="w-80 bg-card border-l p-6 space-y-6">
          {/* Credits */}
          <div className="bg-background rounded-lg p-4 border">
            <h3 className="font-semibold text-lg mb-3 text-right">Credits</h3>
            <div className="text-right space-y-2">
              <div className="text-2xl font-bold text-primary">2,340</div>
              <div className="text-sm text-muted-foreground">Available Credits</div>
            </div>
          </div>

          {/* Badges */}
          <div className="bg-background rounded-lg p-4 border">
            <h3 className="font-semibold text-lg mb-3 text-right">Badges</h3>
            <div className="grid grid-cols-3 gap-2">
              {[1, 2, 3, 4, 5, 6].map((badge) => (
                <div key={badge} className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <span className="text-white text-xs font-bold">{badge}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quests */}
          <div className="bg-background rounded-lg p-4 border">
            <h3 className="font-semibold text-lg mb-3 text-right">Quests</h3>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm">Daily Login</span>
                <div className="w-6 h-6 bg-green-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Win 3 Games</span>
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center">
                  <div className="w-3 h-3 bg-white rounded-full"></div>
                </div>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Stream 2h</span>
                <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
              </div>
            </div>
          </div>

          {/* Learn More Section */}
          <div className="bg-background rounded-lg p-4 border">
            <h3 className="font-semibold text-lg mb-3 text-right">Learn More</h3>
            <div className="text-sm text-muted-foreground text-right space-y-2">
              <div>Blizzard is offline.</div>
              <div>Learn more about</div>
              <div>them on their channel!</div>
            </div>
          </div>

          {/* Photos */}
          <div className="bg-background rounded-lg p-4 border">
            <h3 className="font-semibold text-lg mb-3 text-right">Photos</h3>
            <div className="grid grid-cols-2 gap-2">
              {photos.slice(0, 4).map((photo) => (
                <img
                  key={photo.id}
                  src={photo.url}
                  alt={photo.caption || 'Photo'}
                  className="w-full h-20 object-cover rounded"
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 