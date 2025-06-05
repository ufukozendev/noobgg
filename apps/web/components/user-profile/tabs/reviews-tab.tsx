"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectOption } from '@/components/ui/select';
import { 
  Star, 
  ThumbsUp, 
  MessageCircle, 
  Clock,
  Gamepad2,
  Filter,
  SortDesc,
  Eye,
  Award,
  TrendingUp,
  Calendar
} from 'lucide-react';
import type { GameReview } from '@/types/user-profile';
import { getUserLocale, formatTimeAgo } from '@/lib/utils';

interface ReviewsTabProps {
  reviews: GameReview[];
  onLoadMore?: () => void;
  hasMore?: boolean;
  isLoading?: boolean;
  locale?: string;
}

type SortOption = 'newest' | 'oldest' | 'rating-high' | 'rating-low' | 'most-helpful';
type FilterOption = 'all' | '5-star' | '4-star' | '3-star' | '2-star' | '1-star';

export function ReviewsTab({ 
  reviews, 
  onLoadMore, 
  hasMore = false, 
  isLoading = false, 
  locale 
}: ReviewsTabProps) {
  const [userLocale, setUserLocale] = useState<string>('en-US');
  const [sortBy, setSortBy] = useState<SortOption>('newest');
  const [filterBy, setFilterBy] = useState<FilterOption>('all');

  useEffect(() => {
    const dynamicLocale = locale || getUserLocale();
    setUserLocale(dynamicLocale);
  }, [locale]);

  const formatNumber = (num: number) => {
    return num.toLocaleString(userLocale);
  };

  const formatHours = (hours: number) => {
    if (hours >= 1000) {
      return `${(hours / 1000).toFixed(1)}K hours`;
    }
    return `${hours} hours`;
  };

  const renderStars = (rating: number, size: 'sm' | 'md' = 'sm') => {
    const sizeClass = size === 'sm' ? 'w-4 h-4' : 'w-5 h-5';
    return (
      <div className="flex items-center space-x-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`${sizeClass} ${
              star <= rating 
                ? 'text-yellow-400 fill-yellow-400' 
                : 'text-gray-300'
            }`}
          />
        ))}
      </div>
    );
  };

  const filteredAndSortedReviews = useMemo(() => {
    let filtered = reviews;

    // Apply filter
    if (filterBy !== 'all') {
      const rating = parseInt(filterBy.split('-')[0]);
      filtered = reviews.filter(review => review.rating === rating);
    }

    // Apply sort
    return filtered.sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
        case 'oldest':
          return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
        case 'rating-high':
          return b.rating - a.rating;
        case 'rating-low':
          return a.rating - b.rating;
        case 'most-helpful':
          return b.helpful - a.helpful;
        default:
          return 0;
      }
    });
  }, [reviews, filterBy, sortBy]);

  const averageRating = useMemo(() => {
    if (reviews.length === 0) return 0;
    const total = reviews.reduce((sum, review) => sum + review.rating, 0);
    return (total / reviews.length).toFixed(1);
  }, [reviews]);

  const ratingDistribution = useMemo(() => {
    const distribution = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };
    reviews.forEach(review => {
      distribution[review.rating as keyof typeof distribution]++;
    });
    return distribution;
  }, [reviews]);

  const sortOptions = [
    { value: 'newest', label: 'Newest First' },
    { value: 'oldest', label: 'Oldest First' },
    { value: 'rating-high', label: 'Highest Rating' },
    { value: 'rating-low', label: 'Lowest Rating' },
    { value: 'most-helpful', label: 'Most Helpful' },
  ];

  const filterOptions = [
    { value: 'all', label: 'All Reviews' },
    { value: '5-star', label: '5 Stars' },
    { value: '4-star', label: '4 Stars' },
    { value: '3-star', label: '3 Stars' },
    { value: '2-star', label: '2 Stars' },
    { value: '1-star', label: '1 Star' },
  ];



  return (
    <div className="space-y-6">
      {/* Reviews Overview */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center space-x-2 mb-4">
          <Star className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Reviews Overview</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="text-center">
            <div className="text-3xl font-bold text-blue-600">{reviews.length}</div>
            <div className="text-sm text-muted-foreground">Total Reviews</div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2">
              <div className="text-3xl font-bold text-yellow-600">{averageRating}</div>
              <Star className="w-6 h-6 text-yellow-400 fill-yellow-400" />
            </div>
            <div className="text-sm text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-600">
              {formatHours(reviews.reduce((total, review) => total + review.playedHours, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Hours Reviewed</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-purple-600">
              {formatNumber(reviews.reduce((total, review) => total + review.helpful, 0))}
            </div>
            <div className="text-sm text-muted-foreground">Helpful Votes</div>
          </div>
        </div>

        {/* Rating Distribution */}
        <div className="mt-6 pt-6 border-t">
          <h4 className="font-medium mb-3">Rating Distribution</h4>
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center space-x-3">
                <span className="text-sm font-medium w-6">{rating}</span>
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <div className="flex-1 bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-yellow-400 h-2 rounded-full" 
                    style={{ 
                      width: `${reviews.length > 0 ? (ratingDistribution[rating as keyof typeof ratingDistribution] / reviews.length) * 100 : 0}%` 
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-8">
                  {ratingDistribution[rating as keyof typeof ratingDistribution]}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="bg-card rounded-lg p-4 border">
        <div className="flex flex-wrap items-center gap-4">
          <div className="flex items-center space-x-2">
            <Filter className="w-4 h-4 text-muted-foreground" />
            <Select
              value={filterBy}
              onChange={(e) => setFilterBy(e.target.value as FilterOption)}
              className="w-auto min-w-[120px]"
            >
              {filterOptions.map(option => (
                <SelectOption key={option.value} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </Select>
          </div>

          <div className="flex items-center space-x-2">
            <SortDesc className="w-4 h-4 text-muted-foreground" />
            <Select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="w-auto min-w-[140px]"
            >
              {sortOptions.map(option => (
                <SelectOption key={option.value} value={option.value}>
                  {option.label}
                </SelectOption>
              ))}
            </Select>
          </div>

          <div className="text-sm text-muted-foreground">
            Showing {filteredAndSortedReviews.length} of {reviews.length} reviews
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredAndSortedReviews.length === 0 ? (
          <div className="bg-card rounded-lg p-8 border text-center">
            <Gamepad2 className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground">
              {reviews.length === 0 ? "No reviews written yet" : "No reviews match the current filter"}
            </p>
          </div>
        ) : (
          filteredAndSortedReviews.map((review) => (
            <div key={review.id} className="bg-card rounded-lg p-6 border hover:shadow-md transition-shadow">
              {/* Review Header */}
              <div className="flex items-start space-x-4 mb-4">
                {review.gameImageUrl ? (
                  <img
                    src={review.gameImageUrl}
                    alt={review.gameName}
                    className="w-16 h-16 rounded-lg object-cover"
                  />
                ) : (
                  <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    <Gamepad2 className="w-8 h-8 text-white" />
                  </div>
                )}
                
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-lg">{review.gameName}</h4>
                    {renderStars(review.rating, 'md')}
                  </div>
                  
                  <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                    <div className="flex items-center space-x-1">
                      <Clock className="w-4 h-4" />
                      <span>{formatHours(review.playedHours)} played</span>
                    </div>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4" />
                      <span>{formatTimeAgo(review.createdAt, userLocale)}</span>
                    </div>
                    <span>{review.platform}</span>
                  </div>
                </div>
              </div>

              {/* Review Content */}
              <div className="mb-4">
                <p className="text-foreground leading-relaxed">{review.reviewText}</p>
              </div>

              {/* Review Actions */}
              <div className="flex items-center justify-between pt-4 border-t">
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <ThumbsUp className="w-4 h-4" />
                    <span>{formatNumber(review.likes)} likes</span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-muted-foreground">
                    <Award className="w-4 h-4" />
                    <span>{formatNumber(review.helpful)} helpful</span>
                  </div>
                </div>
                
                <div className="text-sm font-medium text-blue-600">
                  {review.rating}/5 stars
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
            {isLoading ? 'Loading...' : 'Load More Reviews'}
          </Button>
        </div>
      )}
    </div>
  );
} 