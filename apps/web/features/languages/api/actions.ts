import { createLanguageDto, updateLanguageDto } from "@repo/shared";
import type {
  Language,
  LanguagesResponse,
  UseLanguagesOptions,
} from "@/types/language";
import { getCurrentLanguage } from "@/lib/utils";
const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api/v1";

export async function fetchLanguages(
  options: UseLanguagesOptions = {}
): Promise<LanguagesResponse> {
  const params = new URLSearchParams();
  if (options.page) params.append("page", options.page.toString());
  if (options.limit) params.append("limit", options.limit.toString());
  if (options.search) params.append("search", options.search);
  if (options.sortBy) params.append("sortBy", options.sortBy);
  if (options.sortOrder) params.append("sortOrder", options.sortOrder);
  const res = await fetch(`${API_BASE_URL}/languages?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to fetch languages");
  return res.json();
}

export async function fetchAllLanguages(): Promise<Language[]> {
  const res = await fetch(`${API_BASE_URL}/languages/all`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Preferred-Language": getCurrentLanguage(),
      "Accept-Language": getCurrentLanguage(),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch languages");
  const data = await res.json();
  return data.data;
}

export async function fetchLanguageById(id: string): Promise<Language> {
  const res = await fetch(`${API_BASE_URL}/languages/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      "X-Preferred-Language": getCurrentLanguage(),
      "Accept-Language": getCurrentLanguage(),
    },
    cache: "no-store",
  });
  if (!res.ok) throw new Error("Failed to fetch language");
  const data = await res.json();
  return data.data;
}

export async function createLanguage(payload: {
  name: string;
  code: string;
  flagUrl?: string;
}): Promise<Language> {
  const parsedPayload = createLanguageDto.parse(payload);
  const res = await fetch(`${API_BASE_URL}/languages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Preferred-Language": getCurrentLanguage(),
      "Accept-Language": getCurrentLanguage(),
    },
    body: JSON.stringify(parsedPayload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to create language");
  }
  const data = await res.json();
  return data.data;
}

export async function updateLanguage(
  id: string,
  payload: Partial<{ name: string; code: string; flagUrl?: string }>
): Promise<Language> {
  const parsedPayload = updateLanguageDto.parse(payload);
  const res = await fetch(`${API_BASE_URL}/languages/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-Preferred-Language": getCurrentLanguage(),
      "Accept-Language": getCurrentLanguage(),
    },
    cache: "no-store",
    body: JSON.stringify(parsedPayload),
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to update language");
  }
  const data = await res.json();
  return data.data;
}

export async function deleteLanguage(id: string): Promise<{ message: string }> {
  const res = await fetch(`${API_BASE_URL}/languages/${id}`, {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      "X-Preferred-Language": getCurrentLanguage(),
      "Accept-Language": getCurrentLanguage(),
    },
    cache: "no-store",
  });
  if (!res.ok) {
    const err = await res.json();
    throw new Error(err.error || "Failed to delete language");
  }
  return res.json();
}
