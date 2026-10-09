"use client";


import { SessionExpiredError } from "@/lib/apiClient";
import {
  environmentManager,
  MutationCache,
  QueryCache,
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ReactNode } from "react";

const LOGIN_PATH = "/login";

/**
 * Routes protected by AuthGuard/RoleGuard. A session-expired error on a
 * public page (for example a navbar calling useGetMe while logged out)
 * must not redirect.
 */
const PROTECTED_PATH_PREFIXES: readonly string[] = ["/admin", "manager", "member"];

/** Several in-flight queries can fail together; redirect only once. */
let isRedirectingToLogin = false;

function redirectToLogin(): void {
  if (isRedirectingToLogin || typeof window === "undefined") {
    return;
  }

  const { pathname } = window.location;
  const isProtected = PROTECTED_PATH_PREFIXES.some((prefix) =>
    pathname.startsWith(prefix),
  );
  if (!isProtected) {
    return;
  }

  isRedirectingToLogin = true;
  // A full navigation also discards the in-memory query cache.
  window.location.replace(LOGIN_PATH);
}

function handleError(error: unknown): void {
  if (error instanceof SessionExpiredError) {
    redirectToLogin();
  }
}

function makeQueryClient(): QueryClient {
  return new QueryClient({
    queryCache: new QueryCache({ onError: handleError }),
    mutationCache: new MutationCache({ onError: handleError }),
    defaultOptions: {
      queries: {
        staleTime: 60 * 1000, // 1 minute
        retry: (failureCount, error) =>
          !(error instanceof SessionExpiredError) && failureCount < 2,
      },
    },
  });
}

let browserQueryClient: QueryClient | undefined = undefined;

function getQueryClient(): QueryClient {
  if (environmentManager.isServer()) {
    return makeQueryClient();
  }
  if (!browserQueryClient) {
    browserQueryClient = makeQueryClient();
  }
  return browserQueryClient;
}

const QueryProvider = ({ children }: { children: ReactNode }) => {
  const queryClient = getQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default QueryProvider;