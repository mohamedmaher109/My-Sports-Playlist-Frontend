export interface ApiResponse<T> {
  success: boolean;
  statusCode: number;
  message: string;
  data: T; // The actual data, in this case, an array of matches
  errors: string[];
}