export interface BaseResponse<T> {
  data: T;
  hash: string;
  success: boolean;
  timestamp: number;
}
