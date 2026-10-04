import CreatePayment from "@/components/Modules/Payment/CreatePayment";
import React from "react";

const myBillingPage = () => {
  return (
    <div>
      <h1 className="text-2xl font-semibold">Billing</h1>
      <p>Manage Your Sprintly subscription and payments</p>

      <div>
        <CreatePayment />
      </div>
    </div>
  );
};

export default myBillingPage;
