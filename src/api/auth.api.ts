import apiClient from "@/lib/apiClient";
import {
  IGoogleLoginPayload,
  IManagerRegisterPayload,
  IMemberRegisterPayload,
  IUserLoginPayload,
  IVerifyEmailPayload,
} from "@/types";
import { ApiResponse } from "@/types/api.types";
import { SessionUser } from "@/types/user.types";

const prefix = "/auth";

export const loginApi = (payload: IUserLoginPayload) => {
  return apiClient(`${prefix}/login`, { method: "POST", body: payload });
};
export const memberRegisterApi = (payload: IMemberRegisterPayload) => {
  return apiClient(`${prefix}/register/member`, {
    method: "POST",
    body: payload,
  });
};
export const managerRegisterApi = (payload: IManagerRegisterPayload) => {
  return apiClient(`${prefix}/register/manager`, {
    method: "POST",
    body: payload,
  });
};
export const memberVerifyApi = (payload: IVerifyEmailPayload) => {
  return apiClient(`${prefix}/verifyEmail`, {
    method: "POST",
    body: payload,
  });
};
export const managerVerifyApi = (payload: IVerifyEmailPayload) => {
  return apiClient(`${prefix}/verifyEmail/manager`, {
    method: "POST",
    body: payload,
  });
};
export const getMeApi = () => {
  return apiClient<ApiResponse<SessionUser>>(`${prefix}/me`, { method: "GET" });
};

export const refreshTokenApi = () => {
  return apiClient(`${prefix}/refresh-token`, {
    method: "POST",
  });
};
export const googleLoginApi = (payload: IGoogleLoginPayload) => {
  return apiClient(`${prefix}/google`, {
    method: "POST",
    body: payload,
  });
};

export function userLogout() {
  return apiClient(`${prefix}/logout`, { method: "POST" });
}
