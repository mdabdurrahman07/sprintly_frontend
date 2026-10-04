"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { useCreatePayment } from "@/hooks/payment.hooks";
import { useGetPlans } from "@/hooks/plan.hooks";
import { useSearchParams } from "next/navigation";
import { toast } from "sonner";

const PayBill = () => {
  const planId = useSearchParams().get("planId");
  const {
    mutate: createBkashPayment,
    isPending: isPaymentPending,
  } = useCreatePayment();
  const {
    data: plansResponse,
    isPending: isPlansPending,
    isError: isPlansError,
  } = useGetPlans();
  const selectedPlan = plansResponse?.data?.find((plan) => plan.id === planId);

  const handlePayNow = () => {
    if (!planId || isPaymentPending) return;

    createBkashPayment(
      { planId },
      {
        onSuccess: (response) => {
            console.log(response.data, "payment")
          const paymentUrl = response.data?.bkash;
          if (!response.success || !paymentUrl) {
            toast.error("Payment could not be started", {
              description:
                response.message || "Please try again in a moment.",
            });
            return;
          }

          window.location.assign(paymentUrl);
        },
        onError: (error) => {
          toast.error("Payment could not be started", {
            description: error.message || "Please try again in a moment.",
          });
        },
      },
    );
  };

  const formattedPrice = selectedPlan
    ? new Intl.NumberFormat("en-BD", {
        style: "currency",
        currency: selectedPlan.currency,
        maximumFractionDigits: 0,
      }).format(Number(selectedPlan.price))
    : null;

  return (
    <main className="min-h-[70vh] flex items-center justify-center px-4 py-16">
      <Card className="w-full max-w-lg p-8">
        {isPlansPending && (
          <p className="text-center text-sm text-muted-foreground">
            Loading plan details...
          </p>
        )}

        {!isPlansPending && isPlansError && (
          <p role="alert" className="text-center text-sm text-destructive">
            Plan details could not be loaded. Please refresh and try again.
          </p>
        )}

        {!isPlansPending && !isPlansError && !selectedPlan && (
          <p role="alert" className="text-center text-sm text-muted-foreground">
            {planId
              ? "The selected plan could not be found. Please choose a plan again."
              : "No plan was selected. Please choose a plan to continue."}
          </p>
        )}

        {selectedPlan && formattedPrice && (
          <div className="flex flex-col">
            <div className="mb-6">
              <span className="text-xs font-bold uppercase tracking-wider text-muted-foreground">
                Selected plan
              </span>
              <h1 className="mt-1 text-2xl font-bold text-foreground">
                {selectedPlan.name}
              </h1>
            </div>

            <div className="mb-4">
              <span className="text-4xl font-extrabold text-foreground">
                {formattedPrice}
              </span>
              <span className="ml-1 text-sm text-muted-foreground">/month</span>
            </div>

            {selectedPlan.description && (
              <p className="mb-8 text-sm text-muted-foreground">
                {selectedPlan.description}
              </p>
            )}

            <Button
              type="button"
              className="w-full"
              onClick={handlePayNow}
              disabled={isPaymentPending}
            >
              {isPaymentPending ? "Starting payment..." : "Pay now"}
            </Button>
          </div>
        )}
      </Card>
    </main>
  );
};

export default PayBill;
