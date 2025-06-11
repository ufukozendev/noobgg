"use client";

import { useState, useEffect } from "react";
import type { Language } from "@repo/shared";

interface UseLanguagesOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}

interface LanguagesResponse {
  data: Language[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  filters: {
    search?: string;
    sortBy: string;
    sortOrder: string;
  };
}

export function useLanguages(options: UseLanguagesOptions = {}) {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchLanguages = async () => {
    try {
      setLoading(true);
      const params = new URLSearchParams();
      if (options.page) params.append("page", options.page.toString());
      if (options.limit) params.append("limit", options.limit.toString());
      if (options.search) params.append("search", options.search);
      if (options.sortBy) params.append("sortBy", options.sortBy);
      if (options.sortOrder) params.append("sortOrder", options.sortOrder);

      const base = process.env.NEXT_PUBLIC_API_URL ?? "";
      const res = await fetch(`${base}/api/v1/languages?${params.toString()}`);
      if (!res.ok) throw new Error("Failed to fetch languages");
      const data: LanguagesResponse = await res.json();
      setLanguages(data.data);
      setPagination(data.pagination);
      setError(null);
    } catch (e) {
      setError(e instanceof Error ? e.message : "An error occurred");
    } finally {
      setLoading(false);
    }
  };

  const createLanguage = async (payload: {
    name: string;
    code: string;
    flagUrl?: string;
  }) => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(`${base}/api/v1/languages`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to create language");
    }
    await fetchLanguages();
    return res.json();
  };

  const updateLanguage = async (
    id: string,
    payload: Partial<{ name: string; code: string; flagUrl?: string }>
  ) => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(`${base}/api/v1/languages/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to update language");
    }
    await fetchLanguages();
    return res.json();
  };

  const deleteLanguage = async (id: string) => {
    const base = process.env.NEXT_PUBLIC_API_URL ?? "";
    const res = await fetch(`${base}/api/v1/languages/${id}`, { method: "DELETE" });
    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Failed to delete language");
    }
    await fetchLanguages();
    return res.json();
  };

  useEffect(() => {
    fetchLanguages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [options.page, options.limit, options.search, options.sortBy, options.sortOrder]);

  return {
    languages,
    pagination,
    loading,
    error,
    refetch: fetchLanguages,
    createLanguage,
    updateLanguage,
    deleteLanguage,
  };
}

export function useAllLanguages() {
  const [languages, setLanguages] = useState<Language[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchAll = async () => {
      try {
        setLoading(true);
        const base = process.env.NEXT_PUBLIC_API_URL ?? "";
        const res = await fetch(`${base}/api/v1/languages/all`);
        if (!res.ok) throw new Error("Failed to fetch languages");
        const data = await res.json();
        setLanguages(data.data);
        setError(null);
      } catch (e) {
        setError(e instanceof Error ? e.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    };
    fetchAll();
  }, []);

  return { languages, loading, error };
} 