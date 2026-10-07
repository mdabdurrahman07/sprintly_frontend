"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { toast } from "sonner";
import {
  Search,
  Paperclip,
  Users,
  Pencil,
  Trash2,
  X,
  Plus,
  Rocket,
  CreditCard,
  Smartphone,
  CheckSquare,
  RefreshCw,
  LayoutTemplate,
  Loader2,
} from "lucide-react";

import {
  useGetProjects,
  useDeleteProject,
  useUpdateProject,
  useRemoveProjectMember,
} from "@/hooks/project.hooks";
import { ProjectSummary } from "@/types/project.types";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { NO_TASK_MESSAGE } from "@/validators/task.validators";
import { AddMemberDialog } from "../AddMemberDialog/AddMemberDialog";

// ! SCHEMAS & UTILS

const ProjectUpdateSchema = z.object({
  name: z.string().min(1, "Project name is required"),
  description: z.string().optional(),
});


interface ProjectMember {
  id: string;
  name?: string | null;
  jobTitle?: string;
  avatarUrl?: string;
}

const PROJECT_ICONS = [
  { icon: Rocket, bg: "bg-blue-50", text: "text-blue-600" },
  { icon: CreditCard, bg: "bg-amber-50", text: "text-amber-600" },
  { icon: Smartphone, bg: "bg-purple-50", text: "text-purple-600" },
  { icon: CheckSquare, bg: "bg-emerald-50", text: "text-emerald-600" },
  { icon: RefreshCw, bg: "bg-rose-50", text: "text-rose-600" },
  { icon: LayoutTemplate, bg: "bg-indigo-50", text: "text-indigo-600" },
];

// ! SUB-COMPONENT

function UpdateProjectDialog({
  project,
  isOpen,
  setIsOpen,
}: {
  project: ProjectSummary;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const updateMutation = useUpdateProject();

  const form = useForm({
    defaultValues: {
      name: project.name || "",
      description: project.description || "",
    },
    validators: {
      onChange: ({ value }) => {
        const result = ProjectUpdateSchema.safeParse(value);
        return result.success ? undefined : result.error;
      },
    },
    onSubmit: async ({ value }) => {
      // Using standard payload object matching ProjectUpdatePayload type
      updateMutation.mutate(
        { id: project.id, payload: value },
        {
          onSuccess: () => {
            form.reset();
            setIsOpen(false);
            toast.success("Project updated successfully");
          },
          onError: () => {
            toast.error("Failed to update project");
          },
        },
      );
    },
  });

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md rounded-3xl bg-white p-6 shadow-xl dark:border-border dark:bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl font-bold">
            Update Project
          </DialogTitle>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-4 flex flex-col gap-4"
        >
          <form.Field
            name="name"
            children={(field) => (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-foreground">
                  Project Name
                </Label>
                <Input
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Core Roadmap"
                  className="rounded-xl"
                />
                {field.state.meta.errors ? (
                  <span className="text-xs text-rose-500">
                    {field.state.meta.errors.join(", ")}
                  </span>
                ) : null}
              </div>
            )}
          />

          <form.Field
            name="description"
            children={(field) => (
              <div className="flex flex-col gap-1.5">
                <Label className="text-xs font-bold text-zinc-700 dark:text-foreground">
                  Description / Sprint Info
                </Label>
                <Textarea
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Sprint 24 - Product platform"
                  className="min-h-20 resize-none rounded-xl"
                />
              </div>
            )}
          />

          <div className="mt-4 flex justify-end gap-3 pt-4 border-t border-zinc-100">
            <Button
              type="button"
              variant="outline"
              onClick={() => setIsOpen(false)}
              className="rounded-full px-6"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={updateMutation.isPending}
              className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700"
            >
              {updateMutation.isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

function MembersPopover({ project }: { project: ProjectSummary }) {
  const removeMemberMutation = useRemoveProjectMember();
  const [popoverOpen, setPopoverOpen] = useState(false);
  const [addOpen, setAddOpen] = useState(false);
  const members = (project.members || []) as unknown as ProjectMember[];

  const handleRemove = (memberId: string) => {
    removeMemberMutation.mutate(
      { projectId: project.id, memberId },
      {
        onSuccess: () => toast.success("Member removed from project"),
        onError: () => toast.error("Failed to remove member"),
      },
    );
  };

  const handleAddClick = () => {
    if (!project.tasks || project.tasks.length === 0) {
      toast.error(NO_TASK_MESSAGE);
      return;
    }
    setPopoverOpen(false);
    setAddOpen(true);
  };

  return (
    <>
      <Popover open={popoverOpen} onOpenChange={setPopoverOpen}>
        <PopoverTrigger
          render={
            <Button
              variant="outline"
              className="h-9 rounded-full border-zinc-200 px-4 text-xs font-semibold text-zinc-700 shadow-2xs hover:bg-zinc-50"
            >
              <Users className="mr-2 size-4 text-zinc-400" />
              {members.length} members
            </Button>
          }
        />
        <PopoverContent
          className="w-80 rounded-2xl p-4 shadow-xl"
          align="center"
        >
          {/* ...header and members list unchanged... */}

          <Button
            variant="outline"
            onClick={handleAddClick}
            className="mt-4 w-full rounded-xl border-dashed border-blue-200 bg-transparent text-blue-600 hover:bg-blue-50 hover:text-blue-700"
          >
            <Plus className="mr-2 size-4" /> Add member
          </Button>
        </PopoverContent>
      </Popover>

      {addOpen && (
        <AddMemberDialog
          project={project}
          isOpen={addOpen}
          setIsOpen={setAddOpen}
        />
      )}
    </>
  );
}

// ! MAIN COMPONENT

export default function ProjectTable() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");
  const [editingProject, setEditingProject] = useState<ProjectSummary | null>(
    null,
  );

  const deleteMutation = useDeleteProject();

  // Debounce search input
  useEffect(() => {
    const handler = setTimeout(() => setDebouncedSearch(searchTerm), 500);
    return () => clearTimeout(handler);
  }, [searchTerm]);

  const { data, isPending } = useGetProjects({
    page,
    limit: 6,
    searchTerm: debouncedSearch,
  });

  // Extract array directly based on API response structure
  const projects = (data?.data as ProjectSummary[]) || [];
  const totalCount = 12; // Example static count. Adjust based on your API meta response (e.g., data?.meta?.total)

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this project?")) {
      deleteMutation.mutate(id, {
        onSuccess: () => toast.success("Project deleted successfully"),
        onError: () => toast.error("Failed to delete project"),
      });
    }
  };

  return (
    <div className="w-full rounded-3xl border border-zinc-200 bg-white shadow-xs dark:border-border dark:bg-card">
      {/* Table Header Controls */}
      <div className="flex flex-col gap-4 border-b border-zinc-100 p-6 sm:flex-row sm:items-center sm:justify-between dark:border-border/50">
        <div className="flex items-center gap-3">
          <h2 className="font-headline text-xl font-bold text-zinc-900 dark:text-foreground">
            All Projects
          </h2>
          <span className="rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-600 dark:bg-muted dark:text-muted-foreground">
            {projects.length} shown
          </span>
        </div>
        <div className="relative w-full sm:w-64">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-zinc-400" />
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Filter projects..."
            className="h-10 w-full rounded-full border-zinc-200 pl-10 text-sm focus-visible:ring-blue-600 dark:border-border"
          />
        </div>
      </div>

      {/* Table Data */}
      <div className="w-full overflow-x-auto">
        <Table className="min-w-225">
          <TableHeader>
            <TableRow className="border-b border-zinc-100 hover:bg-transparent dark:border-border/50">
              <TableHead className="w-12 px-6 py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                #
              </TableHead>
              <TableHead className="py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Project
              </TableHead>
              <TableHead className="py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Files
              </TableHead>
              <TableHead className="py-4 text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Members
              </TableHead>
              <TableHead className="w-24 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Update
              </TableHead>
              <TableHead className="w-24 py-4 text-center text-[11px] font-bold uppercase tracking-wider text-zinc-400">
                Delete
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isPending ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-zinc-500"
                >
                  <Loader2 className="mx-auto size-6 animate-spin text-blue-600" />
                </TableCell>
              </TableRow>
            ) : projects.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="h-32 text-center text-zinc-500"
                >
                  No projects found.
                </TableCell>
              </TableRow>
            ) : (
              projects.map((project, index) => {
                const iconConf = PROJECT_ICONS[index % PROJECT_ICONS.length];
                const Icon = iconConf.icon;

                return (
                  <TableRow
                    key={project.id}
                    className="group border-b border-zinc-50 hover:bg-zinc-50/50 dark:border-border/20 dark:hover:bg-muted/10"
                  >
                    {/* Index */}
                    <TableCell className="px-6 py-4 text-sm text-zinc-400 font-medium">
                      {(page - 1) * 6 + index + 1}
                    </TableCell>

                    {/* Project Info */}
                    <TableCell className="py-4">
                      <div className="flex items-center gap-4">
                        <div
                          className={`flex size-10 shrink-0 items-center justify-center rounded-xl ${iconConf.bg} ${iconConf.text}`}
                        >
                          <Icon className="size-5" />
                        </div>
                        <div className="flex flex-col">
                          <span className="font-bold text-zinc-900 dark:text-foreground">
                            {project.name}
                          </span>
                          <span className="text-xs text-zinc-500 dark:text-muted-foreground line-clamp-1">
                            {project.description?.slice(0, 65) ||
                              "No description provided"}
                          </span>
                        </div>
                      </div>
                    </TableCell>

                    {/* Files */}
                    <TableCell className="py-4">
                      <div className="inline-flex items-center gap-1.5 rounded-full bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-600 border border-zinc-100 dark:bg-muted dark:border-border dark:text-muted-foreground">
                        <Paperclip className="size-3.5 text-zinc-400" />
                        {project.additionalFiles?.length || 0} files
                      </div>
                    </TableCell>

                    {/* Members (Popover Trigger) */}
                    <TableCell className="py-4">
                      <MembersPopover project={project} />
                    </TableCell>

                    {/* Update Action */}
                    <TableCell className="py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setEditingProject(project)}
                        className="rounded-xl border border-zinc-200/60 bg-white text-zinc-500 shadow-2xs hover:bg-zinc-100 hover:text-zinc-900 dark:border-border dark:bg-card dark:hover:bg-muted"
                      >
                        <Pencil className="size-4" />
                      </Button>
                    </TableCell>

                    {/* Delete Action */}
                    <TableCell className="py-4 text-center">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDelete(project.id)}
                        disabled={deleteMutation.isPending}
                        className="rounded-xl border border-zinc-200/60 bg-white text-zinc-500 shadow-2xs hover:bg-rose-50 hover:text-rose-600 hover:border-rose-100 dark:border-border dark:bg-card"
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              })
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination Footer */}
      <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4 dark:border-border/50">
        <span className="text-sm text-zinc-500 dark:text-muted-foreground">
          {/* Showing {(page - 1) * 6 + 1} to Math.min(page * 6, totalCount) of {totalCount} projects */}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="rounded-lg border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-semibold"
          >
            Previous
          </Button>

          <Button
            variant="outline"
            size="sm"
            className="rounded-lg bg-zinc-100 border-transparent font-bold"
          >
            1
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="rounded-lg border-zinc-200 text-zinc-600 font-semibold hidden sm:inline-flex"
          >
            2
          </Button>

          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            className="rounded-lg border-zinc-200 text-zinc-600 hover:bg-zinc-50 font-semibold"
          >
            Next
          </Button>
        </div>
      </div>

      {/* Edit Dialog Mount */}
      {editingProject && (
        <UpdateProjectDialog
          project={editingProject}
          isOpen={!!editingProject}
          setIsOpen={(open) => !open && setEditingProject(null)}
        />
      )}
    </div>
  );
}
