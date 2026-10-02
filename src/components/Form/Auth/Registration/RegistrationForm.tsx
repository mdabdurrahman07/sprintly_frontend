"use client";
import React, { useState } from "react";
import ManagerRegistrationForm from "./ManagerRegistrationForm";
import MemberRegistrationForm from "./MemberRegistrationForm";
import Link from "next/link";
import { FieldSeparator } from "@/components/ui/field";
import { User, Users } from "lucide-react";
import GoogleLoginBtn from "@/components/Modules/GoogleLogin/GoogleLoginBtn";

export type RoleType = "member" | "manager";

const RegistrationForm = () => {
  const [role, setRole] = useState<RoleType>("member");

  return (
    <div className="w-full space-y-2.5">
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
      <FieldSeparator className="mt-4 mb-2">Or continue with</FieldSeparator>

      {/* Google OAuth Section */}
      <div
        className={`transition-opacity duration-150 ${
          role === "manager" ? "opacity-40 pointer-events-none" : "opacity-100"
        }`}
      >
        <GoogleLoginBtn />
        <p className="text-center text-[11px] text-muted-foreground mt-2">
          {role === "member"
            ? "Google sign-in is available for Member accounts"
            : "Google sign-in is disabled for Manager accounts"}
        </p>
      </div>

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
