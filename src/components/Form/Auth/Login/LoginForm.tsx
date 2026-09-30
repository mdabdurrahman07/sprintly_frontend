"use client";
import { LoginSchema } from "@/validators/auth.validators";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { FieldSeparator } from "@/components/ui/field";
import z from "zod";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Mail, Lock, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type LoginFormValues = z.infer<typeof LoginSchema>;

const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    } as LoginFormValues,
    validators: {
      onSubmit: LoginSchema,
    },
    onSubmit: async ({ value }) => {
      console.log("Member Registration Payload:", value);
    },
  });
  return (
    <div className="w-full space-y-2.5">
      <div className="text-left">
        <h2 className="text-2xl lg:text-[28px] font-bold text-foreground tracking-tight">
          Login into your account
        </h2>
        <p className="text-sm text-muted-foreground mt-1.5">
          Start managing projects the easy way
        </p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-4"
      >
        <FieldGroup>
          {/* Email */}
          <form.Field name="email">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Email address</FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Mail className="w-4 h-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="email"
                      placeholder="name@company.com"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pl-10 rounded-xl bg-background"
                    />
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Password */}
          <form.Field name="password">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Lock className="w-4 h-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      className="pl-10 pr-10 rounded-xl bg-background"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                    >
                      {showPassword ? (
                        <EyeOff className="w-4 h-4" />
                      ) : (
                        <Eye className="w-4 h-4" />
                      )}
                    </button>
                  </div>
                  {isInvalid && <FieldError errors={field.state.meta.errors} />}
                </Field>
              );
            }}
          </form.Field>

          {/* Submit Button */}
          <div className="pt-2">
            <Button
              type="submit"
              className="w-full py-3 px-6 rounded-full bg-primary hover:bg-primary-hover text-primary-foreground font-medium text-sm shadow-xs transition-all duration-150 flex items-center justify-center gap-2 h-auto cursor-pointer"
            >
              <span>Login</span>
              <ArrowRight className="w-4 h-4" />
            </Button>
          </div>
        </FieldGroup>
      </form>

      <FieldSeparator className="mt-4 mb-2">Or continue with</FieldSeparator>

      <div className="pt-2 text-center text-xs text-muted-foreground">
        Don't have an account?{" "}
        <Link
          href="/registration"
          className="font-medium text-primary hover:underline ml-1"
        >
          Register
        </Link>
      </div>
    </div>
  );
};

export default LoginForm;
