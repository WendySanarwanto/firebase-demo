export interface ErrorInfo {
  code: string;
  message: string;
}

export interface Response {
  result?: string | object | any[];
  error?: ErrorInfo;
}