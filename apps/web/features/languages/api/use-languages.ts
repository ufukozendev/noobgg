import { useState, useEffect, useCallback } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import type { Language, UseLanguagesOptions } from "@/types/language";
import {
  fetchLanguages,
  fetchAllLanguages,
  fetchLanguageById,
  createLanguage,
  updateLanguage,
  deleteLanguage,
} from "./actions";

export function useLanguages(options: UseLanguagesOptions = {}) {
  return useQuery({
    queryKey: ["languages", JSON.stringify(options)],
    queryFn: () => fetchLanguages(options),
  });
}

export function useAllLanguages() {
  return useQuery({
    queryKey: ["languages", "all"],
    queryFn: () => fetchAllLanguages(),
  });
}

export function useLanguage(id: string) {
  return useQuery({
    queryKey: ["language", id],
    queryFn: () => fetchLanguageById(id),
    enabled: !!id,
  });
}

export function useCreateLanguage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: createLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      queryClient.invalidateQueries({ queryKey: ["languages", "all"] });
    },
  });
}

export function useUpdateLanguage(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: Partial<Language>) => {
      // Convert flagUrl: null to undefined to match updateLanguage's expected type
      const payload = {
        ...data,
        flagUrl: data.flagUrl === null ? undefined : data.flagUrl,
      };
      return updateLanguage(id, payload);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      queryClient.invalidateQueries({ queryKey: ["languages", "all"] });
      queryClient.invalidateQueries({ queryKey: ["language", id] });
    },
  });
}

export function useDeleteLanguage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteLanguage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["languages"] });
      queryClient.invalidateQueries({ queryKey: ["languages", "all"] });
    },
  });
}
