import apiClient from "@/lib/apiClient";

const prefix = "/task";

export const getMyAssignedTaskApi = () => {
  return apiClient(`${prefix}/myAssigned`, { method: "GET" });
};

export const getTaskDetailsApi = (id: string) => {
  return apiClient(`${prefix}/${id}`, { method: "GET" });
};

export const updateTaskApi = (id: string, payload: any) => {
  return apiClient(`${prefix}/${id}`, { method: "PATCH", body: payload });
};

export const assignedTaskToMemberApi = (id: string, payload: any) => {
  return apiClient(`${prefix}/${id}`, { method: "PUT", body: payload });
};

export const createTaskCommentApi = (taskId: string, payload: any) => {
  return apiClient(`${prefix}/${taskId}/comment`, {
    method: "POST",
    body: payload,
  });
};

export const getTaskCommentsApi = (taskId: string) => {
  return apiClient(`${prefix}/${taskId}/comments`, { method: "GET" });
};
