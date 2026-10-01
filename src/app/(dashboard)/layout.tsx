import AuthGuard from "@/components/Auth/AuthGuard";
import { ReactNode } from "react";

export default function dashboardRootLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <AuthGuard>{children}</AuthGuard>;
}
