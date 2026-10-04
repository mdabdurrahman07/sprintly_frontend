import { Button } from "@/components/ui/button";
import {
  AlertCircle,
  ArrowRight,
  CheckCircle2,
  CreditCard,
  XCircle,
} from "lucide-react";
import Link from "next/link";
import React from "react";

export type PaymentResultStatus = "success" | "failure" | "cancel" | "unknown";

type NoSubsCardProps = {
  status?: PaymentResultStatus;
};

const resultContent = {
  success: {
    title: "Payment successful",
    description: "Your payment has been completed successfully.",
    icon: CheckCircle2,
    color:
      "border-emerald-200/60 bg-emerald-50/80 text-emerald-600 dark:border-emerald-800/50 dark:bg-emerald-950/30 dark:text-emerald-400",
  },
  failure: {
    title: "Payment failed",
    description: "Your payment could not be completed. Please try again.",
    icon: XCircle,
    color:
      "border-red-200/60 bg-red-50/80 text-red-600 dark:border-red-800/50 dark:bg-red-950/30 dark:text-red-400",
  },
  cancel: {
    title: "Payment cancelled",
    description: "You cancelled the payment before it was completed.",
    icon: AlertCircle,
    color:
      "border-amber-200/60 bg-amber-50/80 text-amber-600 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400",
  },
  unknown: {
    title: "Payment status unavailable",
    description: "We could not determine the result of your payment.",
    icon: AlertCircle,
    color:
      "border-zinc-200/80 bg-zinc-50 text-zinc-600 dark:border-border dark:bg-muted dark:text-muted-foreground",
  },
} satisfies Record<
  PaymentResultStatus,
  {
    title: string;
    description: string;
    icon: React.ComponentType<{ className?: string }>;
    color: string;
  }
>;

const NoSubsCard = ({ status }: NoSubsCardProps) => {
  const result = status ? resultContent[status] : null;
  const Icon = result?.icon ?? CreditCard;

  return (
    <div className="flex flex-col items-center justify-center rounded-2xl border border-zinc-200/80 bg-white p-10 text-center shadow-xs dark:border-border dark:bg-card">
      <div
        className={`relative mb-5 flex h-16 w-16 items-center justify-center rounded-full border ${
          result?.color ??
          "border-amber-200/60 bg-amber-50/80 text-amber-600 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400"
        }`}
      >
        <Icon className="size-7" />
        {!result && (
          <div className="absolute h-0.5 w-8 rotate-45 bg-amber-600 dark:bg-amber-400" />
        )}
      </div>

      <h3 className="font-headline text-xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
        {result?.title ?? "No active subscription"}
      </h3>

      <p className="mt-2.5 max-w-sm text-sm text-zinc-500 leading-relaxed dark:text-muted-foreground">
        {result?.description ??
          "You need an active plan to create projects and assign tasks to your team. Subscribe to a plan to get started."}
      </p>

      <Link href={result ? "/manager" : "/pricing"}>
        <Button className="mt-6 inline-flex items-center justify-center gap-2 rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white transition-all hover:bg-blue-700 active:scale-[0.98] dark:bg-primary dark:hover:bg-primary-hover">
          <span>{result ? "Go to Dashboard" : "Subscribe to a plan"}</span>
          <ArrowRight className="size-4" />
        </Button>
      </Link>
    </div>
  );
};

export default NoSubsCard;
