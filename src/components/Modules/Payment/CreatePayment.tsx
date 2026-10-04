"use client";
import NoSubsCard from "./NoSubsCard";
import { useGetMyPayments } from "@/hooks/payment.hooks";
import GlobalLoader from "@/app/loading";
import ActiveSub from "./ActiveSub";
import PaymentHistory from "./PaymentHistory";

const CreatePayment = () => {
  const { data, isPending, isError } = useGetMyPayments();
  const payments = data?.data ?? [];

  if (isPending) {
    return <GlobalLoader />;
  }

  if (isError) {
    return (
      <p role="alert" className="my-5 text-sm text-destructive">
        Payment information could not be loaded. Please try again later.
      </p>
    );
  }

  const activePayment = payments.find(
    (payment) => payment.subscription?.status?.toLowerCase() === "active",
  );

  return (
    <div className="my-5">
      {!activePayment && <NoSubsCard />}
      {activePayment && <ActiveSub payment={activePayment} />}
      <div className="mt-5">
        <PaymentHistory payments={payments} />
      </div>
    </div>
  );
};

export default CreatePayment;
