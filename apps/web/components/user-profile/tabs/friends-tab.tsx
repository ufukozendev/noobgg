"use client";

import React from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageCircle, UserMinus, Users } from 'lucide-react';
import type { Friend } from '@/types/user-profile';

interface FriendsTabProps {
  friends: Friend[];
  onViewAll?: () => void;
  onMessage?: (friendId: string) => void;
  onRemoveFriend?: (friendId: string) => void;
  isOwnProfile?: boolean;
}

export function FriendsTab({ 
  friends, 
  onViewAll, 
  onMessage, 
  onRemoveFriend,
  isOwnProfile = false 
}: FriendsTabProps) {
  const getInitials = (userName: string) => {
    return userName[0]?.toUpperCase() || 'U';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Friends ({friends.length})</h3>
        </div>
        {friends.length > 0 && onViewAll && (
          <Button variant="outline" onClick={onViewAll}>
            View All Friends
          </Button>
        )}
      </div>

      {/* Friends Grid */}
      {friends.length === 0 ? (
        <div className="bg-card rounded-lg p-8 border text-center">
          <Users className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isOwnProfile ? "You haven't added any friends yet" : "No friends to show"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {friends.map((friend) => (
            <div key={friend.id} className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
              <div className="flex flex-col items-center text-center">
                {/* Avatar with Online Status */}
                <div className="relative mb-3">
                  <Avatar className="w-16 h-16">
                    <AvatarImage 
                      src={friend.profileImageUrl || undefined} 
                      alt={friend.userName}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-lg">
                      {getInitials(friend.userName)}
                    </AvatarFallback>
                  </Avatar>
                  {/* Online Status Indicator */}
                  <div className={`absolute bottom-0 right-0 w-5 h-5 border-2 border-white rounded-full ${
                    friend.isOnline ? 'bg-green-500' : 'bg-gray-400'
                  }`} />
                </div>

                {/* Friend Info */}
                <div className="mb-3">
                  <h4 className="font-medium text-sm">{friend.userName}</h4>
                  <p className="text-xs text-muted-foreground">
                    {friend.isOnline ? 'Online' : 'Offline'}
                  </p>
                </div>

                {/* Action Buttons */}
                <div className="flex space-x-2 w-full">
                  {onMessage && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onMessage(friend.id)}
                      className="flex-1 flex items-center justify-center space-x-1"
                    >
                      <MessageCircle className="w-3 h-3" />
                      <span className="text-xs">Message</span>
                    </Button>
                  )}
                  {isOwnProfile && onRemoveFriend && (
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => onRemoveFriend(friend.id)}
                      className="flex items-center justify-center"
                    >
                      <UserMinus className="w-3 h-3" />
                    </Button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Online Friends Section */}
      {friends.some(friend => friend.isOnline) && (
        <div className="bg-card rounded-lg p-6 border">
          <h4 className="font-medium mb-4 flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full" />
            <span>Online Friends ({friends.filter(f => f.isOnline).length})</span>
          </h4>
          <div className="flex flex-wrap gap-2">
            {friends
              .filter(friend => friend.isOnline)
              .slice(0, 10)
              .map((friend) => (
                <div key={friend.id} className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1">
                  <Avatar className="w-6 h-6">
                    <AvatarImage 
                      src={friend.profileImageUrl || undefined} 
                      alt={friend.userName}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-xs">
                      {getInitials(friend.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <span className="text-sm font-medium">{friend.userName}</span>
                </div>
              ))}
            {friends.filter(f => f.isOnline).length > 10 && (
              <div className="flex items-center space-x-2 bg-muted rounded-full px-3 py-1">
                <span className="text-sm text-muted-foreground">
                  +{friends.filter(f => f.isOnline).length - 10} more
                </span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
} 