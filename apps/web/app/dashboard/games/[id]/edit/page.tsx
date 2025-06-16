"use client";
import { useRouter, useParams } from 'next/navigation';
import { ArrowLeft, Edit, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { GameForm } from '@/components/games/game-form';
import { useGame } from '@/features/games/api/use-games';

export default function EditGamePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  const { data: game, isLoading } = useGame(isNaN(id) ? 0 : id);

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Loader2 className="h-4 w-4 animate-spin" />
              <span>Loading game...</span>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!game) {
    return (
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        <Card>
          <CardContent className="flex items-center justify-center py-12">
            <div className="text-center space-y-2">
              <p className="text-muted-foreground">Game not found</p>
              <Button variant="outline" onClick={() => router.push('/dashboard/games')}>
                Back to Games
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex items-center space-x-4 mb-8">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => router.back()}
          className="pl-0"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <div className="flex items-center space-x-2">
          <Edit className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Edit Game</h1>
            <p className="text-muted-foreground">
              Update "{game.name}" details
            </p>
          </div>
        </div>
      </div>

      <GameForm 
        game={game} 
        onSuccess={() => router.push('/dashboard/games')} 
        onCancel={() => router.back()}
      />
    </div>
  );
}
