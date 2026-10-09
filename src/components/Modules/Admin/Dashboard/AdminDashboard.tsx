"use client";

import React, { useState } from "react";

import { useGetAdminAnalytics, useGetAdminProjects } from "@/hooks/admin.hooks";
import { AdminStatCardsGroup } from "./AdminStatCards";
import { AdminProjectsTable } from "./AdminProjectsTable";
import { MemberDashboardCalendar } from "../../Member/Dashboard/MemberDashboardCalendar";

export default function AdminDashboard() {
  const [page, setPage] = useState(1);
  const { data: response, isLoading } = useGetAdminProjects({ page, limit: 6 });
  const {
    data: adminAnalytics,
    isLoading: adminAnalyticsLoading,
  } = useGetAdminAnalytics();

  const projects = response?.data || [];
  const meta = response?.meta;

  return (
    <div className="flex flex-col gap-6 w-full max-w-7xl mx-auto p-4 md:p-6">
      {/* 4 Top Metric Cards */}
    <AdminStatCardsGroup
      analytics={adminAnalytics?.data}
      isLoading={adminAnalyticsLoading}
    />

      {/* Main Grid: Projects Table + Calendar Component */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Table takes up 8 columns (2/3 width) */}
        <div className="lg:col-span-8 h-full">
          <AdminProjectsTable
            projects={projects}
            meta={meta}
            isLoading={isLoading}
          />
        </div>

        {/* Calendar takes up 4 columns (1/3 width) */}
        <div className="lg:col-span-4 h-full">
          <MemberDashboardCalendar />
        </div>
      </div>
    </div>
  );
}
