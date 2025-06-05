"use client";

import React, { useState } from 'react';
import { ProfileHeader } from './profile-header';
import { ProfileNavigation } from './profile-navigation';
import { AboutTab } from './tabs/about-tab';
import { TimelineTab } from './tabs/timeline-tab';
import { FriendsTab } from './tabs/friends-tab';
import { GroupsTab } from './tabs/groups-tab';
import { PhotosTab } from './tabs/photos-tab';
import type { 
  UserProfile, 
  ProfileStats, 
  SocialLink, 
  ProfileTabType,
  Post,
  Friend,
  Group,
  Photo
} from '@/types/user-profile';

interface UserProfilePageProps {
  profile: UserProfile;
  stats: ProfileStats;
  socialLinks: SocialLink[];
  posts: Post[];
  friends: Friend[];
  groups: Group[];
  photos: Photo[];
  isOwnProfile?: boolean;
  isFollowing?: boolean;
  onFollow?: () => void;
  onMessage?: () => void;
}

// Placeholder components for tabs that aren't implemented yet
function GamingGearTab() {
  return (
    <div className="bg-card rounded-lg p-8 border text-center">
      <p className="text-muted-foreground">Gaming Gear section coming soon...</p>
    </div>
  );
}

function GamingExperienceTab() {
  return (
    <div className="bg-card rounded-lg p-8 border text-center">
      <p className="text-muted-foreground">Gaming Experience section coming soon...</p>
    </div>
  );
}

function GamingStatsTab() {
  return (
    <div className="bg-card rounded-lg p-8 border text-center">
      <p className="text-muted-foreground">Gaming Stats section coming soon...</p>
    </div>
  );
}

function VideosTab() {
  return (
    <div className="bg-card rounded-lg p-8 border text-center">
      <p className="text-muted-foreground">Videos section coming soon...</p>
    </div>
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
      case 'timeline':
        return (
          <TimelineTab 
            posts={posts}
            onLoadMore={() => {
              // TODO: Implement load more functionality
              console.log('Load more posts');
            }}
            hasMore={false}
            isLoading={false}
          />
        );
      case 'gaming-gear':
        return <GamingGearTab />;
      case 'gaming-experience':
        return <GamingExperienceTab />;
      case 'gaming-stats':
        return <GamingStatsTab />;
      case 'friends':
        return (
          <FriendsTab 
            friends={friends}
            isOwnProfile={isOwnProfile}
            onViewAll={() => {
              // TODO: Navigate to friends page
              console.log('View all friends');
            }}
            onMessage={(friendId) => {
              // TODO: Open message dialog
              console.log('Message friend:', friendId);
            }}
            onRemoveFriend={(friendId) => {
              // TODO: Remove friend functionality
              console.log('Remove friend:', friendId);
            }}
          />
        );
      case 'groups':
        return (
          <GroupsTab 
            groups={groups}
            isOwnProfile={isOwnProfile}
            onViewAll={() => {
              // TODO: Navigate to groups page
              console.log('View all groups');
            }}
            onLeaveGroup={(groupId) => {
              // TODO: Leave group functionality
              console.log('Leave group:', groupId);
            }}
          />
        );
      case 'videos':
        return <VideosTab />;
      case 'photos':
        return (
          <PhotosTab 
            photos={photos}
            isOwnProfile={isOwnProfile}
            onViewAll={() => {
              // TODO: Navigate to photos page
              console.log('View all photos');
            }}
            onPhotoClick={(photo) => {
              // TODO: Open photo modal
              console.log('Photo clicked:', photo);
            }}
          />
        );
      default:
        return <AboutTab profile={profile} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Profile Header */}
      <div className="container mx-auto px-4 py-6">
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

      {/* Navigation */}
      <ProfileNavigation 
        activeTab={activeTab} 
        onTabChange={handleTabChange} 
      />

      {/* Tab Content */}
      <div className="container mx-auto px-4 py-6">
        <div className="max-w-4xl mx-auto">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
} 