import { createPlatformSchema, updatePlatformSchema } from "@repo/shared";
import type { Platform, PlatformsResponse } from "@/types/platform";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAllPlatforms(): Promise<PlatformsResponse> {
  const res = await fetch(`${API_BASE_URL}/platforms`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch platforms: ${res.status}`);
  return res.json();
}

export async function getPlatform(id: number): Promise<Platform> {
  const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
  });
  if (!res.ok) throw new Error(`Failed to fetch platform: ${res.status}`);
  return res.json();
}

export async function createPlatform(data: unknown): Promise<Platform> {
  const parsed = createPlatformSchema.parse(data);
  const res = await fetch(`${API_BASE_URL}/platforms`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });
  if (!res.ok) throw new Error(`Failed to create platform: ${res.status}`);
  return res.json();
}

export async function updatePlatform(
  id: number,
  data: unknown,
): Promise<Platform> {
  const parsed = updatePlatformSchema.parse(data);
  const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(parsed),
  });
  if (!res.ok) throw new Error(`Failed to update platform: ${res.status}`);
  return res.json();
}

export async function deletePlatform(id: number): Promise<void> {
  const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error(`Failed to delete platform: ${res.status}`);
}
