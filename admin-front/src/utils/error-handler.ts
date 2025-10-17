import axios, { AxiosError } from "axios";

interface ProcessedError {
  message: string;
  type: 'axios' | 'error' | 'unknown';
  code?: number;
  context?: string;
}

const errorHandler = (
  error: unknown, 
  context?: string
): ProcessedError => {
  let processedError: ProcessedError;

  if (axios.isAxiosError(error)) {
    const axiosError = error as AxiosError;
    processedError = {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      message: (axiosError.response?.data as any) || axiosError,
      type: 'axios',
      code: axiosError.response?.status,
      context
    };
  } else if (error instanceof Error) {
    processedError = {
      message: error.message,
      type: 'error',
      context
    };
  } else {
    processedError = {
      message: 'Unknown error occurred',
      type: 'unknown',
      context
    };
  }

  console.error(processedError);
  return processedError;
}

export default errorHandler;