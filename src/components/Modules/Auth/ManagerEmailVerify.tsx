"use client"
import React, { useState } from "react";
import { Mail, Lock, ArrowRight, ArrowLeft } from 'lucide-react';
import Link from "next/link";
import { Button } from "@/components/ui/button";

const ManagerEmailVerify = () => {
  const [otp] = useState(["4", "8", "", "", "", ""]);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 font-sans">
      {/* Main Verification Card */}
      <div className="w-full max-w-110 bg-card rounded-xl border border-border shadow-sm p-8 flex flex-col items-center">
        {/* Icon Header */}
        <div className="w-14 h-14 rounded-full bg-primary-subtle flex items-center justify-center mb-6">
          <Mail className="w-6 h-6 text-primary" />
        </div>

        {/* Typography */}
        <h1 className="text-2xl font-bold text-foreground mb-2">
          Verify your email
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          We've sent a 6-digit verification code to
          <br />
          <span className="text-foreground font-medium">
            alex.morgan@company.com
          </span>
        </p>

        {/* OTP Input Group */}
        <div className="flex gap-2 mb-4 w-full justify-center">
          {otp.map((digit, index) => {
            const isActive = index === 2; // Simulating the active 3rd input from the screenshot

            return (
              <div
                key={index}
                className={`relative flex items-center justify-center w-12 h-14 rounded-md border text-lg font-semibold bg-background
                  ${
                    isActive
                      ? "border-primary ring-1 ring-primary ring-offset-0 text-foreground"
                      : "border-input text-foreground"
                  }
                `}
              >
                {digit ? (
                  digit
                ) : (
                  // Placeholder dot for empty inputs
                  <span
                    className={isActive ? "hidden" : "text-muted/40 text-xl"}
                  >
                    •
                  </span>
                )}

                {/* Simulated blinking cursor for the active input */}
                {isActive && (
                  <div className="absolute w-0.5 h-6 bg-primary animate-pulse rounded-full" />
                )}
              </div>
            );
          })}
        </div>

        {/* Authorization Note */}
        <div className="flex items-center gap-1.5 text-[13px] text-muted-foreground mb-8">
          <Lock className="w-3.5 h-3.5" />
          <span>Single-use authorization code</span>
        </div>


        {/* Primary Action Button */}
        <Button size="lg" className="my-2.5">
            Verify email <ArrowRight className="w-4 h-4" />
        </Button>

        {/* Divider */}
        <div className="w-full h-px bg-border/50 mb-6" />

        {/* Back Link */}
        <Link href="/login" className="text-[13px] font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors">
          <ArrowLeft className="w-4 h-4" /> Back to login
        </Link>
      </div>

      {/* Footer Support Text */}
      <div className="mt-8 text-[13px] text-muted-foreground text-center">
        Can't access your inbox?{" "}
        <button className="font-semibold text-foreground hover:text-primary transition-colors">
          Update email address
        </button>{" "}
        or{" "}
        <button className="font-semibold text-foreground hover:text-primary transition-colors">
          contact IT support
        </button>
        .
      </div>
    </div>
  );
};

export default ManagerEmailVerify;
