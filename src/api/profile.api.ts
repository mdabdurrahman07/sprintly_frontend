import apiClient from "@/lib/apiClient";
import {
  IManagerProfileUpdate,
  IMemberProfileUpdate,
} from "@/types/profile.types";

const prefix = "/profile/update";

export const updateMemberProfile = (payload: IMemberProfileUpdate) => {
  return apiClient(`${prefix}/member`, {
    method: "PATCH",
    body: payload,
  });
};
export const updateManagerProfile = (payload: IManagerProfileUpdate) => {
  return apiClient(`${prefix}/manager`, {
    method: "PATCH",
    body: payload,
  });
};
