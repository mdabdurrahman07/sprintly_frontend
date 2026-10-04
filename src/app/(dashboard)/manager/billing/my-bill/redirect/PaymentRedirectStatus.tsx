"use client";

import NoSubsCard, {
  type PaymentResultStatus,
} from "@/components/Modules/Payment/NoSubsCard";
import { useSearchParams } from "next/navigation";

const paymentStatuses = ["success", "failure", "cancel"] as const;

const isPaymentResultStatus = (
  status: string | null,
): status is PaymentResultStatus =>
  status !== null && paymentStatuses.some((candidate) => candidate === status);

const PaymentRedirectStatus = () => {
  const statusParam = useSearchParams().get("status");
  const status = isPaymentResultStatus(statusParam) ? statusParam : "unknown";

  return <NoSubsCard status={status} />;
};

export default PaymentRedirectStatus;
