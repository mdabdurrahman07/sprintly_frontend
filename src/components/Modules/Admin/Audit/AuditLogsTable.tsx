"use client";

import React, { useState, useEffect } from "react";
import { Search, ChevronDown, Loader2, Filter } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AuditLog } from "@/types/admin.types";
import { useGetAuditLogs } from "@/hooks/admin.hooks";

// ==========================================
// UTILS & HELPERS
// ==========================================

const ENTITY_OPTIONS = [
  { label: "All", value: "" },
  { label: "Project", value: "Project" },
  { label: "Payment", value: "Payment" },
  { label: "Task", value: "Task" },
  { label: "User", value: "User" },
  { label: "Subscription", value: "Subscription" },
];

// Generates avatar background colors based on user initials
const AVATAR_COLORS = [
  "bg-blue-100 text-blue-600 dark:bg-blue-500/20 dark:text-blue-400",
  "bg-zinc-900 text-white dark:bg-foreground dark:text-background",
  "bg-teal-100 text-teal-700 dark:bg-teal-500/20 dark:text-teal-400",
  "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400",
  "bg-indigo-100 text-indigo-700 dark:bg-indigo-500/20 dark:text-indigo-400",
];

function getAvatarStyle(name: string = "U") {
  const charCode = name.charCodeAt(0) || 0;
  return AVATAR_COLORS[charCode % AVATAR_COLORS.length];
}

function formatTimestamp(dateString: string) {
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return { dateStr: "N/A", timeStr: "" };

    const dateStr = new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    }).format(date);

    const timeStr = new Intl.DateTimeFormat("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
    }).format(date);

    return { dateStr, timeStr };
  } catch {
    return { dateStr: dateString, timeStr: "" };
  }
}

// Action badge styling map matching Sprintly design tokens
function getActionBadgeStyle(action: string) {
  const upper = action.toUpperCase();
  if (upper.includes("PAYMENT")) {
    return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-500/10 dark:text-blue-400 dark:border-blue-500/20";
  }
  if (upper.includes("CREATED") || upper.includes("RENEWED")) {
    return "bg-zinc-100 text-zinc-700 border-zinc-200 dark:bg-muted dark:text-foreground dark:border-border";
  }
  if (upper.includes("ASSIGNED") || upper.includes("STATUS")) {
    return "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-muted dark:text-muted-foreground dark:border-border";
  }
  return "bg-zinc-100 text-zinc-600 border-zinc-200 dark:bg-muted dark:text-muted-foreground dark:border-border";
}

// Truncates long IDs to match screenshot style: prj_88f01a...c92b
function formatEntityId(id: string) {
  if (!id) return "-";
  if (id.length <= 16) return id;
  return `${id.substring(0, 10)}...${id.substring(id.length - 4)}`;
}

// ==========================================
// MAIN COMPONENT
// ==========================================

export default function AuditLogsTable() {
  const [page, setPage] = useState(1);
  const [limit] = useState(8);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [selectedEntity, setSelectedEntity] = useState("");

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(searchTerm);
      setPage(1); // Reset page on search
    }, 400);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  // Fetch audit logs via provided hook
  const {
    data: response,
    isPending,
    isError,
  } = useGetAuditLogs({
    page,
    limit,
    searchTerm: debouncedSearch || undefined,
    entityType: selectedEntity || undefined,
  });

  const logs: AuditLog[] = response?.data || [];
  const meta = response?.meta;
  const total = meta?.total ?? 0;
  const totalPages = meta?.totalPages ?? 1;

  return (
    <div className="w-full rounded-3xl border border-zinc-200/90 bg-white shadow-xs dark:border-border dark:bg-card">
      {/* Table Header Controls */}
      <div className="flex flex-col gap-4 border-b border-zinc-100 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-border/50">
        {/* Title and Event Count Badge */}
        <div className="flex items-center gap-3">
          <h2 className="font-headline text-xl font-bold text-zinc-900 dark:text-foreground">
            Activity Log
          </h2>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-muted dark:text-muted-foreground">
            {total.toLocaleString()} events
          </span>
        </div>

        {/* Search & Entity Filter */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search logs..."
              className="h-9 w-full rounded-xl border-zinc-200 bg-white pl-9 text-xs focus-visible:ring-blue-600 dark:border-border dark:bg-card"
            />
          </div>

          {/* Entity Filter Dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger
              type="button"
              className="inline-flex items-center justify-center font-semibold rounded-full transition-all duration-150 active:translate-y-px disabled:opacity-50 disabled:pointer-events-none bg-transparent border border-border text-foreground hover:bg-accent text-xs px-3.5 py-1.5 h-9 rounded-xl border-zinc-200 shadow-2xs hover:bg-zinc-50 dark:border-border dark:text-foreground"
            >
              <span>Entity: {selectedEntity ? selectedEntity : "All"}</span>
              <ChevronDown className="ml-2 size-3.5 text-zinc-400" />
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="w-40 rounded-xl p-1 shadow-lg dark:border-border dark:bg-card"
            >
              {ENTITY_OPTIONS.map((option) => (
                <DropdownMenuItem
                  key={option.value}
                  onClick={() => {
                    setSelectedEntity(option.value);
                    setPage(1);
                  }}
                  className={`cursor-pointer rounded-lg px-3 py-2 text-xs font-medium ${
                    selectedEntity === option.value
                      ? "bg-blue-50 font-bold text-blue-600 dark:bg-primary/10 dark:text-primary"
                      : "text-zinc-700 hover:bg-zinc-100 dark:text-foreground dark:hover:bg-accent"
                  }`}
                >
                  {option.label}
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Table Section */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-212.5">
          <TableHeader>
            <TableRow className="border-b border-zinc-100 hover:bg-transparent dark:border-border/50">
              <TableHead className="w-12 px-6 py-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                #
              </TableHead>
              <TableHead className="py-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                ACTOR
              </TableHead>
              <TableHead className="py-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                ACTION
              </TableHead>
              <TableHead className="py-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                ENTITY
              </TableHead>
              <TableHead className="py-3.5 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                ENTITY ID
              </TableHead>
              <TableHead className="py-3.5 text-right px-6 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                TIMESTAMP
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell colSpan={6} className="h-40 text-center">
                  <Loader2 className="mx-auto size-6 animate-spin text-blue-600 dark:text-primary" />
                </TableCell>
              </TableRow>
            ) : isError ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-xs text-rose-500"
                >
                  Failed to load audit logs. Please try again.
                </TableCell>
              </TableRow>
            ) : logs.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-xs text-zinc-400"
                >
                  No activity logs found.
                </TableCell>
              </TableRow>
            ) : (
              logs.map((log, index) => {
                const rowNumber = (page - 1) * limit + index + 1;
                const { dateStr, timeStr } = formatTimestamp(log.createdAt);
                const actorName = log.actor?.name || "System User";
                const actorEmail = log.actor?.email || "";
                const initials = actorName
                  .split(" ")
                  .map((n) => n[0])
                  .join("")
                  .toUpperCase()
                  .slice(0, 2);

                return (
                  <TableRow
                    key={log.id}
                    className="border-b border-zinc-50 hover:bg-zinc-50/50 dark:border-border/20 dark:hover:bg-muted/10"
                  >
                    {/* Index */}
                    <TableCell className="px-6 py-4 text-xs font-medium text-zinc-400">
                      {rowNumber}
                    </TableCell>

                    {/* Actor Details */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-8 shrink-0 items-center justify-center rounded-full font-headline text-xs font-bold ${getAvatarStyle(
                            actorName,
                          )}`}
                        >
                          {initials}
                        </div>
                        <div className="flex flex-col min-w-0">
                          <span className="truncate text-xs font-bold text-zinc-900 dark:text-foreground">
                            {actorName}
                          </span>
                          <span className="truncate text-[11px] text-zinc-400 dark:text-muted-foreground">
                            {actorEmail}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Action Pill Badge */}
                    <TableCell className="py-4">
                      <span
                        className={`inline-flex items-center rounded-md border px-2.5 py-1 text-[11px] font-bold tracking-tight uppercase ${getActionBadgeStyle(
                          log.action,
                        )}`}
                      >
                        {log.action}
                      </span>
                    </TableCell>

                    {/* Entity Type */}
                    <TableCell className="py-4 font-bold text-xs text-zinc-800 dark:text-foreground">
                      {log.entityType}
                    </TableCell>

                    {/* Entity ID */}
                    <TableCell className="py-4 font-mono text-xs text-zinc-400">
                      {formatEntityId(log.entityId)}
                    </TableCell>

                    {/* Timestamp */}
                    <TableCell className="py-4 px-6 text-right">
                      <div className="flex flex-col items-end">
                        <span className="text-xs font-bold text-zinc-900 dark:text-foreground">
                          {dateStr}
                        </span>
                        <span className="text-[11px] text-zinc-400 font-mono">
                          {timeStr}
                        </span>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex flex-col gap-3 border-t border-zinc-100 px-6 py-4 sm:flex-row sm:items-center sm:justify-between dark:border-border/50">
        <span className="text-xs text-zinc-500 dark:text-muted-foreground">
          Showing{" "}
          <span className="font-bold text-zinc-900 dark:text-foreground">
            {(page - 1) * limit + 1}
          </span>{" "}
          to{" "}
          <span className="font-bold text-zinc-900 dark:text-foreground">
            {Math.min(page * limit, total)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-zinc-900 dark:text-foreground">
            {total.toLocaleString()}
          </span>{" "}
          logs
        </span>

        {/* Page Buttons */}
        <div className="flex items-center gap-1.5">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1 || isPending}
            className="h-8 rounded-lg border-zinc-200 px-3 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-border dark:text-foreground"
          >
            Previous
          </Button>

          {Array.from({ length: Math.min(3, totalPages) }, (_, i) => {
            const pageNum = i + 1;
            const isActive = page === pageNum;
            return (
              <Button
                key={pageNum}
                variant={isActive ? "primary" : "outline"}
                size="sm"
                onClick={() => setPage(pageNum)}
                className={`h-8 w-8 rounded-lg p-0 text-xs font-bold ${
                  isActive
                    ? "bg-blue-600 text-white hover:bg-blue-700 dark:bg-primary"
                    : "border-zinc-200 text-zinc-600 hover:bg-zinc-50 dark:border-border dark:text-foreground"
                }`}
              >
                {pageNum}
              </Button>
            );
          })}

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages || isPending}
            className="h-8 rounded-lg border-zinc-200 px-3 text-xs font-semibold text-zinc-600 hover:bg-zinc-50 dark:border-border dark:text-foreground"
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
