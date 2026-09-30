"use client"
import React, { useState } from "react";
import ManagerRegistrationForm from "./ManagerRegistrationForm";
import MemberRegistrationForm from "./MemberRegistrationForm";
import Link from "next/link";
import { FieldSeparator } from "@/components/ui/field";
import { User, Users } from "lucide-react";

export type RoleType = "member" | "manager";

const RegistrationForm = () => {
  const [role, setRole] = useState<RoleType>("member");

  return (
    <div className="w-full space-y-6">
      {/* Header */}
      <div className="text-left">
        <h2 className="text-2xl lg:text-[28px] font-bold text-foreground tracking-tight">
          Create your account
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          Start managing projects the easy way
        </p>
      </div>

      {/* Role Switcher Pill */}
      <div>
        <label className="block text-xs font-semibold text-foreground mb-2">
          Account Type
        </label>
        <div className="p-1 bg-muted rounded-full flex items-center border border-border">
          <button
            onClick={() => setRole("member")}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
              role === "member"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>Member</span>
          </button>
          <button
            type="button"
            onClick={() => setRole("manager")}
            className={`flex-1 py-2 px-4 rounded-full text-xs font-semibold transition-all duration-150 flex items-center justify-center gap-1.5 ${
              role === "manager"
                ? "bg-primary text-primary-foreground shadow-xs"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <Users className="w-3.5 h-3.5" />
            <span>Manager</span>
          </button>
        </div>
      </div>

      {/* Render Dynamic Form */}
      {role === "member" ? (
        <MemberRegistrationForm />
      ) : (
        <ManagerRegistrationForm />
      )}

      {/* Social Divider */}
      <FieldSeparator>Or continue with</FieldSeparator>

      {/* Google OAuth Section */}
      {/* <div
        className={`transition-opacity duration-150 ${
          role === "manager" ? "opacity-40 pointer-events-none" : "opacity-100"
        }`}
      >
        <button
          type="button"
          disabled={role === "manager"}
          className="w-full py-2.5 px-4 rounded-full border border-border bg-card hover:bg-accent text-foreground font-medium text-sm flex items-center justify-center gap-2.5 transition-all duration-150 shadow-xs cursor-pointer disabled:cursor-not-allowed"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24">
            <path
              fill="#4285F4"
              d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.65v3.03h3.88c2.27-2.09 3.66-5.17 3.66-9.12z"
            />
            <path
              fill="#34A853"
              d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.03c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.27v3.13C3.25 21.37 7.31 24 12 24z"
            />
            <path
              fill="#FBBC05"
              d="M5.28 14.29c-.25-.72-.38-1.49-.38-2.29s.13-1.57.38-2.29V6.58H1.27C.46 8.2 0 10.04 0 12s.46 3.8 1.27 5.42l4.01-3.13z"
            />
            <path
              fill="#EA4335"
              d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.25 2.63 1.27 6.58l4.01 3.13c.95-2.83 3.6-4.96 6.72-4.96z"
            />
          </svg>
          <span>Continue with Google</span>
        </button>
        <p className="text-center text-[11px] text-muted-foreground mt-2">
          {role === "member"
            ? "Google sign-in is available for Member accounts"
            : "Google sign-in is disabled for Manager accounts"}
        </p>
      </div> */}

      {/* Switch to Log in */}
      <div className="pt-2 text-center text-xs text-muted-foreground">
        Already have an account?{" "}
        <Link
          href="/login"
          className="font-medium text-primary hover:underline ml-1"
        >
          Log in
        </Link>
      </div>
    </div>
  );
};

export default RegistrationForm;
