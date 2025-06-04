"use client";
import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GameRankTable } from '@/components/gameranks/gamerank-table';
import { useGameRanks } from '@/features/gameranks/api/use-gameranks';

export default function GameRanksPage() {
  const router = useRouter();
  const { data } = useGameRanks();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Game Ranks</h1>
        <Link href="/dashboard/gameranks/new" className="text-sm underline">
          New Game Rank
        </Link>
      </div>
      <GameRankTable
        data={data}
        onEdit={(gr) => router.push(`/dashboard/gameranks/${gr.id}/edit`)}
      />
    </div>
  );
}
