"use client";

import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { 
  Trophy, 
  Award, 
  Users, 
  Calendar,
  MapPin,
  Star,
  Target,
  TrendingUp,
  Medal,
  Clock,
  ExternalLink
} from 'lucide-react';
import type { UserProfile, GamerExperience, ConnectedPlatform } from '@/types/user-profile';
import { getUserLocale, formatRegion, getStatusIndicatorClass } from '@/lib/utils';

interface ProfessionalTabProps {
  profile: UserProfile;
  gamerExperiences: GamerExperience[];
  connectedPlatforms: ConnectedPlatform[];
  locale?: string;
}

export function ProfessionalTab({ 
  profile, 
  gamerExperiences, 
  connectedPlatforms, 
  locale 
}: ProfessionalTabProps) {
  const [userLocale, setUserLocale] = useState<string>('en-US');

  useEffect(() => {
    const dynamicLocale = locale || getUserLocale();
    setUserLocale(dynamicLocale);
  }, [locale]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString(userLocale, {
      year: 'numeric',
      month: 'long'
    });
  };

  const getExperienceColor = (experience: string) => {
    switch (experience) {
      case 'professional': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'advanced': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'intermediate': return 'bg-green-100 text-green-800 border-green-200';
      case 'beginner': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPlatformIcon = (platform: string) => {
    // You can customize these based on actual platform icons
    return <ExternalLink className="w-4 h-4" />;
  };

  return (
    <div className="space-y-6">
      {/* Professional Overview */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center space-x-2 mb-4">
          <Trophy className="w-5 h-5 text-yellow-500" />
          <h3 className="text-lg font-semibold">Professional Background</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Club Information */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Users className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Current Club</p>
                <p className="font-medium text-lg">{profile.club || 'Independent Player'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Target className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Specialization</p>
                <p className="font-medium">{profile.tagline || 'Multi-Game Player'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <MapPin className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Region</p>
                <p className="font-medium">{formatRegion(profile.regionType)}</p>
              </div>
            </div>
          </div>

          {/* Career Stats */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Career Started</p>
                <p className="font-medium">{formatDate(profile.createdAt)}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Star className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Player Type</p>
                <p className="font-medium">{profile.gamerType || 'Competitive Gamer'}</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <TrendingUp className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Status</p>
                <div className="flex items-center space-x-2">
                  <div className={`w-3 h-3 rounded-full ${getStatusIndicatorClass(profile.currentStatus || 'offline')}`} />
                  <span className="font-medium capitalize">{profile.currentStatus || 'offline'}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Background Text */}
        {profile.professionalBackground && (
          <div className="mt-6 pt-6 border-t">
            <h4 className="font-medium mb-3">Professional Journey</h4>
            <p className="text-muted-foreground leading-relaxed">{profile.professionalBackground}</p>
          </div>
        )}
      </div>

      {/* Gaming Experience */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center space-x-2 mb-4">
          <Award className="w-5 h-5 text-blue-500" />
          <h3 className="text-lg font-semibold">Gaming Experience</h3>
        </div>
        
        {gamerExperiences.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No gaming experience added yet</p>
        ) : (
          <div className="space-y-4">
            {gamerExperiences.map((experience) => (
              <div key={experience.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <div className="flex items-center space-x-3 mb-2">
                      <h4 className="font-medium text-lg">{experience.game}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getExperienceColor(experience.experience)}`}>
                        {experience.experience}
                      </span>
                    </div>
                    <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                      <span>Platform: {experience.platform}</span>
                      <span>Rank: {experience.rank}</span>
                      <span>Since: {formatDate(experience.startDate)}</span>
                    </div>
                  </div>
                </div>
                
                {experience.achievements.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium mb-2">Achievements:</p>
                    <div className="flex flex-wrap gap-2">
                      {experience.achievements.map((achievement, index) => (
                        <span key={index} className="bg-muted px-2 py-1 rounded text-xs">
                          <Medal className="w-3 h-3 inline mr-1" />
                          {achievement}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Connected Platforms */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex items-center space-x-2 mb-4">
          <ExternalLink className="w-5 h-5 text-green-500" />
          <h3 className="text-lg font-semibold">Connected Gaming Platforms</h3>
        </div>
        
        {connectedPlatforms.length === 0 ? (
          <p className="text-muted-foreground text-center py-8">No connected platforms</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {connectedPlatforms.map((platform) => (
              <div key={platform.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                <div className="flex items-center space-x-3">
                  {getPlatformIcon(platform.platform)}
                  <div className="flex-1">
                    <div className="flex items-center space-x-2">
                      <h4 className="font-medium capitalize">{platform.platform}</h4>
                      {platform.verified && (
                        <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                          <div className="w-2 h-2 bg-white rounded-full" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground">{platform.username}</p>
                  </div>
                  <Button variant="ghost" size="sm" asChild>
                    <a href={platform.profileUrl} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 