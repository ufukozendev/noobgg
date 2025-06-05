import { createGameSchema, updateGameSchema, type PaginatedResponse } from "@repo/shared";
import type { Game, GamesResponse } from "@/types/game";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// Pagination parameters interface
interface PaginationParams {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export async function getAllGames(params?: PaginationParams): Promise<PaginatedResponse<Game>> {
  try {
    const searchParams = new URLSearchParams();

    if (params?.page) searchParams.append('page', params.page.toString());
    if (params?.limit) searchParams.append('limit', params.limit.toString());
    if (params?.sortBy) searchParams.append('sortBy', params.sortBy);
    if (params?.sortOrder) searchParams.append('sortOrder', params.sortOrder);

    const url = `${API_BASE_URL}/games${searchParams.toString() ? `?${searchParams.toString()}` : ''}`;

    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
}

// Legacy function for backward compatibility
export async function getAllGamesLegacy(): Promise<GamesResponse> {
  const result = await getAllGames();
  return result.data;
}

export async function getGame(id: number): Promise<Game> {
  try {
    const res = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch game: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching game:", error);
    throw error;
  }
}

export async function createGame(data: unknown): Promise<Game> {
  try {
    const parsed = createGameSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/games`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to create game: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error creating game:", error);
    throw error;
  }
}

export async function updateGame(id: number, data: unknown): Promise<Game> {
  try {
    const parsed = updateGameSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to update game: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating game:", error);
    throw error;
  }
}

export async function deleteGame(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/games/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete game: ${res.status}`);
    }
  } catch (error) {
    console.error("Error deleting game:", error);
    throw error;
  }
}
