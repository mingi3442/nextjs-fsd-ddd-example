export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
  message?: string;
  ok: boolean;
}
