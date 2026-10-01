"use client";

import { useGetMe } from "@/hooks";
import { userRole } from "@/types/user.types";
import { LoaderIcon, ShieldAlert } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ReactNode, useEffect } from "react";

interface IProps {
  children: ReactNode;
  roles: userRole[];
}

export function AccessDenied() {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-3">
        <div className="bg-red-200 rounded-full p-4">
          <ShieldAlert className="size-8 text-red-500" />
        </div>
        <div>
          <h1 className="text-lg font-semibold">
            {" "}
            You do not have access to this page{" "}
          </h1>
          <p>
            Go back to{" "}
            <Link href="/" className="underline">
              {" "}
              home
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export function AuthLoading({ label = "Verifying account" }: { label?: string }) {
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="flex gap-3">
        <LoaderIcon className="size-6 animate-spin" />
        {label}
      </div>
    </div>
  );
}

export const RoleGuard = ({ children, roles }: IProps) => {
  const router = useRouter();
  const { data, isPending, isError } = useGetMe();
  const user = data?.data;

  const isAuthorized = !!user && roles.includes(user.role);
  useEffect(() => {
    if (isPending) {
      return;
    }
    if (isError || !user) {
      router.replace("/login");
    }
  }, [isPending, isError, user]);
  if (isPending) {
    return <AuthLoading />;
  }

  if (isError || !user) {
    return <AuthLoading label="Redirecting..." />;
  }

  if (isAuthorized) {
    return <>{children}</>;
  }

  return <AccessDenied />;
};
