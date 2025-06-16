"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GameRankTable } from '@/components/gameranks/gamerank-table';
import { EditGameRankModal } from '@/components/gameranks/edit-gamerank-modal';
import { useGameRanks } from '@/features/gameranks/api/use-gameranks';
import type { GameRank } from '@/types/gamerank';

export default function GameRanksPage() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedGameRank, setSelectedGameRank] = useState<GameRank | null>(null);
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
        onEdit={(gamerank) => {
          setSelectedGameRank(gamerank);
          setShowEditModal(true);
        }}
      />
      
      <EditGameRankModal 
        open={showEditModal} 
        onOpenChange={(open) => {
          setShowEditModal(open);
          if (!open) setSelectedGameRank(null);
        }}
        gamerank={selectedGameRank}
      />
    </div>
  );
}
