"use client";

import { useState, useEffect } from "react";

interface UsePageLoadingOptions {
  loadingTime?: number;
  autoStart?: boolean;
}

export function usePageLoading({
  loadingTime = 2000,
  autoStart = true,
}: UsePageLoadingOptions = {}) {
  const [isLoading, setIsLoading] = useState(autoStart);

  const startLoading = () => setIsLoading(true);
  const stopLoading = () => setIsLoading(false);

  useEffect(() => {
    if (!autoStart) return;

    const timer = setTimeout(() => {
      setIsLoading(false);
    }, loadingTime);

    return () => clearTimeout(timer);
  }, [loadingTime, autoStart]);

  return {
    isLoading,
    startLoading,
    stopLoading,
  };
}
