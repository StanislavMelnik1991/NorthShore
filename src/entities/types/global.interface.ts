export interface BaseResponse<T> {
  data: T;
  hash: string;
  success: boolean;
  timestamp: number;
}

export interface ListParams {
  page?: number;
  perPage?: number;
  searchValue?: string;
  is_deleted?: boolean;
}

export interface PaginationResponse {
  count_on_page: number;
  current_page: number;
  total_count: number;
  total_pages: number;
}

export interface LogoutData {
  Authorization: string;
}

export interface BaseEntity {
  id: number;
  name: string;
  comment?: string;
}
