"use client";
import NoSubsCard from "./NoSubsCard";
import { useGetMyPayments } from "@/hooks/payment.hooks";
import GlobalLoader from "@/app/loading";
import ActiveSub from "./ActiveSub";
import PaymentHistory from "./PaymentHistory";

const CreatePayment = () => {
  const { data, isPending } = useGetMyPayments();
  const payment = data?.data;
  if (isPending) {
    return <GlobalLoader />;
  }
  return (
    <div className="my-5">
      {payment.length > 0 ? (
        <div className="space-y-5">
          <ActiveSub />
          <PaymentHistory />
        </div>
      ) : (
        <NoSubsCard />
      )}
    </div>
  );
};

export default CreatePayment;
