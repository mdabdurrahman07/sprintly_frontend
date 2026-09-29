import * as React from "react";

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "primary" | "secondary" | "success" | "warning" | "destructive" | "outline";
}

export function Badge({
  variant = "primary",
  className = "",
  children,
  ...props
}: BadgeProps) {
  const variants = {
    primary: "bg-primary-subtle text-primary-subtle-foreground border-primary-border",
    secondary: "bg-muted text-muted-foreground border-border",
    success: "bg-success-subtle text-success-foreground border-success/20",
    warning: "bg-warning-subtle text-warning-foreground border-warning/20",
    destructive: "bg-destructive/10 text-destructive border-destructive/20",
    outline: "bg-transparent text-foreground border-border",
  };

  return (
    <span
      className={`inline-flex items-center text-xs font-semibold px-2.5 py-0.5 rounded-full border ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </span>
  );
}