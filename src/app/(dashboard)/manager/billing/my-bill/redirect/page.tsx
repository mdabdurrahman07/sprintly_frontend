import { Suspense } from "react";
import PaymentRedirectStatus from "./PaymentRedirectStatus";

const RedirectBillPage = () => {
  return (
    <main className="flex min-h-[70vh] items-center justify-center px-4 py-16">
      <div className="w-full max-w-lg">
        <Suspense
          fallback={
            <div className="rounded-2xl border border-zinc-200/80 bg-white p-10 text-center text-sm text-muted-foreground shadow-xs dark:border-border dark:bg-card">
              Loading payment status...
            </div>
          }
        >
          <PaymentRedirectStatus />
        </Suspense>
      </div>
    </main>
  );
};

export default RedirectBillPage;
