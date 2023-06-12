import { ApiResponseStatus } from '../enums';

export interface ApiResponse {
  data: [];
  status: ApiResponseStatus;
  error?: unknown;
}
