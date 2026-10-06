import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";

const prefix = "/comments";

export const deleteCommentApi = (id: string) => {
  return apiClient<ApiResponse<unknown>>(`${prefix}/${id}`, { method: "DELETE" });
};