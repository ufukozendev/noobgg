'use client';

import React from 'react';
import { Mouse, ZoomIn, Target } from 'lucide-react';

interface ControlsOverlayProps {
  isMobile: boolean;
}

export const ControlsOverlay = React.memo(({ isMobile }: ControlsOverlayProps) => {
  return (
    <div className="absolute bottom-16 sm:bottom-6 left-1/2 transform -translate-x-1/2 bg-black/60 backdrop-blur-xl rounded-full px-4 py-2 sm:px-6 sm:py-2.5 border border-purple-500/30 shadow-lg"
      style={{ touchAction: 'pan-y', boxShadow: '0 4px 20px rgba(123, 31, 162, 0.2)' }}>
      <p className="text-gray-200 text-xs sm:textsm text-center flex items-center justify-center gap-3 sm:gap-4">
        <span className="flex items-center gap-1.5">
          <Mouse className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-purple-300" />
          <span className="hidden sm:inline">Drag to rotate</span>
          <span className="sm:hidden">Drag</span>
        </span>
        <span className="flex items-center gap-1.5">
          <ZoomIn className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-blue-300" />
          <span className="hidden sm:inline">Scroll to zoom</span>
          <span className="sm:hidden">Zoom</span>
        </span>
        <span className="flex items-center gap-1.5">
          <Target className="w-3.5 h-3.5 sm:w-3 sm:h-3 text-green-300" />
          <span className="hidden sm:inline">Click hubs for info</span>
          <span className="sm:hidden">Click</span>
        </span>
      </p>
    </div>
  );
});

ControlsOverlay.displayName = 'ControlsOverlay';
