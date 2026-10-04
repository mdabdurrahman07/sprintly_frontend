import { Download, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const paymentData = [
  {
    id: 1,
    plan: "Pro Plan",
    amount: "৳999",
    date: "Sep 24, 2026",
    method: "bKash",
    status: "Paid",
  },
  {
    id: 2,
    plan: "Pro Plan",
    amount: "৳999",
    date: "Aug 24, 2026",
    method: "bKash",
    status: "Paid",
  },
  {
    id: 3,
    plan: "Eco Plan",
    amount: "৳499",
    date: "Jul 24, 2026",
    method: "bKash",
    status: "Paid",
  },
  {
    id: 4,
    plan: "Eco Plan",
    amount: "৳499",
    date: "Jun 24, 2026",
    method: "bKash",
    status: "Paid",
  },
];

const PaymentHistory = () => {
  return (
    <div className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-xs dark:border-border dark:bg-card">
      {/* Header Area */}
      <div className="mb-6 flex flex-col justify-between gap-4 sm:flex-row sm:items-start">
        <div>
          <h3 className="font-headline text-lg font-bold text-zinc-900 dark:text-foreground">
            Payment history
          </h3>
          <p className="mt-1 text-sm text-zinc-500 dark:text-muted-foreground">
            View and download past invoices and transaction receipts
          </p>
        </div>
        <Button
          variant="outline"
          size="sm"
          className="rounded-full px-4 text-zinc-700 dark:text-foreground"
        >
          <Download className="mr-2 size-4" />
          Download all
        </Button>
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
            {paymentData.map((invoice) => (
              <TableRow
                key={invoice.id}
                className="border-zinc-100 hover:bg-zinc-50/50 dark:border-border/50 dark:hover:bg-muted/30"
              >
                <TableCell className="py-4 font-semibold text-zinc-900 dark:text-foreground">
                  {invoice.plan}
                </TableCell>
                <TableCell className="py-4 font-semibold text-zinc-900 dark:text-foreground">
                  {invoice.amount}
                </TableCell>
                <TableCell className="py-4 text-zinc-500 dark:text-muted-foreground">
                  {invoice.date}
                </TableCell>
                <TableCell className="py-4">
                  <span className="inline-flex rounded-md bg-zinc-100 px-2 py-1 text-xs font-semibold text-zinc-600 dark:bg-muted dark:text-muted-foreground">
                    {invoice.method}
                  </span>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-inset ring-emerald-600/20 dark:bg-emerald-500/10 dark:text-emerald-400 dark:ring-emerald-500/20">
                    <Check className="size-3.5" />
                    {invoice.status}
                  </span>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default PaymentHistory;
