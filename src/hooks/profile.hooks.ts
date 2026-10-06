import { updateMemberProfile } from "@/api/profile.api";
import { IManagerProfileUpdate, IMemberProfileUpdate } from "@/types/profile.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMemberProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IMemberProfileUpdate) =>
      updateMemberProfile(payload),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
export const useUpdateManagerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: IManagerProfileUpdate) =>
      updateMemberProfile(payload),
    onSuccess: (_data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
        exact: true,
      });
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};