import apiClient from "@/lib/apiClient";
import type {
  AdminAnalytics,
  AdminAuditLogsParams,
  AdminProject,
  AdminProjectsParams,
  AdminUser,
  AdminUserBase,
  AdminUsersParams,
  AuditLog,
  UpdateUserStatusPayload,
} from "@/types/admin.types";
import { ApiResponse } from "@/types/api.types";

const prefix = "/admin";

const buildQueryString = (params: object = {}): string => {
  const search = new URLSearchParams();
  for (const [key, value] of Object.entries(params)) {
    if (value === undefined || value === null || value === "") continue;
    search.set(key, String(value));
  }
  const query = search.toString();
  return query ? `?${query}` : "";
};

export const getAllUsersApi = (params: AdminUsersParams = {}) => {
  return apiClient<ApiResponse<AdminUser[]>>(
    `${prefix}/users${buildQueryString(params)}`,
    { method: "GET" },
  );
};

export const updateUserStatusApi = (
  id: string,
  payload: UpdateUserStatusPayload,
) => {
  return apiClient<ApiResponse<AdminUserBase>>(
    `${prefix}/${encodeURIComponent(id)}/status`,
    { method: "PATCH", body: payload },
  );
};

export const getAdminTotalAnalytics = () => {
  return apiClient<ApiResponse<AdminAnalytics>>(`${prefix}/analytics`, {
    method: "GET",
  });
};

export const getAllProjects = (params: AdminProjectsParams = {}) => {
  return apiClient<ApiResponse<AdminProject[]>>(
    `${prefix}/projects${buildQueryString(params)}`,
    { method: "GET" },
  );
};

export const getAuditLogs = (params: AdminAuditLogsParams = {}) => {
  return apiClient<ApiResponse<AuditLog[]>>(
    `${prefix}/audit${buildQueryString(params)}`,
    { method: "GET" },
  );
};