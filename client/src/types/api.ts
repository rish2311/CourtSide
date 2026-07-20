// ─── Generic API Response Shapes ─────────────────────────────────────────────

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
}

export interface PaginatedResponse<T> {
  success: boolean;
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}

// ─── Error Shape ──────────────────────────────────────────────────────────────

export interface ApiError {
  success: false;
  message: string;
  errors?: Record<string, string[]>; // field-level validation errors
  statusCode?: number;
}

// ─── Query Params ─────────────────────────────────────────────────────────────

export interface PaginationParams {
  page?: number;
  limit?: number;
}

export interface SortParams {
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
}

export type ListParams = PaginationParams & SortParams;
