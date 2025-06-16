"use client";
import { useRouter } from 'next/navigation';
import { Loader2, GameController2 } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { GameTable } from '@/components/games/game-table';
import { useGames } from '@/features/games/api/use-games';

export default function GamesPage() {
  const router = useRouter();
  const { data, isLoading } = useGames();

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading games...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      <div className="flex items-center space-x-2">
        <GameController2 className="h-8 w-8 text-primary" />
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Games Management</h1>
          <p className="text-muted-foreground">
            Manage your game library and configurations
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>All Games</CardTitle>
        </CardHeader>
        <CardContent>
          <GameTable 
            data={data || []} 
            onEdit={(game) => router.push(`/dashboard/games/${game.id}/edit`)}
            onNew={() => router.push('/dashboard/games/new')}
          />
        </CardContent>
      </Card>
    </div>
  );
}
