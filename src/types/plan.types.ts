export type SubscriptionPlan = "FREE" | "PRO" | "ENTERPRISE";

export interface ICreatePlanPayload {
  name: SubscriptionPlan;
  price: number;
}

export interface IUpdatePlanPayload {
  name?: SubscriptionPlan;
  price?: number;
}

export interface Plan {
  id: string;
  name: SubscriptionPlan;
  price: string;
  currency: string;
  description: string | null;
}