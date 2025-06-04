"use client";
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlatformTable } from '@/components/platforms/platform-table';
import { usePlatforms } from '@/features/platforms/api/use-platforms';

export default function PlatformsPage() {
  const router = useRouter();
  const { data } = usePlatforms();

  if (!data) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">Platforms</h1>
        <Link href="/dashboard/platforms/new" className="text-sm underline">
          New Platform
        </Link>
      </div>
      <PlatformTable
        data={data}
        onEdit={(p) => router.push(`/dashboard/platforms/${p.id}/edit`)}
      />
    </div>
  );
}
