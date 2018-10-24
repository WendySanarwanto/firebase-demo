export interface ErrorResponse {
  code: string;
  message: string;
}

export interface Response {
  result: string | any;
  error?: ErrorResponse;
}