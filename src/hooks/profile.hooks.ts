import { updateManagerProfile, updateMemberProfile } from "@/api/profile.api";
import {
  IManagerProfileUpdate,
  IMemberProfileUpdate,
} from "@/types/profile.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateMemberProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData | IMemberProfileUpdate) =>
      updateMemberProfile(payload as IMemberProfileUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};

export const useUpdateManagerProfile = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: FormData | IManagerProfileUpdate) =>
      updateManagerProfile(payload as IManagerProfileUpdate),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    },
  });
};
