"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { GameTable } from '@/components/games/game-table';
import { useGames } from '@/features/games/api/use-games';

export default function GamesPage() {
  const router = useRouter();
  const { data } = useGames();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Games</h1>
        <Link href="/dashboard/games/new" className="text-sm underline">
          New Game
        </Link>
      </div>
      <GameTable data={data} onEdit={(g) => router.push(`/dashboard/games/${g.id}/edit`)} />
    </div>
  );
}
