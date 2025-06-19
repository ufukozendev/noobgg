'use client';

import React, { useState, useEffect } from 'react';
import { CommunityActivity, ACTIVITY_TYPES } from '../types/activity';
import { generateMockActivities } from '../data/mockActivities';

interface ActivityPanelProps {
  isOpen: boolean;
  onToggle: () => void;
  onActivityHover: (city: string | null) => void;
  onActivityClick: (city: string) => void;
  highlightedCity: string | null;
}

export const ActivityPanel: React.FC<ActivityPanelProps> = ({
  isOpen,
  onToggle,
  onActivityHover,
  onActivityClick,
  highlightedCity
}) => {  const [activities, setActivities] = useState<CommunityActivity[]>([]);

  // Generate and update activities
  useEffect(() => {
    setActivities(generateMockActivities());
    
    const interval = setInterval(() => {
      setActivities(generateMockActivities());
    }, 8000); // Update every 8 seconds
    
    return () => clearInterval(interval);
  }, []);

  const formatTimeAgo = (timestamp: Date) => {
    const minutesAgo = Math.floor((Date.now() - timestamp.getTime()) / (1000 * 60));
    if (minutesAgo < 1) return 'Just now';
    if (minutesAgo === 1) return '1 min ago';
    return `${minutesAgo} min ago`;
  };
  return (
    <>      {/* Simple Activity Button */}
      <button
        onClick={onToggle}
        className={`group fixed top-6 z-50 transition-all duration-300 ${
          isOpen ? 'right-[320px]' : 'right-6'
        } bg-black text-white rounded-xl px-4 py-3 flex items-center gap-3 border border-gray-700/50 hover:border-gray-600/70`}
      >{/* Simple Icon */}
        <div className="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center">
          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
            <path d="M19 3h-1V1h-2v2H8V1H6v2H5c-1.11 0-1.99.9-1.99 2L3 19c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H5V8h14v11zM7 10h5v5H7z"/>
          </svg>
        </div>
          {/* Text Content */}
        <div className="text-left">
          <div className="text-sm font-medium text-white">Recent Activity</div>
          <div className="flex items-center gap-1 text-xs text-gray-400">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            {activities.length} events live
          </div>
        </div>
        
        {/* Arrow */}
        <div className={`transform transition-transform duration-300 text-gray-400 ${isOpen ? 'rotate-180' : ''}`}>
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.41 8.59L12 13.17L16.59 8.59L18 10L12 16L6 10L7.41 8.59Z"/>
          </svg>
        </div>
      </button>      {/* Gaming Stats Overlay Panel */}
      <div className={`fixed top-0 h-full w-80 bg-black/80 backdrop-blur-2xl transform transition-all duration-500 z-40 ${
        isOpen ? 'right-0 translate-x-0 border-l border-cyan-400/30 shadow-2xl shadow-cyan-500/20 visible' : 'right-[-400px] invisible'
      }`}>        {/* Compact Activity Header */}
        <div className="p-4 border-b border-gray-800/50">          {/* Compact Title */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <h2 className="text-lg font-semibold text-white">
                  Live Activity
                </h2>
                <div className="w-4 h-4 bg-purple-500 rounded flex items-center justify-center">
                  <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9l-6.91.74L12 16l-3.09-6.26L2 9l6.91-.74L12 2z"/>
                  </svg>
                </div>
              </div>
              <p className="text-xs text-gray-400">Real-time community events</p>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-xs text-green-400 font-medium">Live</span>
            </div>
          </div>
          
          {/* Compact Stats Cards */}
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-3 border border-gray-700/30">
              <div className="text-xl font-bold text-white mb-0.5">
                {activities.length}
              </div>
              <div className="text-xs text-gray-400 font-medium">
                Events
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-3 border border-gray-700/30">
              <div className="text-xl font-bold text-white mb-0.5">
                {activities.reduce((sum, a) => sum + a.playerCount, 0)}
              </div>
              <div className="text-xs text-gray-400 font-medium">
                Players
              </div>
            </div>
            <div className="bg-gradient-to-br from-gray-900/80 to-gray-800/60 rounded-lg p-3 border border-gray-700/30">
              <div className="text-xl font-bold text-white mb-0.5">
                {activities.filter(a => a.status === 'active').length}
              </div>
              <div className="text-xs text-gray-400 font-medium">
                Active
              </div>
            </div>
          </div>
        </div>{/* Gaming Activity Feed */}
        <div className="flex-1 overflow-y-auto max-h-[calc(100vh-160px)] custom-scrollbar">
          {activities.length === 0 ? (
            <div className="p-6 text-center">
              <div className="w-12 h-12 bg-gray-800/60 border border-gray-600/40 rounded-lg flex items-center justify-center mx-auto mb-3">
                <svg className="w-6 h-6 text-gray-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                </svg>
              </div>
              <p className="text-gray-400 text-sm">No active events</p>
            </div>
          ) : (
            <div className="p-3 space-y-2">
              {activities.map((activity) => {
                const config = ACTIVITY_TYPES[activity.type];
                const isHighlighted = highlightedCity === activity.city;
                
                return (
                  <div
                    key={activity.id}
                    className={`relative p-3 rounded-lg border transition-all duration-200 cursor-pointer group ${
                      isHighlighted
                        ? 'bg-cyan-500/20 border-cyan-400/60 shadow-lg shadow-cyan-500/20'
                        : 'bg-black/40 border-gray-600/30 hover:border-cyan-400/40 hover:bg-gray-800/40'
                    }`}
                    onMouseEnter={() => onActivityHover(activity.city)}
                    onMouseLeave={() => onActivityHover(null)}
                    onClick={() => onActivityClick(activity.city)}
                  >
                    {/* Gaming HUD Style Header */}
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-6 h-6 rounded flex items-center justify-center text-xs`}
                           style={{ 
                             background: `linear-gradient(135deg, ${config.color}, ${config.highlightColor})` 
                           }}>
                        <span className="text-white">{config.icon}</span>
                      </div>
                      
                      <div className="flex-1 min-w-0">
                        <h3 className="text-white font-medium text-sm truncate leading-tight">
                          {activity.title}
                        </h3>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-cyan-400 font-mono">
                          {activity.playerCount}P
                        </span>
                        <div className={`w-2 h-2 rounded-full ${
                          activity.status === 'active' ? 'bg-green-400 animate-pulse' : 
                          activity.status === 'waiting' ? 'bg-yellow-400' : 'bg-gray-400'
                        }`} />
                      </div>
                    </div>

                    {/* Location Bar */}
                    <div className="flex items-center justify-between text-xs mb-2">
                      <span className="text-gray-300 font-mono tracking-wide">
                        {activity.city}
                      </span>
                      <span className="text-gray-500">
                        {formatTimeAgo(activity.timestamp)}
                      </span>
                    </div>
                      {/* Game Type Badge */}
                    {activity.gameType && (
                      <div className="inline-block bg-gray-700/60 border border-gray-600/40 px-2 py-1 rounded text-xs text-gray-300 mb-2">
                        {activity.gameType}
                      </div>
                    )}
                    
                    {/* Players Section for LFG and other activities */}
                    {activity.players && activity.players.length > 0 && (
                      <div className="mt-2 pt-2 border-t border-gray-700/30">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-xs text-gray-400 font-medium">
                            {activity.type === 'lfg' ? 'Looking for Players' : 'Current Players'}
                          </span>
                          {activity.maxPlayers && activity.type === 'lfg' && (
                            <span className="text-xs text-cyan-400 font-mono">
                              {activity.players.length}/{activity.maxPlayers}
                            </span>
                          )}
                        </div>
                        
                        {/* Player Avatars and Names */}
                        <div className="flex items-center gap-2 flex-wrap">
                          {activity.players.slice(0, 4).map((player) => (
                            <div key={player.id} className="flex items-center gap-1.5 bg-gray-800/40 rounded-lg px-2 py-1 border border-gray-700/20">
                              <img 
                                src={player.avatar} 
                                alt={player.username}
                                className="w-4 h-4 rounded-full bg-gray-600"
                                onError={(e) => {
                                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${player.username}&background=6b7280&color=fff&size=16`;
                                }}
                              />
                              <span className="text-xs text-gray-300 font-medium truncate max-w-[60px]">
                                {player.username}
                              </span>
                              {player.level && (
                                <span className="text-xs text-gray-500 font-mono">
                                  {player.level}
                                </span>
                              )}
                            </div>
                          ))}
                          
                          {/* Show more indicator if there are more players */}
                          {activity.players.length > 4 && (
                            <div className="flex items-center justify-center w-6 h-6 bg-gray-700/40 rounded-full border border-gray-600/30">
                              <span className="text-xs text-gray-400 font-mono">
                                +{activity.players.length - 4}
                              </span>
                            </div>
                          )}
                          
                          {/* Join button for LFG */}
                          {activity.type === 'lfg' && activity.status === 'waiting' && activity.maxPlayers && activity.players.length < activity.maxPlayers && (
                            <button className="flex items-center gap-1 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-400/40 rounded-lg px-2 py-1 transition-colors">
                              <svg className="w-3 h-3 text-cyan-400" fill="currentColor" viewBox="0 0 24 24">
                                <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z"/>
                              </svg>
                              <span className="text-xs text-cyan-400 font-medium">Join</span>
                            </button>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          )}        </div>
      </div>
      <style jsx>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(17, 24, 39, 0.5);
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: linear-gradient(to bottom, rgb(147, 51, 234), rgb(79, 70, 229));
          border-radius: 2px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: linear-gradient(to bottom, rgb(168, 85, 247), rgb(99, 102, 241));
        }
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </>
  );
};
