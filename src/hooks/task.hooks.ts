import {
  assignedTaskToMemberApi,
  createTaskCommentApi,
  getMyAssignedTaskApi,
  getTaskCommentsApi,
  getTaskDetailsApi,
  updateTaskApi,
} from "@/api/task.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMyAssignedTask = () => {
  return useQuery({
    queryKey: ["tasks"],
    queryFn: () => getMyAssignedTaskApi(),
  });
};
export const useGetTaskDetails = (id: string) => {
  return useQuery({
    queryKey: ["tasks", id],
    queryFn: () => getTaskDetailsApi(id),
  });
};
type updateTaskVariables = { id: string; payload: any };
export const useUpdateTask = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: updateTaskVariables) =>
      updateTaskApi(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", id, "projects"],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["projects", id, "tasks"] });
    },
  });
};
type assignedTaskToMemberVariables = { id: string; payload: any };
export const useAssignedTaskToMember = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, payload }: assignedTaskToMemberVariables) =>
      assignedTaskToMemberApi(id, payload),
    onSuccess: (_data, { id }) => {
      queryClient.invalidateQueries({
        queryKey: ["tasks", id, "projects"],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["projects", id, "tasks"] });
    },
  });
};
type createCommentVariables = { taskId: string; payload: any };
export const useCreateTaskComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, payload }: createCommentVariables) =>
      createTaskCommentApi(taskId, payload),
    onSuccess: (_data, { taskId }) => {
      queryClient.invalidateQueries({
        queryKey: ["comments", "tasks", taskId, "projects"],
        exact: true,
      });
      queryClient.invalidateQueries({
        queryKey: ["comments", "tasks", taskId, "projects"],
      });
    },
  });
};
export const useGetTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: ["comments", "task", taskId],
    queryFn: () => getTaskCommentsApi(taskId),
    enabled: Boolean(taskId),
  });
};
