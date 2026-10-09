"use client";

import React, { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, Check, MoreHorizontal } from "lucide-react";
import { userRole, userStatus } from "@/types/user.types";
import { useGetAdminUsers, useUpdateUserStatus } from "@/hooks/admin.hooks";
import { AdminUser } from "@/types/admin.types";

// --- Helpers ---
const getInitials = (name: string) => {
  if (!name) return "U";
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();
};

const getRoleStyles = (role: userRole) => {
  switch (role) {
    case "MANAGER":
      return "bg-primary-subtle text-primary border border-primary/20";
    case "ADMIN":
      return "bg-foreground text-background border border-foreground";
    case "MEMBER":
    default:
      return "bg-muted text-muted-foreground border border-border";
  }
};

const getStatusStyles = (status: userStatus) => {
  switch (status) {
    case "ACTIVE":
      return {
        badge: "bg-success-subtle text-success-foreground border-success/30",
        dot: "bg-success",
        label: "Active",
      };
    case "BLOCKED":
      return {
        badge: "bg-warning-subtle text-warning-foreground border-warning/40",
        dot: "bg-warning",
        label: "Blocked",
      };
    case "DELETED":
      return {
        badge: "bg-muted text-muted-foreground border-border",
        dot: "bg-muted-foreground",
        label: "Deleted",
      };
    default:
      return {
        badge: "bg-muted text-muted-foreground border-border",
        dot: "bg-muted-foreground",
        label: status,
      };
  }
};

const getAvatarStyles = (role: userRole, index: number) => {
  if (role === "ADMIN") return "bg-foreground text-background";
  if (role === "MANAGER") return "bg-primary-subtle text-primary";

  // Rotating colors for members to match the colorful mockup
  const colors = [
    "bg-muted text-muted-foreground",
    "bg-warning-subtle text-warning-foreground",
    "bg-chart-4/10 text-chart-4",
    "bg-success-subtle text-success-foreground",
  ];
  return colors[index % colors.length];
};

// --- Sub-components ---

// Custom Dropdown for Status Change to avoid shadcn path dependency issues
const StatusDropdown = ({
  currentStatus,
  userId,
  onUpdate,
}: {
  currentStatus: userStatus;
  userId: string;
  onUpdate: (id: string, status: userStatus) => void;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const styles = getStatusStyles(currentStatus);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const statuses: { value: userStatus; label: string; dot: string }[] = [
    { value: "ACTIVE", label: "Active", dot: "bg-success" },
    { value: "BLOCKED", label: "Blocked", dot: "bg-warning" },
    { value: "DELETED", label: "Deleted", dot: "bg-muted-foreground" },
  ];

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors ${styles.badge} hover:opacity-80`}
      >
        <span className={`size-1.5 rounded-full ${styles.dot}`} />
        {styles.label}
        <ChevronDown className="size-3.5 opacity-70 ml-1" />
      </button>

      {isOpen && (
        <div className="absolute right-0 top-full mt-2 w-40 rounded-xl border border-border bg-popover p-1.5 shadow-md z-50 animate-in fade-in zoom-in-95">
          <div className="px-2 py-1.5 text-[10px] font-bold text-muted-foreground uppercase tracking-wider">
            Change Status
          </div>
          {statuses.map((s) => (
            <button
              key={s.value}
              onClick={() => {
                onUpdate(userId, s.value);
                setIsOpen(false);
              }}
              className={`w-full flex items-center justify-between px-2 py-2 text-xs font-medium rounded-md transition-colors ${
                currentStatus === s.value
                  ? "bg-primary-subtle text-primary"
                  : "text-foreground hover:bg-muted"
              }`}
            >
              <div className="flex items-center gap-2">
                <span className={`size-1.5 rounded-full ${s.dot}`} />
                {s.label}
              </div>
              {currentStatus === s.value && (
                <Check className="size-3.5 text-primary" />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

// --- Main Component ---
export default function AdminUsersTable() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<userRole | "All">("All");

  // Fetch users
  const { data: response, isLoading } = useGetAdminUsers({
    page,
    limit: 10,
    searchTerm: searchTerm || undefined,
    role: roleFilter !== "All" ? roleFilter : undefined,
  });

  // Mutate user status
  const updateStatusMutation = useUpdateUserStatus();

  const users: AdminUser[] = response?.data || [];
  const meta = response?.meta;

  const handleStatusChange = (userId: string, newStatus: userStatus) => {
    updateStatusMutation.mutate({
      id: userId,
      payload: { status: newStatus },
    });
  };

  return (
    <div className="flex flex-col h-full rounded-3xl border border-border bg-card shadow-sm w-full max-w-7xl mx-auto">
      {/* Header & Controls */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 border-b border-border gap-4">
        <div className="flex items-center gap-3">
          <h3 className="text-xl font-bold text-foreground">All Users</h3>
          <span className="px-2.5 py-1 rounded-full bg-muted text-xs font-semibold text-muted-foreground border border-border">
            {meta?.total || users.length} total
          </span>
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          {/* Search Input */}
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search by name or email..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset page on search
              }}
              className="w-full pl-9 pr-4 py-2 text-sm rounded-lg border border-border bg-background text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all"
            />
          </div>

          {/* Simple Role Filter */}
          <div className="relative">
            <select
              value={roleFilter}
              onChange={(e) => {
                const selectedRole = e.target.value;
                if (
                  selectedRole === "All" ||
                  selectedRole === "ADMIN" ||
                  selectedRole === "MANAGER" ||
                  selectedRole === "MEMBER"
                ) {
                  setRoleFilter(selectedRole);
                }
                setPage(1);
              }}
              className="appearance-none pl-3 pr-8 py-2 text-sm font-medium rounded-lg border border-border bg-background text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all cursor-pointer"
            >
              <option value="All">Role: All</option>
              <option value="ADMIN">Admin</option>
              <option value="MANAGER">Manager</option>
              <option value="MEMBER">Member</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none" />
          </div>
        </div>
      </div>

      {/* Table Area */}
      <div className="flex-1 overflow-x-auto min-h-100">
        <table className="w-full text-sm text-left whitespace-nowrap">
          <thead className="text-[11px] font-bold text-muted-foreground bg-card uppercase tracking-wider border-b border-border">
            <tr>
              <th className="px-6 py-4 w-16">#</th>
              <th className="px-6 py-4">User</th>
              <th className="px-6 py-4">Email</th>
              <th className="px-6 py-4">Role</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground animate-pulse"
                >
                  Loading users...
                </td>
              </tr>
            ) : users.length === 0 ? (
              <tr>
                <td
                  colSpan={5}
                  className="px-6 py-8 text-center text-muted-foreground"
                >
                  No users found matching your criteria.
                </td>
              </tr>
            ) : (
              users.map((user, index) => {
                const avatarStyle = getAvatarStyles(user.role, index);
                const roleStyle = getRoleStyles(user.role);
                // Calculate display number based on pagination
                const displayIndex =
                  ((meta?.page || 1) - 1) * (meta?.limit || 10) + index + 1;

                return (
                  <tr
                    key={user.id}
                    className="hover:bg-muted/30 transition-colors group"
                  >
                    <td className="px-6 py-4 text-muted-foreground font-medium text-xs">
                      {displayIndex}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div
                          className={`flex size-9 items-center justify-center rounded-full text-xs font-bold shadow-sm ${avatarStyle}`}
                        >
                          {getInitials(user.name)}
                        </div>
                        <span className="font-semibold text-foreground text-[14px]">
                          {user.name}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-muted-foreground">
                      {user.email}
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase ${roleStyle}`}
                      >
                        {user.role}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <StatusDropdown
                        currentStatus={user.status}
                        userId={user.id}
                        onUpdate={handleStatusChange}
                      />
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Footer / Pagination */}
      <div className="flex items-center justify-between p-6 border-t border-border bg-card/50 rounded-b-3xl">
        <span className="text-xs font-medium text-muted-foreground">
          Showing{" "}
          <span className="font-bold text-foreground">
            {users.length ? 1 + (page - 1) * (meta?.limit || 10) : 0}
          </span>{" "}
          to{" "}
          <span className="font-bold text-foreground">
            {Math.min(page * (meta?.limit || 10), meta?.total || 0)}
          </span>{" "}
          of{" "}
          <span className="font-bold text-foreground">{meta?.total || 0}</span>{" "}
          users
        </span>

        <div className="flex items-center gap-1">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Previous
          </button>

          {/* Simple dummy pagination array for UI completeness matching the design */}
          {[1, 2, 3].map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`size-7 flex items-center justify-center rounded-md text-xs font-bold transition-colors ${
                page === p
                  ? "bg-primary text-white shadow-sm"
                  : "text-muted-foreground hover:bg-muted"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => p + 1)}
            disabled={!meta || page >= meta.totalPages}
            className="px-3 py-1.5 text-xs font-semibold text-muted-foreground border border-border rounded-md hover:bg-muted transition-colors disabled:opacity-50 disabled:pointer-events-none"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
