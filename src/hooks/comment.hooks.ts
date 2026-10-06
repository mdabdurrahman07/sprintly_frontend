import { deleteCommentApi } from "@/api/comment.api";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteComment = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => deleteCommentApi(id),
    onSuccess: (_data, id) => {
      queryClient.removeQueries({
        queryKey: ["comments", id, "tasks"],
      });
      queryClient.invalidateQueries({ queryKey: ["comments", id, "tasks"] });
    },
  });
};
