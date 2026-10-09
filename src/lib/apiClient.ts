import { FetchError, ofetch, type FetchOptions } from "ofetch";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

const REFRESH_PATH = "/auth/refresh-token";

/** Status your auth middleware returns for a missing or expired access token. */
const UNAUTHORIZED_STATUS = 401;

/** Endpoints where a 401 is a real answer, not an expired session. */
const NO_REFRESH_PATHS: readonly string[] = [
  "/auth/login",
  "/auth/register",
  "/auth/logout",
  REFRESH_PATH,
];

export class SessionExpiredError extends Error {
  constructor() {
    super("Session expired");
    this.name = "SessionExpiredError";
  }
}

const rawClient = ofetch.create({
  baseURL: BASE_URL,
  credentials: "include",
});

let refreshPromise: Promise<void> | null = null;

/** Any 4xx from the refresh endpoint means the refresh token is unusable. */
function isRefreshRejected(error: unknown): boolean {
  return (
    error instanceof FetchError &&
    error.statusCode !== undefined &&
    error.statusCode >= 400 &&
    error.statusCode < 500
  );
}

/** Single-flight: concurrent callers await the same refresh request. */
function refreshSession(): Promise<void> {
  if (!refreshPromise) {
    refreshPromise = rawClient(REFRESH_PATH, { method: "POST" })
      .then(() => undefined)
      .catch((error: unknown) => {
        // Network errors and 5xx are not proof the session is dead,
        // so they propagate unchanged and the user stays logged in.
        throw isRefreshRejected(error) ? new SessionExpiredError() : error;
      })
      .finally(() => {
        refreshPromise = null;
      });
  }
  return refreshPromise;
}

function shouldRefresh(error: unknown, request: string): boolean {
  return (
    error instanceof FetchError &&
    error.statusCode === UNAUTHORIZED_STATUS &&
    !NO_REFRESH_PATHS.some((path) => request.startsWith(path))
  );
}

/**
 * Drop-in replacement for the ofetch instance.
 * The default generic is `any` to match ofetch, so existing call sites
 * keep compiling; pass an explicit type argument to tighten it.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function apiClient<T = any>(
  request: string,
  options?: FetchOptions<"json">,
): Promise<T> {
  try {
    return await rawClient<T>(request, options);
  } catch (error) {
    if (!shouldRefresh(error, request)) {
      throw error;
    }

    await refreshSession();

    // Retried exactly once; a second 401 propagates to the caller.
    return rawClient<T>(request, options);
  }
}

export default apiClient;