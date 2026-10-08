import {
  getAdminTotalAnalytics,
  getAllProjects,
  getAllUsersApi,
  getAuditLogs,
  updateUserStatusApi,
} from "@/api/admin.api";
import type {
  AdminAuditLogsParams,
  AdminProjectsParams,
  AdminUsersParams,
  UpdateUserStatusPayload,
} from "@/types/admin.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetAdminUsers = (params: AdminUsersParams = {}) => {
  return useQuery({
    queryKey: ["users", params],
    queryFn: () => getAllUsersApi(params),
  });
};

type UpdateUserStatusVariables = {
  id: string;
  payload: UpdateUserStatusPayload;
};
export const useUpdateUserStatus = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: UpdateUserStatusVariables) =>
      updateUserStatusApi(id, payload),
    onSuccess: () => {
      return queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

export const useGetAdminAnalytics = () => {
  return useQuery({
    queryKey: ["admin", "analytics"],
    queryFn: getAdminTotalAnalytics,
  });
};

export const useGetAdminProjects = (params: AdminProjectsParams = {}) => {
  return useQuery({
    queryKey: ["admin", "projects", params],
    queryFn: () => getAllProjects(params),
  });
};

export const useGetAuditLogs = (params: AdminAuditLogsParams = {}) => {
  return useQuery({
    queryKey: ["admin", "audit-logs", params],
    queryFn: () => getAuditLogs(params),
  });
};