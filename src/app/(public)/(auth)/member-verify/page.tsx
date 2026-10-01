import VerifyAccountForm from "@/components/Form/Auth/VerifyAccountForm/VerifyAccountForm";
import React, { Suspense } from "react";

const memberVerifyPage = () => {
  return (
    <div>
      {/* <Suspense fallback={<p>Loading...</p>}> */}
    <VerifyAccountForm mode="member"/>
      {/* </Suspense> */}
    </div>
  );
};

export default memberVerifyPage;
