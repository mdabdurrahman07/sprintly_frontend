import {
  getMeApi,
  googleLoginApi,
  loginApi,
  managerRegisterApi,
  managerVerifyApi,
  memberRegisterApi,
  memberVerifyApi,
  refreshTokenApi,
  userLogout,
} from "@/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export const useLogin = () => {
  return useMutation({
    mutationFn: loginApi,
  });
};
export const useMemberRegistration = () => {
  return useMutation({
    mutationFn: memberRegisterApi,
  });
};
export const useManagerRegistration = () => {
  return useMutation({
    mutationFn: managerRegisterApi,
  });
};
export const useVerifyMember = () => {
  return useMutation({
    mutationFn: memberVerifyApi,
  });
};
export const useVerifyManager = () => {
  return useMutation({
    mutationFn: managerVerifyApi,
  });
};
export const useGetMe = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: getMeApi,
    retry: false,
  });
};

export const useRefreshToken = () => {
  return useMutation({
    mutationFn: refreshTokenApi,
  });
};
export const useGoogleLogin = () => {
  return useMutation({
    mutationFn: googleLoginApi,
  });
};

export function useLogout() {
  return useMutation({
    mutationFn: userLogout,
  });
}
