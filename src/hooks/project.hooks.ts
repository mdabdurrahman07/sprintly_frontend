import {
  projectCreateApi,
  projectDeleteApi,
  projectGetApi,
  projectGetByIdApi,
  projectRemoveMemberApi,
  projectTasksCreateApi,
  projectTasksGetApi,
  projectUpdateApi,
} from "@/api/project.api";
import {
  ProjectParams,
  ProjectUpdatePayload,
  TaskCreatePayload,
} from "@/types/project.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useCreateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: projectCreateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["projects"],
      });
    },
  });
};

export const useGetProjects = (params: ProjectParams) => {
  return useQuery({
    queryKey: ["projects", params],
    queryFn: () => projectGetApi(params),
  });
};
export const useGetSingleProjects = (id: string) => {
  return useQuery({
    queryKey: ["projects", id],
    queryFn: () => projectGetByIdApi(id),
    enabled: Boolean(id),
  });
};
type UpdateProjectVariables = { id: string; payload: ProjectUpdatePayload };
export const useUpdateProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: UpdateProjectVariables) =>
      projectUpdateApi(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", id],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};
export const useDeleteProject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => projectDeleteApi(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: ["projects", id],
      });
      queryClient.invalidateQueries({ queryKey: ["projects"] });
    },
  });
};

type RemoveMemberVariables = { projectId: string; memberId: string };
export const useRemoveProjectMember = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, memberId }: RemoveMemberVariables) =>
      projectRemoveMemberApi(projectId, memberId),
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId],
        exact: true,
      });
    },
  });
};

type CreateTaskVariables = { projectId: string; payload: TaskCreatePayload };
export const useCreateProjectTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ projectId, payload }: CreateTaskVariables) =>
      projectTasksCreateApi(projectId, payload),
    onSuccess: (_data, { projectId }) => {
      queryClient.invalidateQueries({
        queryKey: ["projects", projectId, "tasks"],
      });
    },
  });
};

export const useGetProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: ["projects", projectId, "tasks"],
    queryFn: () => projectTasksGetApi(projectId),
    enabled: Boolean(projectId),
  });
};
