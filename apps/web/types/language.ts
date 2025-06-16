export interface Language {
  id: string;
  name: string;
  code: string;
  flagUrl?: string | null;
  createdAt: string;
  updatedAt: string;
  deletedAt?: string | null;
}

export interface LanguagesResponse {
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

export interface UseLanguagesOptions {
  page?: number;
  limit?: number;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
}
