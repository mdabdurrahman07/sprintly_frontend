import { paymentCreateApi, paymentGetApi } from "@/api/payment.api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetMyPayments = () => {
  return useQuery({
    queryKey: ["payments"],
    queryFn: paymentGetApi,
  });
};

export const useCreatePayment = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: paymentCreateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["payments"] });
    },
  });
};
