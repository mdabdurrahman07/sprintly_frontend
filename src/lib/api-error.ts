import { FetchError } from "ofetch";

interface ErrorBody {
  message?: string;
}
export const getErrorMessage = (
  error: unknown,
  fallback = "Something went wrong. Try again.",
): string => {
  if (error instanceof FetchError) {
    const body = error.data as ErrorBody | undefined;
    return body?.message ?? fallback;
  }
  if (error instanceof Error && error.message) return error.message;
  return fallback;
};
