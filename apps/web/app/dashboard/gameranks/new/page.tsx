"use client";
import React from 'react';
import { useRouter } from 'next/navigation';
import { GameRankForm } from '@/components/gameranks/gamerank-form';

export default function NewGameRankPage() {
  const router = useRouter();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">New Game Rank</h1>
      <GameRankForm onSuccess={() => router.push('/dashboard/gameranks')} />
    </div>
  );
}
