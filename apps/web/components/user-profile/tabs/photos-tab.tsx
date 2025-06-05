"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Image, Grid3X3, List, Calendar, Download, Heart, MessageCircle } from 'lucide-react';
import type { Photo } from '@/types/user-profile';

interface PhotosTabProps {
  photos: Photo[];
  onViewAll?: () => void;
  onPhotoClick?: (photo: Photo) => void;
  onLikePhoto?: (photo: Photo) => void;
  onCommentPhoto?: (photo: Photo) => void;
  onDownloadPhoto?: (photo: Photo) => void;
  isOwnProfile?: boolean;
  locale?: string;
}

type ViewMode = 'grid' | 'list';

export function PhotosTab({ 
  photos, 
  onViewAll, 
  onPhotoClick,
  onLikePhoto,
  onCommentPhoto,
  onDownloadPhoto,
  isOwnProfile = false,
  locale = 'en-US'
}: PhotosTabProps) {
  const [viewMode, setViewMode] = useState<ViewMode>('grid');

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatTimeAgo = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800) return `${Math.floor(diffInSeconds / 86400)}d ago`;
    
    return formatDate(dateString);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Image className="w-5 h-5 text-muted-foreground" />
          <h3 className="text-lg font-semibold">Photos ({photos.length})</h3>
        </div>
        <div className="flex items-center space-x-2">
          {/* View Mode Toggle */}
          <div className="flex items-center bg-muted rounded-lg p-1">
            <Button
              variant={viewMode === 'grid' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('grid')}
              className="h-8 w-8 p-0"
            >
              <Grid3X3 className="w-4 h-4" />
            </Button>
            <Button
              variant={viewMode === 'list' ? 'default' : 'ghost'}
              size="sm"
              onClick={() => setViewMode('list')}
              className="h-8 w-8 p-0"
            >
              <List className="w-4 h-4" />
            </Button>
          </div>
          {photos.length > 0 && onViewAll && (
            <Button variant="outline" onClick={onViewAll}>
              View All Photos
            </Button>
          )}
        </div>
      </div>

      {/* Photos Content */}
      {photos.length === 0 ? (
        <div className="bg-card rounded-lg p-8 border text-center">
          <Image className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
          <p className="text-muted-foreground">
            {isOwnProfile ? "You haven't uploaded any photos yet" : "No photos to show"}
          </p>
        </div>
      ) : viewMode === 'grid' ? (
        /* Grid View */
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {photos.map((photo) => (
            <div 
              key={photo.id} 
              className="group relative aspect-square bg-muted rounded-lg overflow-hidden cursor-pointer hover:shadow-md transition-shadow"
              onClick={() => onPhotoClick?.(photo)}
            >
              <img
                src={photo.url}
                alt={photo.caption || 'Photo'}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
              />
              {/* Overlay */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
              {/* Date Badge */}
              <div className="absolute top-2 right-2 bg-black/50 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity">
                {formatTimeAgo(photo.createdAt)}
              </div>
            </div>
          ))}
        </div>
      ) : (
        /* List View */
        <div className="space-y-4">
          {photos.map((photo) => (
            <div key={photo.id} className="bg-card rounded-lg p-4 border hover:shadow-md transition-shadow">
              <div className="flex items-start space-x-4">
                {/* Thumbnail */}
                <div 
                  className="flex-shrink-0 w-20 h-20 bg-muted rounded-lg overflow-hidden cursor-pointer"
                  onClick={() => onPhotoClick?.(photo)}
                >
                  <img
                    src={photo.url}
                    alt={photo.caption || 'Photo'}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-200"
                  />
                </div>

                {/* Photo Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      {photo.caption && (
                        <h4 className="font-medium text-sm mb-1 truncate">{photo.caption}</h4>
                      )}
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{formatDate(photo.createdAt)}</span>
                        </div>
                      </div>
                    </div>

                    {/* Actions */}
                    <div className="flex items-center space-x-2">
                      {onLikePhoto && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onLikePhoto(photo)}
                          title="Like photo"
                        >
                          <Heart className="w-4 h-4" />
                        </Button>
                      )}
                      {onCommentPhoto && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onCommentPhoto(photo)}
                          title="Comment on photo"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </Button>
                      )}
                      {onDownloadPhoto && (
                        <Button 
                          variant="ghost" 
                          size="sm"
                          onClick={() => onDownloadPhoto(photo)}
                          title="Download photo"
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Photo Stats */}
      {photos.length > 0 && (
        <div className="bg-card rounded-lg p-6 border">
          <h4 className="font-medium mb-4">Photo Statistics</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <div className="text-2xl font-bold">{photos.length}</div>
              <div className="text-sm text-muted-foreground">Total Photos</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {photos.filter(p => {
                  const date = new Date(p.createdAt);
                  const now = new Date();
                  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                  return diffInDays <= 30;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">This Month</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {photos.filter(p => {
                  const date = new Date(p.createdAt);
                  const now = new Date();
                  const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
                  return diffInDays <= 7;
                }).length}
              </div>
              <div className="text-sm text-muted-foreground">This Week</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold">
                {photos.filter(p => p.caption && p.caption.length > 0).length}
              </div>
              <div className="text-sm text-muted-foreground">With Captions</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
} 