import apiClient from "@/lib/apiClient";
import { ProjectCreatePayload, ProjectParams, ProjectUpdatePayload, TaskCreatePayload } from "@/types/project.types";

const prefix = "/project";

export const projectCreateApi = (payload: ProjectCreatePayload) => {
  return apiClient(`${prefix}/create`, { method: "POST", body: payload });
};

// TODO -> have to add the apiClient response type
export const projectGetApi = (params: ProjectParams) => {
  return apiClient(`${prefix}/get`, { method: "GET", params });
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
  return apiClient(`${prefix}/del/${id}`, { method: "PATCH" });
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
  return apiClient(`${prefix}/${projectId}/tasks`, {
    method: "POST",
    body: payload,
  });
};

export const projectTasksGetApi = (projectId: string) => {
  return apiClient(`${prefix}/${projectId}/tasks`, { method: "GET" });
};
