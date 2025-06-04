"use client";
import { useRouter } from 'next/navigation';
import { PlatformForm } from '@/components/platforms/platform-form';

export default function NewPlatformPage() {
  const router = useRouter();
  return (
    <div className="p-6 space-y-6">
      <h1 className="text-2xl font-bold">New Platform</h1>
      <PlatformForm onSuccess={() => router.push('/dashboard/platforms')} />
    </div>
  );
}
