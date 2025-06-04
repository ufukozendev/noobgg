import type { GamesResponse } from "@/types/game";

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
