import { createPlatformSchema, updatePlatformSchema } from "@repo/shared";
import type { Platform, PlatformsResponse } from "@/types/platform";
import { getCurrentLanguage } from "@/lib/utils";
import { handleApiResponse } from "@/utils/api-response-handler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function getAllPlatforms(): Promise<PlatformsResponse> {
  const language = getCurrentLanguage();
  try {
    const res = await fetch(`${API_BASE_URL}/platforms`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch platforms: ${res.status}`);
    }
    return handleApiResponse(await res.json());
  } catch (error) {
    console.error("Error fetching platforms:", error);
    throw error;
  }
}

export async function getPlatform(id: string): Promise<Platform> {
  const language = getCurrentLanguage();

  try {
    const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch platform: ${res.status}`);
    }
    return handleApiResponse(await res.json());
  } catch (error) {
    console.error("Error fetching platform:", error);
    throw error;
  }
}

export async function createPlatform(data: unknown): Promise<Platform> {
  const language = getCurrentLanguage();

  try {
    const parsed = createPlatformSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/platforms`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to create platform: ${res.status}`);
    }
    const response = handleApiResponse(await res.json());
    return response;
  } catch (error) {
    console.error("Error creating platform:", error);
    throw error;
  }
}

export async function updatePlatform(
  id: string,
  data: unknown
): Promise<Platform> {
  const language = getCurrentLanguage();

  try {
    const parsed = updatePlatformSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to update platform: ${res.status}`);
    }
    const response = handleApiResponse(await res.json());
    return response;
  } catch (error) {
    console.error("Error updating platform:", error);
    throw error;
  }
}

export async function deletePlatform(id: string): Promise<void> {
  const language = getCurrentLanguage();

  try {
    const res = await fetch(`${API_BASE_URL}/platforms/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete platform: ${res.status}`);
    }
    const data = handleApiResponse(await res.json());
    return data;
  } catch (error) {
    console.error("Error deleting platform:", error);
    throw error;
  }
}
