import VerifyAccountForm from "@/components/Form/Auth/VerifyAccountForm/VerifyAccountForm";
import React, { Suspense } from "react";

const managerVerifyPage = () => {
  return (
    <div>
      <Suspense fallback={<p>Loading...</p>}>
        <VerifyAccountForm mode="manager" />
      </Suspense>
    </div>
  );
};

export default managerVerifyPage;
