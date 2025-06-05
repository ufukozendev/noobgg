"use client";
import React from 'react';
import { useRouter, useParams } from 'next/navigation';
import { GameRankForm } from '@/components/gameranks/gamerank-form';
import { useGameRank } from '@/features/gameranks/api/use-gameranks';

export default function EditGameRankPage() {
  const router = useRouter();
  const params = useParams();
  const id = Number(params?.id);
  const { data: gamerank } = useGameRank(isNaN(id) ? 0 : id);

  if (!gamerank) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Game Rank</h1>
      <GameRankForm
        gamerank={gamerank}
        onSuccess={() => router.push('/dashboard/gameranks')}
      />
    </div>
  );
}
