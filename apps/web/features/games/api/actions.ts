import { createGameSchema, updateGameSchema } from "@repo/shared";
import type { Game, GamesResponse } from "@/types/game";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAllGames(): Promise<GamesResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/games`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store", // Always fetch fresh data
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.status}`);
    }

    const games = await response.json();
    return games;
  } catch (error) {
    console.error("Error fetching games:", error);
    throw error;
  }
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
