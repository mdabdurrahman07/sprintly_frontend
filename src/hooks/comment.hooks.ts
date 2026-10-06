import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { deleteCommentApi } from "@/api/comment.api";
import { createTaskCommentApi, getTaskCommentsApi } from "@/api/task.api";
import { projectKeys, taskKeys } from "@/lib/query-keys";
import type { CreateCommentPayload } from "@/types/task.types";

export const useGetTaskComments = (taskId: string) => {
  return useQuery({
    queryKey: taskKeys.comments(taskId),
    queryFn: () => getTaskCommentsApi(taskId),
    enabled: Boolean(taskId),
  });
};

interface CreateCommentVariables {
  taskId: string;
  projectId: string;
  payload: CreateCommentPayload;
}

export const useCreateTaskComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ taskId, payload }: CreateCommentVariables) =>
      createTaskCommentApi(taskId, payload),
    onSuccess: async (_data, { taskId, projectId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: taskKeys.comments(taskId) }),
        queryClient.invalidateQueries({ queryKey: projectKeys.tasks(projectId) }),
      ]);
    },
  });
};

interface DeleteCommentVariables {
  commentId: string;
  taskId: string;
  projectId: string;
}

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ commentId }: DeleteCommentVariables) =>
      deleteCommentApi(commentId),
    onSuccess: async (_data, { taskId, projectId }) => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: taskKeys.comments(taskId) }),
        queryClient.invalidateQueries({ queryKey: projectKeys.tasks(projectId) }),
      ]);
    },
  });
};