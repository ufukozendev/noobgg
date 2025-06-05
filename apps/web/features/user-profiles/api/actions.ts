import type { UserProfile, UserProfileResponse } from "@/types/user-profile";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function getUserProfile(id: string): Promise<UserProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/user-profiles/${id}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user profile: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user profile:", error);
    throw error;
  }
}

export async function getUserProfileByUsername(username: string): Promise<UserProfile> {
  try {
    const res = await fetch(`${API_BASE_URL}/user-profiles/username/${username}`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user profile: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user profile by username:", error);
    throw error;
  }
}

export async function getAllUserProfiles(): Promise<UserProfileResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/user-profiles`, {
      method: "GET",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
    });
    if (!res.ok) {
      throw new Error(`Failed to fetch user profiles: ${res.status}`);
    }
    return res.json();
  } catch (error) {
    console.error("Error fetching user profiles:", error);
    throw error;
  }
}

 