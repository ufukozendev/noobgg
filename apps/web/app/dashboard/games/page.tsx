import { Suspense } from "react";
import { getAllGames } from "@/features/games/api/actions";
import { GameCard } from "@/components/games/game-card";
import type { Game } from "@/types/game";

// Loading component for the games grid
function GamesGridSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
      {Array.from({ length: 10 }).map((_, i) => (
        <div
          key={i}
          className="h-48 rounded-lg bg-muted/50 animate-pulse border border-border/50"
        />
      ))}
    </div>
  );
}

// Games grid component
async function GamesGrid() {
  try {
    const games = await getAllGames();

    if (!games || games.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="h-16 w-16 rounded-full bg-muted/50 flex items-center justify-center mb-4">
            <span className="text-2xl">🎮</span>
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">
            No games found yet
          </h3>
          <p className="text-muted-foreground max-w-md">
            The game list appears to be empty right now. New games will appear here when they are added.
          </p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {games.map((game: Game) => (
          <GameCard
            key={game.id}
            game={game}
            onClick={() => {
              // TODO: Navigate to game detail page
              console.log(`Clicked on game: ${game.name}`);
            }}
          />
        ))}
      </div>
    );
  } catch (error) {
    console.error("Error loading games:", error);

    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <div className="h-16 w-16 rounded-full bg-destructive/20 flex items-center justify-center mb-4">
          <span className="text-2xl text-destructive">⚠️</span>
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">
          Error loading games
        </h3>
        <p className="text-muted-foreground max-w-md">
          There was a problem loading the game list. Please refresh the page or try again later.
        </p>
      </div>
    );
  }
}

// Main page component
export default function GamesPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border/50 bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">
                Games
              </h1>
              <p className="text-muted-foreground">
                Discover all available games and find your favorites
              </p>
            </div>

            {/* Future: Add search/filter controls here */}
            <div className="hidden md:flex items-center space-x-2">
              <div className="h-8 w-8 rounded-full bg-primary/20 flex items-center justify-center">
                <span className="text-primary text-sm font-bold">🎮</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="container mx-auto px-4 py-8">
        <Suspense fallback={<GamesGridSkeleton />}>
          <GamesGrid />
        </Suspense>
      </div>
    </div>
  );
}
