import { createPlatformSchema, updatePlatformSchema, type PaginatedResponse } from "@repo/shared";
import type { Platform, PlatformsResponse } from "@/types/platform";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Pagination parameters interface
interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getAllPlatforms(params?: PaginationParams): Promise<PaginatedResponse<Platform>> {
  try {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const url = `${API_BASE_URL}/platforms${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    const res = await fetch(url, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch platforms: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw error;
  }
}

// Legacy function for backward compatibility
export async function getAllPlatformsLegacy(): Promise<PlatformsResponse> {
  const result = await getAllPlatforms();
  return result.data;
}

export async function getPlatform(id: number): Promise<Platform> {
  try {
    const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch platform: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching platform:", error);
    throw error;
  }
}

export async function createPlatform(data: unknown): Promise<Platform> {
  try {
    const parsed = createPlatformSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/platforms`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to create platform: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error creating platform:", error);
    throw error;
  }
}

export async function updatePlatform(
  id: number,
  data: unknown,
): Promise<Platform> {
  try {
    const parsed = updatePlatformSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to update platform: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating platform:", error);
    throw error;
  }
}

export async function deletePlatform(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete platform: ${res.status}`);
    }
  } catch (error) {
    console.error("Error deleting platform:", error);
    throw error;
  }
}
