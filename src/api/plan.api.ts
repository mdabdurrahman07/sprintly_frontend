import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";
import {
  ICreatePlanPayload,
  IUpdatePlanPayload,
  Plan,
} from "@/types/plan.types";

const prefix = "/plan";

export const planCreateApi = (payload: ICreatePlanPayload) => {
  return apiClient(`${prefix}/createPlan`, { method: "POST", body: payload });
};

export const planGetApi = () => {
  return apiClient<ApiResponse<Plan[]>>(`${prefix}/plan`, { method: "GET" });
};

export const planUpdateApi = (id: string, payload: IUpdatePlanPayload) => {
  return apiClient(`${prefix}/updatePlan/${id}`, {
    method: "PATCH",
    body: payload,
  });
};

export const planDeleteApi = (id: string) => {
  return apiClient(`${prefix}/delete/${id}`, {
    method: "DELETE",
  });
};
