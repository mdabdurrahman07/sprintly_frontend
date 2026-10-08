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
import { KANBAN_TASK_LIMIT } from "@/lib/kanban";
import { projectKeys, taskKeys } from "@/lib/query-keys";
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
    onSuccess: async (id) => {
      await Promise.all([
        queryClient.removeQueries({
          queryKey: projectKeys.detail(id),
          exact: true,
        }),
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
      ]);
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
        queryKey: projectKeys.detail(projectId),
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
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: taskKeys.assigned() }),
      ]);
    },
  });
};

export const useGetProjectTasks = (projectId: string) => {
  return useQuery({
    queryKey: projectKeys.tasks(projectId),
    queryFn: () => projectTasksGetApi(projectId, { limit: KANBAN_TASK_LIMIT }),
    enabled: Boolean(projectId),
  });
};
