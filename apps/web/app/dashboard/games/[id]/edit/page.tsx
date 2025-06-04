"use client";
import { useRouter, useParams } from 'next/navigation';
import { GameForm } from '@/components/games/game-form';
import { useGame } from '@/features/games/api/use-games';

export default function EditGamePage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  const { data: game } = useGame(isNaN(id) ? 0 : id);

  if (!game) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Game</h1>
      <GameForm game={game} onSuccess={() => router.push('/dashboard/games')} />
    </div>
  );
}
