import { createGameSchema, updateGameSchema } from "@repo/shared";
import type { Game, GamesResponse } from "@/types/game";
import { getCurrentLanguage } from "@/lib/utils";
import { handleApiResponse } from "@/utils/api-response-handler";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function getAllGames(): Promise<GamesResponse> {
  const language = getCurrentLanguage();

  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const data = handleApiResponse(await response.json());
    return data;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

export async function getGame(id: string): Promise<Game> {
  const language = getCurrentLanguage();
  try {
    const res = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch game: ${res.status}`);
    }
    return handleApiResponse(await res.json());
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
}

export async function createGame(data: unknown): Promise<Game> {
  const language = getCurrentLanguage();
  try {
    const parsed = createGameSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/games`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to create game: ${res.status}`);
    }
    const response = handleApiResponse(await res.json());
    return response.data;
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

export async function updateGame(id: string, data: unknown): Promise<Game> {
  const language = getCurrentLanguage();
  try {
    const parsed = updateGameSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to update game: ${res.status}`);
    }
    const response = handleApiResponse(await res.json());
    return response.data;
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
}

export async function deleteGame(id: string): Promise<void> {
  const language = getCurrentLanguage();
  try {
    const res = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "X-Preferred-Language": language,
        "Accept-Language": language,
      },
    });
    if (!res.ok) {
      throw new Error(`Failed to delete game: ${res.status}`);
    }
    const data = handleApiResponse(await res.json());
    return data;
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
}
