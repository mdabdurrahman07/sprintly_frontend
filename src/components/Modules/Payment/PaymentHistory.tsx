import { Check, Download } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetPlans } from "@/hooks/plan.hooks";
import type { myPaymentResponse } from "@/types/payment.types";

type PaymentHistoryProps = {
  payments: myPaymentResponse[];
};

const formatDate = (dateValue: string) => {
  const date = new Date(dateValue);
  return Number.isNaN(date.getTime())
    ? "Date unavailable"
    : new Intl.DateTimeFormat("en-BD", { dateStyle: "medium" }).format(date);
};

const formatAmount = (amount: string, currency: string) => {
  const numericAmount = Number(amount);
  if (!Number.isFinite(numericAmount)) return `${amount} ${currency}`;

  return new Intl.NumberFormat("en-BD", {
    style: "currency",
    currency: currency || "BDT",
    maximumFractionDigits: 0,
  }).format(numericAmount);
};

const PaymentHistory = ({ payments }: PaymentHistoryProps) => {
  const { data: plansResponse } = useGetPlans();
  const plans = plansResponse?.data ?? [];
  const sortedPayments = [...payments].sort((a, b) => {
    const dateA = new Date(a.paidAt || a.createdAt).getTime();
    const dateB = new Date(b.paidAt || b.createdAt).getTime();
    const validDateA = Number.isNaN(dateA) ? 0 : dateA;
    const validDateB = Number.isNaN(dateB) ? 0 : dateB;
    return validDateB - validDateA;
  });

  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      {/* Header Area */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            Payment history
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            View transaction receipts
          </p>
        </div>
        {/* <Button
          variant="outline"
          size="sm"
          className="rounded-full px-4 text-zinc-700 dark:text-foreground"
          disabled={payments.length === 0}
        >
          <Download className="mr-2 size-4" />
          Download all
        </Button> */}
      </div>

      {/* Table Data */}
      <div className="overflow-x-auto">
        <Table className="min-w-150">
          <TableHeader>
            <TableRow className="border-zinc-100 hover:bg-transparent dark:border-border/50">
              <TableHead className="h-10 text-xs font-semibold tracking-wider text-zinc-400">
                PLAN
              </TableHead>
              <TableHead className="h-10 text-xs font-semibold tracking-wider text-zinc-400">
                AMOUNT
              </TableHead>
              <TableHead className="h-10 text-xs font-semibold tracking-wider text-zinc-400">
                PAID AT
              </TableHead>
              <TableHead className="h-10 text-xs font-semibold tracking-wider text-zinc-400">
                METHOD
              </TableHead>
              <TableHead className="h-10 text-right text-xs font-semibold tracking-wider text-zinc-400">
                STATUS
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedPayments.length > 0 ? (
              sortedPayments.map((payment) => {
                const planName = plans.find(({ id }) => id === payment.planId)?.name;
                const isPaid =
                  payment.status &&
                  ["paid", "success", "completed"].includes(
                    payment.status.toLowerCase(),
                  );

                return (
              <TableRow
                key={payment.id}
                className="border-zinc-100 hover:bg-zinc-50/50 dark:border-border/50 dark:hover:bg-muted/30"
              >
                <TableCell className="py-4 font-semibold text-zinc-900 dark:text-foreground">
                  {planName ?? "Subscription plan"}
                </TableCell>
                <TableCell className="py-4 font-semibold text-zinc-900 dark:text-foreground">
                  {formatAmount(payment.amount, payment.currency)}
                </TableCell>
                <TableCell className="py-4 text-zinc-500 dark:text-muted-foreground">
                  {formatDate(payment.paidAt || payment.createdAt)}
                </TableCell>
                <TableCell className="py-4">
                  <span className="inline-flex rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600 dark:bg-muted dark:text-muted-foreground">
                    {payment.provider || "Unavailable"}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-semibold ring-1 ring-inset ${
                      isPaid
                        ? "bg-emerald-50 text-emerald-700 ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20"
                        : "bg-zinc-100 text-zinc-600 ring-zinc-500/20 dark:bg-muted dark:text-muted-foreground"
                    }`}
                  >
                    {isPaid && <Check className="size-3.5" />}
                    {payment.status || "Unknown"}
                  </span>
                </TableCell>
              </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={5}
                  className="py-8 text-center text-sm text-zinc-500 dark:text-muted-foreground"
                >
                  No payment history yet.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
