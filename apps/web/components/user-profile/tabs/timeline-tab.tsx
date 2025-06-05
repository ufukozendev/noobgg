"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Filter,
  Users,
  Users2,
  Hash,
  AtSign
} from 'lucide-react';
import type { Post } from '@/types/user-profile';
import { formatTimeAgo, getUserLocale, formatNumber } from '@/lib/utils';

interface TimelineTabProps {
  posts: Post[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  locale?: string;
}

type FilterType = 'all' | 'mentions' | 'friends' | 'groups';

const filters = [
  { id: 'all' as FilterType, label: 'All Updates', icon: Hash },
  { id: 'mentions' as FilterType, label: 'Mentions', icon: AtSign },
  { id: 'friends' as FilterType, label: 'Friends', icon: Users },
  { id: 'groups' as FilterType, label: 'Groups', icon: Users2 },
];

export function TimelineTab({ posts, onLoadMore, hasMore = false, isLoading = false, locale }: TimelineTabProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');
  const [userLocale, setUserLocale] = useState<string>('en-US');
  const [brokenImages, setBrokenImages] = useState<Set<string>>(new Set());

  useEffect(() => {
    // Get user locale dynamically
    const dynamicLocale = locale || getUserLocale();
    setUserLocale(dynamicLocale);
  }, [locale]);

  const getInitials = (userName: string) => {
    return userName[0]?.toUpperCase() || 'U';
  };



  const handleImageError = (imageUrl: string) => {
    setBrokenImages(prev => new Set(prev.add(imageUrl)));
  };

  const isImageBroken = (imageUrl: string) => {
    return brokenImages.has(imageUrl);
  };

  // Filter posts based on activeFilter
  const filteredPosts = useMemo(() => {
    if (activeFilter === 'all') return posts;
    
    return posts.filter(post => {
      switch (activeFilter) {
        case 'mentions': 
          // Filter posts that contain @ mentions
          return post.content.includes('@');
        case 'friends':  
          // Filter posts based on postType or content (simulate friend posts)
          return post.postType === 'achievement' || post.postType === 'screenshot';
        case 'groups':   
          // Filter posts that have gameTag or are review/achievement types
          return post.gameTag !== null || post.postType === 'review';
        default:         
          return true;
      }
    });
  }, [posts, activeFilter]);

  return (
    <div className="space-y-6">
      {/* Filter Tabs */}
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex items-center space-x-2 mb-4">
          <Filter className="w-5 h-5 text-muted-foreground" />
          <span className="font-medium">Filter Posts</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => {
            const Icon = filter.icon;
            return (
              <Button
                key={filter.id}
                variant={activeFilter === filter.id ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveFilter(filter.id)}
                className="flex items-center space-x-2"
              >
                <Icon className="w-4 h-4" />
                <span>{filter.label}</span>
              </Button>
            );
          })}

          {/* …later, replace `posts.map(...)` with `filteredPosts.map(...)` */}
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {filteredPosts.length === 0 ? (
          <div className="bg-card rounded-lg p-8 border text-center">
            <p className="text-muted-foreground">
              {activeFilter === 'all' ? 'No posts to show' : `No ${activeFilter} posts found`}
            </p>
          </div>
        ) : (
          filteredPosts.map((post) => (
            <div key={post.id} className="bg-card rounded-lg p-6 border">
              {/* Post Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center space-x-3">
                  <Avatar className="w-10 h-10">
                    <AvatarImage 
                      src={post.userProfileImageUrl || undefined} 
                      alt={post.userName}
                    />
                    <AvatarFallback className="bg-gradient-to-r from-blue-500 to-purple-500 text-white">
                      {getInitials(post.userName)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{post.userName}</p>
                    <p className="text-sm text-muted-foreground">{formatTimeAgo(post.createdAt, userLocale)}</p>
                  </div>
                </div>
                <Button 
                  variant="ghost" 
                  size="sm"
                  aria-label={`More options for post by ${post.userName}`}
                >
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>

              {/* Post Content */}
              <div className="mb-4">
                <p className="text-foreground leading-relaxed whitespace-pre-wrap">{post.content}</p>
              </div>

              {/* Post Images */}
              {post.images && post.images.length > 0 && (
                <div className="mb-4">
                  <div className={`grid gap-2 ${
                    post.images.length === 1 ? 'grid-cols-1' :
                    post.images.length === 2 ? 'grid-cols-2' :
                    post.images.length === 3 ? 'grid-cols-3' :
                    'grid-cols-2'
                  }`}>
                    {post.images.slice(0, 4).map((image, index) => {
                      const imageKey = `${post.id}-${index}`;
                      const imageBroken = isImageBroken(imageKey);
                      
                      return (
                        <div key={index} className="relative">
                          {!imageBroken ? (
                            <img
                              src={image}
                              alt={`Post image ${index + 1}`}
                              className="w-full h-48 object-cover rounded-lg"
                              onError={() => handleImageError(imageKey)}
                            />
                          ) : (
                            <div className="w-full h-48 bg-muted rounded-lg flex items-center justify-center">
                              <div className="text-center">
                                <div className="text-muted-foreground text-sm mb-1">Image unavailable</div>
                                <div className="text-xs text-muted-foreground">Failed to load</div>
                              </div>
                            </div>
                          )}
                          {post.images.length > 4 && index === 3 && (
                            <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                              <span className="text-white font-medium">+{post.images.length - 4}</span>
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2 text-muted-foreground hover:text-red-500"
                    aria-label={`Like post by ${post.userName}. Currently ${formatNumber(post.likes, userLocale)} likes`}
                  >
                    <Heart className="w-4 h-4" />
                    <span>{formatNumber(post.likes, userLocale)}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500"
                    aria-label={`Comment on post by ${post.userName}. Currently ${formatNumber(post.comments, userLocale)} comments`}
                  >
                    <MessageCircle className="w-4 h-4" />
                    <span>{formatNumber(post.comments, userLocale)}</span>
                  </Button>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    className="flex items-center space-x-2 text-muted-foreground hover:text-green-500"
                    aria-label={`Share post by ${post.userName}. Currently ${formatNumber(post.shares, userLocale)} shares`}
                  >
                    <Share className="w-4 h-4" />
                    <span>{formatNumber(post.shares, userLocale)}</span>
                  </Button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Load More */}
      {hasMore && (
        <div className="text-center">
          <Button 
            variant="outline" 
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Posts'}
          </Button>
        </div>
      )}
    </div>
  );
} 