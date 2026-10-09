import React from "react";
import { CreditCard, Users, Briefcase, User } from "lucide-react";
import type { AdminAnalytics } from "@/types/admin.types";

interface AdminStatCardProps {
  icon: React.ElementType;
  iconBg: string;
  iconColor: string;
  pillContent: React.ReactNode;
  pillColor: string;
  value: string | number;
  label: string;
  children?: React.ReactNode;
}

export function AdminStatCard({
  icon: Icon,
  iconBg,
  iconColor,
  pillContent,
  pillColor,
  value,
  label,
  children,
}: AdminStatCardProps) {
  return (
    <div className="flex flex-col justify-between rounded-3xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between mb-4">
        <div className={`flex size-10 items-center justify-center rounded-xl ${iconBg} ${iconColor}`}>
          <Icon className="size-5" />
        </div>
        <div className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium ${pillColor}`}>
          {pillContent}
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

interface AdminStatCardsGroupProps {
  analytics?: AdminAnalytics;
  isLoading: boolean;
}

export function AdminStatCardsGroup({
  analytics,
  isLoading,
}: AdminStatCardsGroupProps) {
  const displayCount = (value: number | undefined) =>
    isLoading ? "..." : value?.toLocaleString("en-BD") ?? "—";

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Revenue Card */}
      <AdminStatCard
        icon={CreditCard} iconBg="bg-primary-subtle" iconColor="text-primary"
        pillContent={<>Total</>} pillColor="bg-success-subtle text-success-foreground"
        value={
          isLoading
            ? "..."
            : analytics
              ? `৳${analytics.totalAmount.toLocaleString("en-BD")}`
              : "—"
        }
        label="Total Revenue"
      >
        <svg className="w-16 h-8 stroke-primary stroke-2 fill-none" viewBox="0 0 50 20">
          <polyline points="0,15 10,12 20,14 30,8 40,10 50,2" />
        </svg>
      </AdminStatCard>

      {/* Members Card */}
      <AdminStatCard
        icon={Users} iconBg="bg-primary-subtle" iconColor="text-primary"
        pillContent="Total" pillColor="bg-primary-subtle text-primary"
        value={displayCount(analytics?.totalMembers)} label="Total Members"
      >
      </AdminStatCard>

      {/* Managers Card */}
      <AdminStatCard
        icon={Briefcase} iconBg="bg-chart-4/10" iconColor="text-chart-4"
        pillContent="Total" pillColor="bg-chart-4/10 text-chart-4"
        value={displayCount(analytics?.totalManagers)} label="Total Managers"
      >
        
      </AdminStatCard>

      {/* Users Card */}
      <AdminStatCard
        icon={User} iconBg="bg-muted" iconColor="text-muted-foreground"
        pillContent={<><span className="size-1.5 rounded-full bg-success"></span> Active</>} pillColor="border border-border text-success-foreground"
        value={displayCount(analytics?.usersCount)} label="Total Users"
      >
        <div className="size-8 rounded-full border-2 border-success/30 flex items-center justify-center">
          <div className="size-4 rounded-full bg-success"></div>
        </div>
      </AdminStatCard>
    </div>
  );
}