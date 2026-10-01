"use client"
import { Button } from "@/components/ui/button";
import { Field, FieldError } from "@/components/ui/field";
import { InputOTP, InputOTPGroup, InputOTPSlot } from "@/components/ui/input-otp";
import { useVerifyManager, useVerifyMember } from "@/hooks";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, ArrowRight, Lock, Mail } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

const RESEND_COOLDOWN = 120;

const VerifyAccountForm = ({
  mode = "member",
}: {
  mode?: "member" | "manager";
}) => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [otp, setOtp] = useState("");
  const [isInvalid, setIsInvalid] = useState(false);
  const [resendTimer, setResendTimer] = useState(RESEND_COOLDOWN);
  const { mutate: verifyMember, isPending: isPendingMember } =
    useVerifyMember();
  const { mutate: verifyManager, isPending: isPendingManager } =
    useVerifyManager();
  const verify = mode === "manager" ? verifyManager : verifyMember;
  const isSubmitting = isPendingMember || isPendingManager;

  const email = searchParams.get("email") || "";

  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);
  useEffect(() => {
    if (!email) {
      router.push("/");
    }
  }, [email, router]);

  useEffect(() => {
    if (resendTimer <= 0) return;

    const timer = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [resendTimer]);
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const handleOTP = () => {
    if (otp.length !== 6) {
      setIsInvalid(true);
      return;
    }

    const verifyData = {
      email,
      otp,
    };
    verify(verifyData, {
      onSuccess: (res) => {
        if (!res.success) {
          toast.error("Server Failure", {
            description: "Something went wrong. Please try again",
          });
          return;
        }

        if (mode === "manager") {
          toast.success("Verification Successful", {
            description: "Welcome onboard manager",
          });
          router.push("/");
          return;
        }

        toast.success("Verification Successful", {
          description: "Welcome onboard member",
        });
        router.push("/");
      },
      onError: (err) => {
        toast.error("Verification failure", {
          description: err?.message || "Something went wrong. Please try again",
        });
      },
    });
  };

  const handleResendCode = () => {
    if (resendTimer > 0) return;
    setResendTimer(RESEND_COOLDOWN);
    toast.success("Code Resent", {
      description:
        "A new 6-digit verification code has been sent to your email.",
    });
  };
  if (!email) {
    return null;
  }
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-background p-4 font-sans">
      {/* Main Container Card (Replaced Card Primitives with standard HTML elements styled to design system) */}
      <div className="w-full max-w-110 bg-card rounded-(--radius-xl) border border-border shadow-xs p-8 flex flex-col items-center">
        {/* Header Icon */}
        <div className="w-14 h-14 rounded-full bg-primary-subtle flex items-center justify-center mb-6">
          <Mail className="w-6 h-6 text-primary" />
        </div>

        {/* Title & Description */}
        <h1 className="text-2xl font-bold text-foreground tracking-tight mb-2">
          Verify your email
        </h1>
        <p className="text-muted-foreground text-sm text-center mb-8">
          We've sent a 6-digit verification code to
          <br />
          <span className="text-foreground font-semibold">{email}</span>
        </p>

        {/* Form and Input OTP */}
        <form
          id="otp-form"
          className="w-full flex flex-col items-center"
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            handleOTP();
          }}
        >
          <Field
            data-invalid={isInvalid}
            className="w-full flex flex-col items-center mb-4"
          >
            <InputOTP
              maxLength={6}
              value={otp}
              onChange={(value) => {
                setOtp(value);
                if (isInvalid) setIsInvalid(false);
              }}
              autoComplete="off"
              name="otp"
              id="otp"
              pattern={REGEXP_ONLY_DIGITS}
            >
              <InputOTPGroup className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((index) => (
                  <InputOTPSlot
                    key={index}
                    index={index}
                    className="w-12 h-14 text-lg font-semibold rounded-md border border-border bg-background focus:border-primary focus:ring-1 focus:ring-primary focus:ring-offset-0 transition-all text-center"
                  />
                ))}
              </InputOTPGroup>
            </InputOTP>

            {isInvalid && (
              <FieldError
                errors={[{ message: "Invalid Code. Please try again" }]}
                className="mt-2 text-center text-xs text-destructive font-medium"
              />
            )}
          </Field>

          {/* Sub-info */}
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground mb-6">
            <Lock className="w-3.5 h-3.5" />
            <span>Single-use authorization code</span>
          </div>

          {/* Resend Logic & Timer */}
          <div className="text-xs text-muted-foreground text-center mb-1">
            Didn't receive the code? Resend in{" "}
            <span className="text-foreground font-semibold">
              {formatTimer(resendTimer)}
            </span>
          </div>
          <button
            type="button"
            onClick={handleResendCode}
            disabled={resendTimer > 0}
            className="text-xs font-semibold text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed transition-colors mb-8 cursor-pointer"
          >
            Resend code
          </button>

          {/* Submit Action */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || otp.length !== 6}
          >
            {isSubmitting ? "Verifying..." : "Verify email"}
            {!isSubmitting && <ArrowRight className="w-4 h-4" />}
          </Button>
        </form>

        {/* Divider */}
        <div className="w-full h-px bg-border mb-6" />

        {/* Back Link */}
        <button
          type="button"
          onClick={() => router.push("/login")}
          className="text-xs font-medium text-muted-foreground hover:text-foreground flex items-center gap-2 transition-colors cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" /> Back to login
        </button>
      </div>

      {/* Footer Support Text */}
      <div className="mt-8 text-xs text-muted-foreground text-center">
        Can't access your inbox?{" "}
        <button
          type="button"
          onClick={() => router.push("/update-email")}
          className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          Update email address
        </button>{" "}
        or{" "}
        <button
          type="button"
          onClick={() => router.push("/support")}
          className="font-semibold text-foreground hover:text-primary transition-colors cursor-pointer"
        >
          contact IT support
        </button>
        .
      </div>
    </div>
  );
};

export default VerifyAccountForm;
