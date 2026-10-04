import { Button } from "@/components/ui/button";
import { AppWindow } from "lucide-react";
import React from "react";

const ActiveSub = () => {
  return (
    <div className="flex flex-col justify-between gap-6 rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs sm:flex-row sm:items-start dark:border-border dark:bg-card">
      {/* Left side: Plan Info */}
      <div className="flex gap-4">
        {/* Icon */}
        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 dark:bg-primary/10 dark:text-primary">
          <AppWindow className="size-7" />
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <div className="flex items-center gap-3">
            <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
              Pro Plan
            </h3>
            {/* Active Badge */}
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
              <div className="size-1.5 rounded-full bg-emerald-500" />
              Active
            </span>
          </div>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            ৳999/month · Billed monthly via bKash
          </p>
        </div>
      </div>

      {/* Right side: Billing Cycle & Actions */}
      <div className="flex w-full flex-col sm:w-[320px] sm:items-end">
        {/* Progress Info */}
        <div className="mb-2 flex w-full items-center justify-between text-sm sm:w-[240px]">
          <span className="text-zinc-500 dark:text-muted-foreground">
            Billing cycle
          </span>
          <span className="font-semibold text-zinc-900 dark:text-foreground">
            18 days remaining
          </span>
        </div>
        {/* Custom Progress Bar */}
        <div className="mb-4 h-2.5 w-full overflow-hidden rounded-full bg-zinc-100 sm:w-[240px] dark:bg-muted">
          <div className="h-full w-[45%] rounded-full bg-blue-600 dark:bg-primary" />
        </div>

        {/* Action Buttons */}
        <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:justify-end">
          <Button
            variant="outline"
            className="rounded-full px-5 font-semibold text-zinc-700 dark:text-foreground"
          >
            Change plan
          </Button>
          <button
            type="button"
            className="text-sm font-medium text-zinc-500 transition-colors hover:text-zinc-900 dark:text-muted-foreground dark:hover:text-foreground"
          >
            Cancel subscription
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActiveSub;
