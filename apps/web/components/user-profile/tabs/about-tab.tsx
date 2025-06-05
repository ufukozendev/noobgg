"use client";

import React, { useEffect, useState } from 'react';
import { Calendar, MapPin, Globe, User, ExternalLink } from 'lucide-react';
import type { UserProfile } from '@/types/user-profile';
import { getUserLocale } from '@/lib/utils';

interface AboutTabProps {
  profile: UserProfile;
  locale?: string;
}

export function AboutTab({ profile, locale }: AboutTabProps) {
  // State for client-side only date formatting to prevent hydration mismatch
  const [formattedJoinDate, setFormattedJoinDate] = useState<string>('');
  const [formattedLastOnline, setFormattedLastOnline] = useState<string>('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    
    // Get user locale dynamically
    const userLocale = locale || getUserLocale();
    
    // Format dates only on client-side
    if (profile.createdAt) {
      setFormattedJoinDate(
        new Date(profile.createdAt).toLocaleDateString(userLocale, {
          year: 'numeric',
          month: 'long',
          day: 'numeric'
        })
      );
    }

    if (profile.lastOnline) {
      setFormattedLastOnline(
        new Date(profile.lastOnline).toLocaleDateString(userLocale, {
          year: 'numeric',
          month: 'short',
          day: 'numeric',
          hour: '2-digit',
          minute: '2-digit'
        })
      );
    }
  }, [profile.createdAt, profile.lastOnline, locale]);

  const formatRegion = (region: string) => {
    return region.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
  };

  const formatGender = (gender: string) => {
    return gender.charAt(0).toUpperCase() + gender.slice(1);
  };

  const calculateAge = (birthDate: string | null) => {
    if (!birthDate) return null;
    const today = new Date();
    const birth = new Date(birthDate);
    let age = today.getFullYear() - birth.getFullYear();
    const monthDiff = today.getMonth() - birth.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < birth.getDate())) {
      age--;
    }
    return age;
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* About Me Section */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">About Me</h3>
        {profile.bio ? (
          <p className="text-muted-foreground leading-relaxed text-center">{profile.bio}</p>
        ) : (
          <p className="text-muted-foreground italic text-center">No bio available</p>
        )}
      </div>

      {/* Basic Information */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Basic Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Full Name</p>
              <p className="font-medium">
                {profile.firstName && profile.lastName 
                  ? `${profile.firstName} ${profile.lastName}` 
                  : 'Not specified'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <User className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Gender</p>
              <p className="font-medium">{formatGender(profile.gender)}</p>
            </div>
          </div>

          {profile.birthDate && (
            <div className="flex items-center space-x-3">
              <Calendar className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Age</p>
                <p className="font-medium">{calculateAge(profile.birthDate)} years old</p>
              </div>
            </div>
          )}

          <div className="flex items-center space-x-3">
            <MapPin className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Region</p>
              <p className="font-medium">{formatRegion(profile.regionType)}</p>
            </div>
          </div>

          {profile.website && (
            <div className="flex items-center space-x-3">
              <ExternalLink className="w-5 h-5 text-muted-foreground" />
              <div>
                <p className="text-sm text-muted-foreground">Website</p>
                <a 
                  href={profile.website} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="font-medium text-primary hover:underline"
                >
                  {profile.website.replace(/^https?:\/\//, '')}
                </a>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Account Information */}
      <div className="bg-card rounded-lg p-6 border">
        <h3 className="text-lg font-semibold mb-4">Account Information</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <Calendar className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Joined</p>
              <p className="font-medium">
                {isClient ? formattedJoinDate : 'Loading...'}
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <Globe className="w-5 h-5 text-muted-foreground" />
            <div>
              <p className="text-sm text-muted-foreground">Last Online</p>
              <p className="font-medium">
                {isClient ? formattedLastOnline : 'Loading...'}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 