"use client";
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { PlatformTable } from '@/components/platforms/platform-table';
import { EditPlatformModal } from '@/components/platforms/edit-platform-modal';
import { usePlatforms } from '@/features/platforms/api/use-platforms';
import type { Platform } from '@/types/platform';

export default function PlatformsPage() {
  const router = useRouter();
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
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
        onEdit={(platform) => {
          setSelectedPlatform(platform);
          setShowEditModal(true);
        }}
      />
      
      <EditPlatformModal 
        open={showEditModal} 
        onOpenChange={(open) => {
          setShowEditModal(open);
          if (!open) setSelectedPlatform(null);
        }}
        platform={selectedPlatform}
      />
    </div>
  );
}
