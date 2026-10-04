"use client"
import NoSubsCard from "./NoSubsCard";
import { useGetMyPayments } from "@/hooks/payment.hooks";
import GlobalLoader from "@/app/loading";

const CreatePayment = () => {
  const { data, isPending } = useGetMyPayments();
  const payment = data?.data;
  if (isPending) {
    return <GlobalLoader />;
  }
  return (
    <div className="my-5">
      {payment.length > 0 ? (
        <>
          <h1>Subscribed</h1>
        </>
      ) : (
        <NoSubsCard />
      )}
    </div>
  );
};

export default CreatePayment;
