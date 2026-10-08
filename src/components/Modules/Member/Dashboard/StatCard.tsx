import React from "react";
import { LucideIcon } from "lucide-react";

interface StatCardProps {
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
  pillText: string;
  pillColor: string;
  value: string | number;
  label: string;
  children?: React.ReactNode;
}

export function StatCard({
  icon: Icon,
  iconBg,
  iconColor,
  pillText,
  pillColor,
  value,
  label,
  children,
}: StatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`flex size-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          <Icon className="size-5" />
        </div>
        <div className={`rounded-full px-3 py-1 text-xs font-medium ${pillColor}`}>
          {pillText}
        </div>
      </div>
      <div className="flex items-end justify-between">
        <div>
          <h2 className="text-3xl font-bold text-foreground">{value}</h2>
          <p className="text-sm text-muted-foreground">{label}</p>
        </div>
        {children}
      </div>
    </div>
  );
}