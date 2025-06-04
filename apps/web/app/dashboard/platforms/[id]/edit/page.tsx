"use client";
import { useRouter, useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { PlatformForm } from '@/components/platforms/platform-form';
import { getPlatform } from '@/features/platforms/api/actions';
import type { Platform } from '@/types/platform';

export default function EditPlatformPage() {
  const router = useRouter();
  const params = useParams();
  const [platform, setPlatform] = useState<Platform | null>(null);

  useEffect(() => {
    const id = Number(params?.id);
    if (!isNaN(id)) {
      getPlatform(id).then(setPlatform);
    }
  }, [params]);

  if (!platform) return <div>Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">Edit Platform</h1>
      <PlatformForm
        platform={platform}
        onSuccess={() => router.push('/dashboard/platforms')}
      />
    </div>
  );
}
