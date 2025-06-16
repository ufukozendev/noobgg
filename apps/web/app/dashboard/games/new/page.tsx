"use client";
import { useRouter } from 'next/navigation';
import { ArrowLeft, Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { GameForm } from '@/components/games/game-form';

export default function NewGamePage() {
  const router = useRouter();
  
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
          <Plus className="h-6 w-6 text-primary" />
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Create New Game</h1>
            <p className="text-muted-foreground">
              Add a new game to your library
            </p>
          </div>
        </div>
      </div>

      <GameForm 
        onSuccess={() => router.push('/dashboard/games')} 
        onCancel={() => router.back()}
      />
    </div>
  );
}
