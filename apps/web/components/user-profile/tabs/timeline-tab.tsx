"use client";

import React, { useState } from 'react';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { 
  Heart, 
  MessageCircle, 
  Share, 
  MoreHorizontal,
  Filter,
  Users,
  Hash,
  AtSign
} from 'lucide-react';
import type { Post } from '@/types/user-profile';

interface TimelineTabProps {
  posts: Post[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
}

type FilterType = 'all' | 'mentions' | 'friends' | 'groups';

const filters = [
  { id: 'all' as FilterType, label: 'All Updates', icon: Hash },
  { id: 'mentions' as FilterType, label: 'Mentions', icon: AtSign },
  { id: 'friends' as FilterType, label: 'Friends', icon: Users },
  { id: 'groups' as FilterType, label: 'Groups', icon: Users },
];

export function TimelineTab({ posts, onLoadMore, hasMore = false, isLoading = false }: TimelineTabProps) {
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return date.toLocaleDateString('tr-TR', { 
      month: 'short', 
      day: 'numeric',
      year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
  };

  const getInitials = (userName: string) => {
    return userName[0]?.toUpperCase() || 'U';
  };

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
        </div>
      </div>

      {/* Posts */}
      <div className="space-y-4">
        {posts.length === 0 ? (
          <div className="bg-card rounded-lg p-8 border text-center">
            <p className="text-muted-foreground">No posts to show</p>
          </div>
        ) : (
          posts.map((post) => (
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
                    <p className="text-sm text-muted-foreground">{formatTimeAgo(post.createdAt)}</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
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
                    {post.images.slice(0, 4).map((image, index) => (
                      <div key={index} className="relative">
                        <img
                          src={image}
                          alt={`Post image ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        {post.images.length > 4 && index === 3 && (
                          <div className="absolute inset-0 bg-black/50 rounded-lg flex items-center justify-center">
                            <span className="text-white font-medium">+{post.images.length - 4}</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Post Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-6">
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-red-500">
                    <Heart className="w-4 h-4" />
                    <span>{post.likes.toLocaleString()}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-blue-500">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments.toLocaleString()}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2 text-muted-foreground hover:text-green-500">
                    <Share className="w-4 h-4" />
                    <span>{post.shares.toLocaleString()}</span>
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