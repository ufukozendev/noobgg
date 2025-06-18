"use client";
import { useRouter, useParams } from 'next/navigation';
import { PlatformForm } from '@/components/platforms/platform-form';
import { usePlatform } from '@/features/platforms/api/use-platforms';

export default function EditPlatformPage() {
  const router = useRouter();
  const params = useParams();
  const id = params?.id as string;
  const { data: platform } = usePlatform(id || "");

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
