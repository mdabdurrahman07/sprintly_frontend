import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";
import type {
  AssignTaskPayload,
  CreateCommentPayload,
  Task,
  TaskComment,
  UpdateTaskPayload,
} from "@/types/task.types";

const prefix = "/task";

export const getMyAssignedTaskApi = () => {
  return apiClient<ApiResponse<Task[]>>(`${prefix}/myAssigned`, { method: "GET" });
};

export const getTaskDetailsApi = (id: string) => {
  return apiClient<ApiResponse<Task>>(`${prefix}/${id}`, { method: "GET" });
};

export const updateTaskApi = (id: string, payload: UpdateTaskPayload) => {
  return apiClient<ApiResponse<Task>>(`${prefix}/${id}`, {
    method: "PATCH",
    body: payload,
  });
};

export const assignedTaskToMemberApi = (id: string, payload: AssignTaskPayload) => {
  return apiClient<ApiResponse<Task>>(`${prefix}/${id}`, {
    method: "PUT",
    body: payload,
  });
};

export const createTaskCommentApi = (taskId: string, payload: CreateCommentPayload) => {
  return apiClient<ApiResponse<TaskComment>>(`${prefix}/${taskId}/comment`, {
    method: "POST",
    body: payload,
  });
};

export const getTaskCommentsApi = (taskId: string) => {
  return apiClient<ApiResponse<TaskComment[]>>(`${prefix}/${taskId}/comments`, {
    method: "GET",
  });
};