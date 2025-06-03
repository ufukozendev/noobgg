"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import type { Game } from "@/lib/types/game";

interface GameCardProps {
  game: Game;
  className?: string;
  onClick?: () => void;
}

function GameCard({ game, className, onClick }: GameCardProps) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-lg border border-border bg-card text-card-foreground shadow-lg transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20 hover:border-primary/50 cursor-pointer",
        "before:absolute before:inset-0 before:bg-gradient-to-br before:from-primary/5 before:to-transparent before:opacity-0 before:transition-opacity before:duration-300 hover:before:opacity-100",
        className
      )}
      onClick={onClick}
    >
      {/* Glow effect */}
      <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/20 via-accent/20 to-primary/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm" />
      
      {/* Card content */}
      <div className="relative bg-card rounded-lg p-6 h-full flex flex-col">
        {/* Game logo/image */}
        <div className="mb-4 flex items-center justify-center h-20 w-20 mx-auto rounded-lg bg-muted/50 border border-border/50 group-hover:border-primary/30 transition-colors duration-300">
          {game.logo ? (
            <img
              src={game.logo}
              alt={`${game.name} logo`}
              className="h-16 w-16 object-contain rounded-md"
              onError={(e) => {
                // Fallback to placeholder if image fails to load
                const target = e.target as HTMLImageElement;
                target.style.display = "none";
                target.nextElementSibling?.classList.remove("hidden");
              }}
            />
          ) : null}
          
          {/* Fallback placeholder */}
          <div className={cn(
            "flex items-center justify-center h-16 w-16 rounded-md bg-gradient-to-br from-primary/20 to-accent/20 text-primary font-bold text-xl",
            game.logo && "hidden"
          )}>
            {game.name.charAt(0).toUpperCase()}
          </div>
        </div>

        {/* Game name */}
        <h3 className="text-lg font-semibold text-foreground mb-2 text-center group-hover:text-primary transition-colors duration-300 line-clamp-2">
          {game.name}
        </h3>

        {/* Game description */}
        {game.description && (
          <p className="text-sm text-muted-foreground text-center line-clamp-3 flex-1">
            {game.description}
          </p>
        )}

        {/* Hover indicator */}
        <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="h-2 w-2 rounded-full bg-primary animate-pulse" />
        </div>
      </div>
    </div>
  );
}

GameCard.displayName = "GameCard";

export { GameCard };
