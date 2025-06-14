import React from 'react';
import { cn } from '@/lib/utils';

interface RankIconProps {
  rank: string;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function RankIcon({ rank, className, size = 'md' }: RankIconProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-6 h-6',
    lg: 'w-8 h-8'
  };

  // Create unique gradient IDs to avoid conflicts
  const gradientId = `${rank}-gradient-${Math.random().toString(36).substr(2, 9)}`;

  const getRankIcon = () => {
    switch (rank) {
      case 'iron':        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#6b7280" />
                <stop offset="100%" stopColor="#4b5563" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2L3 7v10l9 5 9-5V7l-9-5z" 
              fill={`url(#${gradientId})`} 
              stroke="#374151" 
              strokeWidth="1"
            />
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">I</text>
          </svg>
        );
        case 'bronze':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#ea580c" />
              </linearGradient>
            </defs>
            <circle cx="12" cy="12" r="10" fill={`url(#${gradientId})`} stroke="#dc2626" strokeWidth="1"/>
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">B</text>
          </svg>
        );
      
      case 'silver':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d1d5db" />
                <stop offset="100%" stopColor="#9ca3af" />
              </linearGradient>
            </defs>
            <polygon 
              points="12,2 18,8 18,16 12,22 6,16 6,8" 
              fill={`url(#${gradientId})`} 
              stroke="#6b7280" 
              strokeWidth="1"
            />
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">S</text>
          </svg>
        );
      
      case 'gold':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#fbbf24" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <rect x="4" y="4" width="16" height="16" rx="3" fill={`url(#${gradientId})`} stroke="#d97706" strokeWidth="1"/>
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">G</text>
          </svg>
        );
      
      case 'platinum':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#0891b2" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2l8 6v8l-8 6-8-6V8l8-6z" 
              fill={`url(#${gradientId})`} 
              stroke="#0e7490" 
              strokeWidth="1"
            />
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">P</text>
          </svg>
        );
      
      case 'diamond':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#3b82f6" />
                <stop offset="100%" stopColor="#1d4ed8" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2L6 8h12l-6-6zM6 8v4l6 10 6-10V8H6z" 
              fill={`url(#${gradientId})`} 
              stroke="#1e40af" 
              strokeWidth="1"
            />
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">D</text>
          </svg>
        );
      
      case 'ascendant':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#10b981" />
                <stop offset="100%" stopColor="#059669" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2L2 12h8v8h4v-8h8L12 2z" 
              fill={`url(#${gradientId})`} 
              stroke="#047857" 
              strokeWidth="1"
            />
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">A</text>
          </svg>
        );
      
      case 'immortal':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#ef4444" />
                <stop offset="100%" stopColor="#dc2626" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2C8 2 4 6 4 10c0 8 8 12 8 12s8-4 8-12c0-4-4-8-8-8z" 
              fill={`url(#${gradientId})`} 
              stroke="#b91c1c" 
              strokeWidth="1"
            />
            <text x="12" y="14" textAnchor="middle" className="fill-white text-[6px] font-bold">IM</text>
          </svg>
        );
      
      case 'radiant':
        return (
          <svg viewBox="0 0 24 24" className={cn(sizeClasses[size], className)}>
            <defs>
              <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f59e0b" />
                <stop offset="25%" stopColor="#ec4899" />
                <stop offset="50%" stopColor="#8b5cf6" />
                <stop offset="75%" stopColor="#06b6d4" />
                <stop offset="100%" stopColor="#10b981" />
              </linearGradient>
            </defs>
            <path 
              d="M12 2l3 6 6 1-4 4 1 6-6-3-6 3 1-6-4-4 6-1 3-6z" 
              fill={`url(#${gradientId})`} 
              stroke="#7c3aed" 
              strokeWidth="1"
            />
            <text x="12" y="16" textAnchor="middle" className="fill-white text-[8px] font-bold">R</text>
          </svg>
        );
      
      default:
        return (
          <div className={cn(
            sizeClasses[size], 
            "bg-gray-500 rounded-full flex items-center justify-center text-white text-xs font-bold",
            className
          )}>
            ?
          </div>
        );
    }
  };

  return getRankIcon();
}
