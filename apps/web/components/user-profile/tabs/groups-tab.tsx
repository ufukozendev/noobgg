"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Users2, ExternalLink, Crown, Shield, User } from 'lucide-react';
import type { Group } from '@/types/user-profile';
import { formatTimeAgo, getUserLocale } from '@/lib/utils';

interface GroupsTabProps {
  groups: Group[];
  onViewAll?: () => void;
  onJoinGroup?: (groupId: string) => void;
  onLeaveGroup?: (groupId: string) => void;
  isOwnProfile?: boolean;
  locale?: string;
}

export function GroupsTab({ 
  groups, 
  onViewAll, 
  onJoinGroup, 
  onLeaveGroup,
  isOwnProfile = false,
  locale 
}: GroupsTabProps) {
  const [userLocale, setUserLocale] = useState<string>('en-US');

  useEffect(() => {
    // Get user locale dynamically
    const dynamicLocale = locale || getUserLocale();
    setUserLocale(dynamicLocale);
  }, [locale]);
  const formatMemberCount = (count: number) => {
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    }
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };

  const getGroupIcon = (groupName: string) => {
    // Simple logic to assign different icons based on group name
    const name = groupName.toLowerCase();
    if (name.includes('admin') || name.includes('mod')) return Crown;
    if (name.includes('vip') || name.includes('premium')) return Shield;
    return Users2;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Users2 className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Groups ({groups.length})</h3>
        </div>
        {groups.length > 0 && onViewAll && (
          <Button variant="outline" onClick={onViewAll}>
            View All Groups
          </Button>
        )}
      </div>

      {/* Groups Grid */}
      {groups.length === 0 ? (
        <div className="bg-card rounded-lg p-8 border text-center">
          <Users2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isOwnProfile ? "You haven't joined any groups yet" : "No groups to show"}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {groups.map((group) => {
            const IconComponent = getGroupIcon(group.name);
            return (
              <div key={group.id} className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow">
                <div className="flex items-start space-x-4">
                  {/* Group Icon */}
                  <div className="flex-shrink-0">
                    {group.iconUrl ? (
                      <img
                        src={group.iconUrl}
                        alt={group.name}
                        className="w-12 h-12 rounded-lg object-cover"
                      />
                    ) : (
                      <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                    )}
                  </div>

                  {/* Group Info */}
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm truncate">{group.name}</h4>
                    <div className="flex items-center space-x-1 mt-1">
                      <User className="w-3 h-3 text-muted-foreground" />
                      <span className="text-xs text-muted-foreground">
                        {formatMemberCount(group.memberCount)} members
                      </span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div className="flex-shrink-0">
                    <Button variant="ghost" size="sm">
                      <ExternalLink className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Group Actions */}
                <div className="mt-4 pt-4 border-t">
                  <div className="flex space-x-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="flex-1"
                    >
                      View Group
                    </Button>
                    {isOwnProfile && onLeaveGroup && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => onLeaveGroup(group.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        Leave
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Group Categories */}
      {groups.length > 0 && (
        <div className="bg-card rounded-lg p-6 border">
          <h4 className="font-medium mb-4">Group Categories</h4>
          <div className="flex flex-wrap gap-2">
            {Array.from(new Set(groups.map(group => {
              const name = group.name.toLowerCase();
              if (name.includes('gaming')) return 'Gaming';
              if (name.includes('tech')) return 'Technology';
              if (name.includes('art')) return 'Art & Design';
              if (name.includes('music')) return 'Music';
              if (name.includes('sport')) return 'Sports';
              return 'General';
            }))).map((category) => (
              <div key={category} className="bg-muted rounded-full px-3 py-1">
                <span className="text-sm font-medium">{category}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Activity */}
      {groups.length > 0 && (
        <div className="bg-card rounded-lg p-6 border">
          <h4 className="font-medium mb-4">Recent Group Activity</h4>
          <div className="space-y-3">
            {groups.slice(0, 3).map((group) => (
              <div key={group.id} className="flex items-center space-x-3 text-sm">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                  <Users2 className="w-4 h-4 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-muted-foreground">
                    Active in <span className="font-medium text-foreground">{group.name}</span>
                  </p>
                </div>
                {group.lastActivity && (
                  <div className="flex-shrink-0">
                    <span className="text-xs text-muted-foreground">
                      {formatTimeAgo(group.lastActivity, userLocale)}
                    </span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
} 