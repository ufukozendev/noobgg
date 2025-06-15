"use client";

import { useState, useEffect } from "react";

interface UseLoadingOptions {
  minLoadingTime?: number; // minimum loading time in milliseconds
  dependencies?: any[]; // dependencies to wait for
}

export function useLoading({
  minLoadingTime = 2500, // Default 2.5 seconds
  dependencies = [],
}: UseLoadingOptions = {}) {
  const [isLoading, setIsLoading] = useState(true);
  const [hasMinTimePassed, setHasMinTimePassed] = useState(false);

  useEffect(() => {
    // Set minimum loading time
    const timer = setTimeout(() => {
      setHasMinTimePassed(true);
    }, minLoadingTime);

    return () => clearTimeout(timer);
  }, [minLoadingTime]);

  useEffect(() => {
    // Check if all dependencies are ready
    const allDependenciesReady = dependencies.every(dep => 
      dep !== undefined && dep !== null && dep !== false
    );

    // Only stop loading if minimum time has passed AND all dependencies are ready
    if (hasMinTimePassed && (dependencies.length === 0 || allDependenciesReady)) {
      setIsLoading(false);
    }
  }, [hasMinTimePassed, dependencies]);

  return { isLoading };
}
