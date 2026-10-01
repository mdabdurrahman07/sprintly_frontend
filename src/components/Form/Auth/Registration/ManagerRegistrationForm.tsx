"use client";
import { ManagerRegisterPayloadSchema } from "@/validators/auth.validators";
import { useForm } from "@tanstack/react-form";
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import {
  User,
  Mail,
  Lock,
  Building,
  Phone,
  Link as LinkIcon,
  FileText,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import { useManagerRegistration } from "@/hooks";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const managerFormSchema = ManagerRegisterPayloadSchema.extend({
  confirmPassword: z.string().min(8, "Please confirm your password"),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ManagerDefaultValues = z.infer<typeof managerFormSchema>;

const ManagerRegistrationForm = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { mutate: managerRegister, isPending: memberRegisterPending } =
    useManagerRegistration();

  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      manager: {
        bio: "",
        department: "",
        phoneNumber: "",
      },
    } as ManagerDefaultValues,
    validators: {
      onSubmit: managerFormSchema,
    },
    onSubmit: async ({ value }) => {
      const { confirmPassword, ...payload } = value;
      managerRegister(payload, {
        onSuccess: (res) => {
          if (!res.success) {
            toast.error("Server Failure", {
              description: "Something went wrong. Please try again",
            });
          }
          toast.success("Registration Successful", {
            description: "Please verify your account",
          });
          const params = new URLSearchParams({ email: payload.email });
          router.push(`/manager-verify?${params.toString()}`);
        },
        onError: (err) => {
          toast.error("Authorization failure", {
            description:
              err.message || "Something went wrong. Please try again",
          });
        },
      });
    },
  });
  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
        form.handleSubmit();
      }}
      className="space-y-4"
    >
      <FieldGroup>
        {/* Name */}
        <form.Field name="name">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Full name</FieldLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <User className="w-4 h-4" />
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="text"
                    placeholder="e.g. Sarah Connor"
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

        {/* Email */}
        <form.Field name="email">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Work email</FieldLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Mail className="w-4 h-4" />
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type="email"
                    placeholder="sarah@company.com"
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

        {/* Department & Phone Number Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {/* Department */}
          <form.Field name="manager.department">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Department</FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Building className="w-4 h-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="text"
                      placeholder="e.g. Engineering"
                      value={field.state.value ?? ""}
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

          {/* Phone Number */}
          <form.Field name="manager.phoneNumber">
            {(field) => {
              const isInvalid =
                field.state.meta.isTouched && !field.state.meta.isValid;
              return (
                <Field data-invalid={isInvalid}>
                  <FieldLabel htmlFor={field.name}>Phone number</FieldLabel>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                      <Phone className="w-4 h-4" />
                    </div>
                    <Input
                      id={field.name}
                      name={field.name}
                      type="tel"
                      placeholder="+1 (555) 000-0000"
                      value={field.state.value ?? ""}
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
        </div>

        {/* Bio */}
        <form.Field name="manager.bio">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Short Bio</FieldLabel>
                <div className="relative">
                  <div className="absolute top-3 left-3.5 flex items-start pointer-events-none text-muted-foreground">
                    <FileText className="w-4 h-4" />
                  </div>
                  <textarea
                    id={field.name}
                    name={field.name}
                    rows={2}
                    placeholder="Brief intro about your role and responsibilities..."
                    value={field.state.value ?? ""}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    className="w-full pl-10 pr-3.5 py-2 text-sm bg-background border border-input rounded-xl text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring/20 focus:border-primary transition-all resize-none"
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

        {/* Confirm Password */}
        <form.Field name="confirmPassword">
          {(field) => {
            const isInvalid =
              field.state.meta.isTouched && !field.state.meta.isValid;
            return (
              <Field data-invalid={isInvalid}>
                <FieldLabel htmlFor={field.name}>Confirm password</FieldLabel>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-muted-foreground">
                    <Lock className="w-4 h-4" />
                  </div>
                  <Input
                    id={field.name}
                    name={field.name}
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    aria-invalid={isInvalid}
                    className="pl-10 pr-10 rounded-xl bg-background"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none"
                  >
                    {showConfirmPassword ? (
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
            disabled={memberRegisterPending}
            type="submit"
            className="w-full"
          >
            {memberRegisterPending ? (
              <div className="w-8 h-8 rounded-full border-2 border-zinc-200 border-t-blue-600 animate-spin" />
            ) : (
              <div className="flex items-center justify-center gap-4">
                <span>Create manager account</span>
                <ArrowRight className="w-4 h-4" />
              </div>
            )}
          </Button>
        </div>
      </FieldGroup>
    </form>
  );
};

export default ManagerRegistrationForm;
