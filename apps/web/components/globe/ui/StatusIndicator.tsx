'use client';

import React from 'react';

interface StatusIndicatorProps {
  isMobile: boolean;
  isContextLost: boolean;
  webglError: boolean;
}

export const StatusIndicator = React.memo(({ 
  isMobile, 
  isContextLost, 
  webglError 
}: StatusIndicatorProps) => {
  return (
    <div
      className={`absolute bottom-4 
        ${isMobile
          ? 'left-1/2 transform -translate-x-1/2'
          : 'right-4 left-auto transform-none'
        } flex items-center gap-2 bg-black/80 rounded-full px-3 py-1.5 sm:px-3.5 sm:py-1.5 border border-purple-500/30 shadow-md z-30`}
      style={{ touchAction: 'pan-y', boxShadow: '0 4px 12px rgba(123, 31, 162, 0.15)' }}
    >
      <div className={`w-2 h-2 rounded-full 
        ${isContextLost
          ? 'bg-yellow-400'
          : webglError
            ? 'bg-red-400'
            : 'bg-emerald-400'
        }`} style={{
          boxShadow: isContextLost
            ? '0 0 5px #facc15'
            : webglError
              ? '0 0 5px #f87171'
              : '0 0 5px #34d399'
        }}></div>
      <span className={`text-xs font-medium 
        ${isContextLost
          ? 'text-yellow-400'
          : webglError
            ? 'text-red-400'
            : 'bg-gradient-to-r from-emerald-400 to-green-500 bg-clip-text text-transparent'
        }`}>
        {isContextLost ? 'Restoring...' : webglError ? 'Error' : 'WebGL Active'}
      </span>
    </div>
  );
});

StatusIndicator.displayName = 'StatusIndicator';
