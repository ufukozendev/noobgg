import { createGameRankSchema, updateGameRankSchema } from "@repo/shared";
import type { GameRank, GameRanksResponse } from "@/types/gamerank";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

export async function getAllGameRanks(): Promise<GameRanksResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/game-ranks`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch game ranks: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching game ranks:", error);
    throw error;
  }
}

export async function getGameRank(id: number): Promise<GameRank> {
  try {
    const res = await fetch(`${API_BASE_URL}/game-ranks/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch game rank: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching game rank:", error);
    throw error;
  }
}

export async function createGameRank(data: unknown): Promise<GameRank> {
  try {
    const parsed = createGameRankSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/game-ranks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to create game rank: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error creating game rank:", error);
    throw error;
  }
}

export async function updateGameRank(
  id: number,
  data: unknown,
): Promise<GameRank> {
  try {
    const parsed = updateGameRankSchema.parse(data);
    const res = await fetch(`${API_BASE_URL}/game-ranks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(parsed),
    });
    if (!res.ok) {
      throw new Error(`Failed to update game rank: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error updating game rank:", error);
    throw error;
  }
}

export async function deleteGameRank(id: number): Promise<void> {
  try {
    const res = await fetch(`${API_BASE_URL}/game-ranks/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      throw new Error(`Failed to delete game rank: ${res.status}`);
    }
  } catch (error) {
    console.error("Error deleting game rank:", error);
    throw error;
  }
}
