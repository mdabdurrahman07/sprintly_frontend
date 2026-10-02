"use client";
import React, { ReactNode } from "react";
import { GoogleOAuthProvider } from "@react-oauth/google";
const GoogleAuthProvider = ({ children }: { children: ReactNode }) => {
  const clientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID;
  if (!clientId) {
    return <>{children}</>;
  }
  return (
    <GoogleOAuthProvider clientId={clientId}>{children}</GoogleOAuthProvider>
  );
};

export default GoogleAuthProvider;
