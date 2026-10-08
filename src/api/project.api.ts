import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";
import {
  ProjectCreatePayload,
  ProjectParams,
  ProjectSummary,
  ProjectUpdatePayload,
  TaskCreatePayload,
} from "@/types/project.types";
import { Task, TaskListParams } from "@/types/task.types";

const prefix = "/project";

export const projectCreateApi = (payload: ProjectCreatePayload) => {
  return apiClient(`${prefix}/create`, { method: "POST", body: payload });
};

export const projectGetApi = (params: ProjectParams) => {
  return apiClient<ApiResponse<ProjectSummary[]>>(`${prefix}/get`, {
    method: "GET",
    params,
  });
};

export const projectGetByIdApi = (id: string) => {
  return apiClient(`${prefix}/get/${id}`, { method: "GET" });
};

export const projectUpdateApi = (id: string, payload: ProjectUpdatePayload) => {
  return apiClient(`${prefix}/update/${id}`, {
    method: "PATCH",
    body: payload,
  });
};

export const projectDeleteApi = (id: string) => {
  return apiClient(`${prefix}/del/${id}/project`, { method: "DELETE" });
};

export const projectRemoveMemberApi = (projectId: string, memberId: string) => {
  return apiClient(`${prefix}/del/${projectId}`, {
    method: "DELETE",
    body: { memberId },
  });
};

export const projectTasksCreateApi = (
  projectId: string,
  payload: TaskCreatePayload,
) => {
  return apiClient<ApiResponse<Task>>(`${prefix}/${projectId}/tasks`, {
    method: "POST",
    body: payload,
  });
};

export const projectTasksGetApi = (
  projectId: string,
  params?: TaskListParams,
) => {
  return apiClient<ApiResponse<Task[]>>(`${prefix}/${projectId}/tasks`, {
    method: "GET",
    params,
  });
};
