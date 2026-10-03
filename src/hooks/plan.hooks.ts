import {
  planCreateApi,
  planDeleteApi,
  planGetApi,
  planUpdateApi,
} from "@/api/plan.api";
import type { IUpdatePlanPayload } from "@/types/plan.types";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useGetPlans = () => {
  return useQuery({
    queryKey: ["plans"],
    queryFn: planGetApi,
  });
};

export const useCreatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: planCreateApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

type UpdatePlanVariables = { id: string; payload: IUpdatePlanPayload };

export const useUpdatePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, payload }: UpdatePlanVariables) =>
      planUpdateApi(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};

export const useDeletePlan = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => planDeleteApi(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["plans"] });
    },
  });
};