import CreatePayment from "@/components/Modules/Payment/CreatePayment";
import React from "react";

const myBillingPage = () => {
  return (
    <div>
      <h1 className="font-headline text-2xl font-bold tracking-tight text-zinc-900 dark:text-foreground">
        Billing
      </h1>
      <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
        Manage Your Sprintly subscription and payments
      </p>
      <div>
        <CreatePayment />
      </div>
    </div>
  );
};

export default myBillingPage;
