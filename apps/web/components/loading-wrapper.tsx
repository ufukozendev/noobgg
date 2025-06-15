"use client";

import React, { ReactNode } from "react";
import { AnimatePresence } from "framer-motion";
import Simple3DLoading from "./loading/simple-3d-loading";
import { useLoading } from "@/hooks/use-loading";

interface LoadingWrapperProps {
  children: ReactNode;
  loadingTime?: number;
  dependencies?: any[];
}

export default function LoadingWrapper({ 
  children, 
  loadingTime = 2500,
  dependencies = [] 
}: LoadingWrapperProps) {
  const { isLoading } = useLoading({ 
    minLoadingTime: loadingTime, 
    dependencies 
  });

  return (
    <>      <AnimatePresence mode="wait">
        {isLoading && (
          <Simple3DLoading key="loading" />
        )}
      </AnimatePresence>
      
      {!isLoading && (
        <div
          style={{
            opacity: isLoading ? 0 : 1,
            transition: "opacity 0.5s ease-in-out",
          }}
        >
          {children}
        </div>
      )}
    </>
  );
}
