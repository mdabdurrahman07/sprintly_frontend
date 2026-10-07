import {
  useMutation,
  useQuery,
  useQueryClient,
  type QueryFilters,
  type QueryKey,
} from "@tanstack/react-query";
import {
  assignedTaskToMemberApi,
  getMyAssignedTaskApi,
  getTaskDetailsApi,
  updateTaskApi,
} from "@/api/task.api";
import { patchTaskInResponse } from "@/lib/kanban";
import { projectKeys, taskKeys, taskMutationKeys } from "@/lib/query-keys";
import type {
  AssignTaskPayload,
  Task,
  UpdateTaskPayload,
} from "@/types/task.types";
import { ApiResponse } from "@/types/api.types";

/** Tasks assigned to the signed-in member (member dashboard). */
export const useGetMyAssignedTask = ({ enabled = true }: { enabled?: boolean } = {}) => {
  return useQuery({
    queryKey: taskKeys.assigned(),
    queryFn: getMyAssignedTaskApi,
    enabled,
  });
};

export const useGetTaskDetails = (id: string) => {
  return useQuery({
    queryKey: taskKeys.detail(id),
    queryFn: () => getTaskDetailsApi(id),
    enabled: Boolean(id),
  });
};

type TaskListSnapshot = [QueryKey, ApiResponse<Task[]> | undefined][];

interface UpdateTaskVariables {
  id: string;
  /** Needed to find the cached project board that shows this task. */
  projectId: string;
  payload: UpdateTaskPayload;
}

interface UpdateTaskContext {
  snapshots: TaskListSnapshot;
}

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<ApiResponse<Task>, unknown, UpdateTaskVariables, UpdateTaskContext>({
    mutationKey: taskMutationKeys.update,
    mutationFn: ({ id, payload }) => updateTaskApi(id, payload),
    onMutate: async ({ id, projectId, payload }) => {
      const filters: QueryFilters[] = [
        { queryKey: projectKeys.tasks(projectId) },
        { queryKey: taskKeys.assigned() },
      ];
      await Promise.all(filters.map((filter) => queryClient.cancelQueries(filter)));

      const snapshots = filters.flatMap((filter) =>
        queryClient.getQueriesData<ApiResponse<Task[]>>(filter),
      );
      for (const filter of filters) {
        queryClient.setQueriesData<ApiResponse<Task[]>>(filter, (old) =>
          patchTaskInResponse(old, id, payload),
        );
      }
      return { snapshots };
    },
    onError: (_error, _variables, context) => {
      context?.snapshots.forEach(([queryKey, data]) => {
        if (data) queryClient.setQueryData(queryKey, data);
      });
    },
    onSettled: async (_data, _error, { id }) => {
      // While several drags are in flight, only the last one refetches;
      // otherwise an early response would overwrite a later optimistic move.
      if (queryClient.isMutating({ mutationKey: taskMutationKeys.update }) > 1) return;
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: taskKeys.assigned() }),
        queryClient.invalidateQueries({ queryKey: taskKeys.detail(id) }),
      ]);
    },
  });
};

interface AssignTaskVariables {
  id: string;
  payload: AssignTaskPayload;
}

export const useAssignedTaskToMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: AssignTaskVariables) =>
      assignedTaskToMemberApi(id, payload),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: projectKeys.all }),
        queryClient.invalidateQueries({ queryKey: taskKeys.all }),
      ]);
    },
  });
};