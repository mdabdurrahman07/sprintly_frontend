import apiClient from "@/lib/apiClient";
import { ApiResponse } from "@/types/api.types";
import {
  createPaymentResponse,
  ICreatePaymentPayload,
} from "@/types/payment.types";

const prefix = "/payment";

export const paymentCreateApi = (payload: ICreatePaymentPayload) => {
  return apiClient<ApiResponse<createPaymentResponse>>(
    `${prefix}/createPayment`,
    {
      method: "POST",
      body: payload,
    },
  );
};

export const paymentGetApi = () => {
  return apiClient(`${prefix}/getMyPayment`, { method: "GET" });
};
