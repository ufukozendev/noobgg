'use client';

import React from 'react';

interface LoadingOverlayProps {
  isLoading: boolean;
  message: string;
  description: string;
}

export const LoadingOverlay = React.memo(({ isLoading, message, description }: LoadingOverlayProps) => {
  if (!isLoading) return null;

  return (
    <div className="absolute inset-0 bg-black/60 backdrop-blur-sm z-40 flex items-center justify-center">
      <div className="text-center">
        <div className="text-blue-400 text-lg mb-4">{message}</div>
        <p className="text-white text-sm mb-2 sm:mb-3">{description}</p>
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
});

LoadingOverlay.displayName = 'LoadingOverlay';
