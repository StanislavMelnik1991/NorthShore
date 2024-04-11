export interface BaseResponse<T> {
  data: T;
  hash: string;
  success: boolean;
  timestamp: number;
}

export interface ListParams<Sort, Filter> {
  page?: number;
  perPage?: number;
  searchValue?: string;
  sort: Sort;
  filter: Filter;
}
