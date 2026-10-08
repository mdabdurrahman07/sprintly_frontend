"use client";

import Link from "next/link";
import {
  Check,
  ChevronDown,
  Filter,
  Layers,
  Plus,
  PlusCircle,
} from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { PRIORITY_LABELS, getInitials, getProjectProgress } from "@/lib/kanban";
import { cn } from "@/lib/utils";
import type { ProjectSummary } from "@/types/project.types";
import {
  TASK_PRIORITIES,
  type TaskAssignee,
  type TaskPriority,
} from "@/types/task.types";

const MAX_VISIBLE_ASSIGNEES = 4;

interface KanbanHeaderProps {
  projects: readonly ProjectSummary[];
  /** `null` means "all projects" (members) or "nothing selected yet". */
  selectedProjectId: string | null;
  /** Members can view tasks from every project at once. */
  allowAllProjects: boolean;
  onProjectChange: (projectId: string | null) => void;
  assignees: readonly TaskAssignee[];
  priorityFilter: readonly TaskPriority[];
  onPriorityFilterChange: (next: TaskPriority[]) => void;
  onAddTaskClick: () => void;
  isSyncing: boolean;
  /** When set, the dropdown offers a "Create new project" link. */
  createProjectHref?: string;
}

export function KanbanHeader({
  projects,
  selectedProjectId,
  allowAllProjects,
  onProjectChange,
  assignees,
  priorityFilter,
  onPriorityFilterChange,
  onAddTaskClick,
  isSyncing,
  createProjectHref,
}: KanbanHeaderProps) {
  const selectedProject =
    projects.find((project) => project.id === selectedProjectId) ?? null;
  const triggerTitle = selectedProject?.name ?? "All projects";
  const boardTitle = selectedProject
    ? `${selectedProject.name} board`
    : "My tasks";
  const visibleAssignees = assignees.slice(0, MAX_VISIBLE_ASSIGNEES);
  const hiddenAssigneeCount = assignees.length - visibleAssignees.length;

  const togglePriority = (priority: TaskPriority, checked: boolean) => {
    onPriorityFilterChange(
      checked
        ? [...priorityFilter, priority]
        : priorityFilter.filter((current) => current !== priority),
    );
  };

  return (
    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
      <div className="flex flex-wrap items-center gap-4">
        <DropdownMenu>
          <DropdownMenuTrigger className="flex items-center gap-3 rounded-2xl border border-border bg-card px-3.5 py-2 text-left shadow-xs transition-colors hover:bg-accent focus-visible:ring-2 focus-visible:ring-ring">
            <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary-subtle font-heading text-xs font-bold text-primary-subtle-foreground">
              {selectedProject ? (
                getInitials(selectedProject.name)
              ) : (
                <Layers className="size-4" />
              )}
            </span>
            <span className="flex max-w-48 flex-col pr-1">
              <span className="truncate text-xs font-bold leading-tight text-foreground">
                {triggerTitle}
              </span>
              <span className="text-[11px] leading-tight text-muted-foreground">
                {selectedProject
                  ? `${selectedProject.tasks.length} tasks`
                  : `${projects.length} projects`}
              </span>
            </span>
            <ChevronDown className="size-4 text-muted-foreground" />
          </DropdownMenuTrigger>

          <DropdownMenuContent align="start" className="w-72 rounded-2xl p-1.5">
            {allowAllProjects && (
              <DropdownMenuItem
                onClick={() => onProjectChange(null)}
                className="flex items-center justify-between rounded-xl px-3 py-2.5"
              >
                <span className="text-xs font-bold text-foreground">
                  All projects
                </span>
                {selectedProjectId === null && (
                  <Check className="size-4 text-primary" />
                )}
              </DropdownMenuItem>
            )}

            {projects.map((project) => {
              const isSelected = project.id === selectedProjectId;
              return (
                <DropdownMenuItem
                  key={project.id}
                  onClick={() => onProjectChange(project.id)}
                  className={cn(
                    "flex items-center justify-between gap-3 rounded-xl px-3 py-2.5",
                    isSelected &&
                      "bg-primary-subtle text-primary-subtle-foreground",
                  )}
                >
                  <span className="flex min-w-0 flex-col">
                    <span className="truncate text-xs font-bold text-foreground">
                      {project.name}
                    </span>
                    <span className="text-[10px] text-muted-foreground">
                      {project.tasks.length} tasks
                    </span>
                  </span>
                  <span className="flex shrink-0 items-center gap-2">
                    <span className="text-[11px] font-bold text-primary">
                      {getProjectProgress(project.tasks)}%
                    </span>
                    {isSelected && <Check className="size-4 text-primary" />}
                  </span>
                </DropdownMenuItem>
              );
            })}

            {projects.length === 0 && (
              <p className="px-3 py-2 text-xs text-muted-foreground">
                No projects yet.
              </p>
            )}

            {createProjectHref && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="rounded-xl px-3 py-2 text-xs font-semibold text-primary">
                  <Link href={createProjectHref} className="flex justify-center items-center gap-1.5">
                    <PlusCircle className="size-4" />
                    <p>Create new project</p>
                  </Link>
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <div className="flex items-center gap-3">
          <h1 className="font-heading text-xl font-bold tracking-tight text-foreground sm:text-2xl">
            {boardTitle}
          </h1>
          <span
            role="status"
            className="inline-flex items-center gap-1.5 rounded-full bg-success-subtle px-2.5 py-0.5 text-xs font-semibold text-success-foreground"
          >
            <span
              className={cn(
                "size-1.5 rounded-full bg-success",
                isSyncing && "animate-pulse",
              )}
            />
            {isSyncing ? "Syncing" : "Up to date"}
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {assignees.length > 0 && (
          <div
            className="flex -space-x-2"
            aria-label="People with tasks on this board"
          >
            {visibleAssignees.map((person) => (
              <Avatar
                key={person.id}
                className="size-7 border-2 border-background"
                title={person.name}
              >
                <AvatarImage
                  src={person.memberAvatarUrl ?? undefined}
                  alt={person.name}
                />
                <AvatarFallback className="bg-primary text-[10px] font-bold text-primary-foreground">
                  {getInitials(person.name)}
                </AvatarFallback>
              </Avatar>
            ))}
            {hiddenAssigneeCount > 0 && (
              <span className="flex size-7 items-center justify-center rounded-full border-2 border-background bg-muted text-[10px] font-bold text-muted-foreground">
                +{hiddenAssigneeCount}
              </span>
            )}
          </div>
        )}

        <DropdownMenu>
          <DropdownMenuTrigger className="inline-flex items-center justify-center rounded-full border border-border bg-transparent px-4 py-1.5 text-xs font-semibold text-foreground transition-all duration-150 hover:bg-accent active:translate-y-px disabled:pointer-events-none disabled:opacity-50">
            <Filter className="size-3.5 text-muted-foreground" />
            Filter
            {priorityFilter.length > 0 && (
              <span className="ml-0.5 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground">
                {priorityFilter.length}
              </span>
            )}
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-48 rounded-2xl p-1.5">
            <DropdownMenuGroup>
              <DropdownMenuLabel className="text-xs text-muted-foreground">
                Priority
              </DropdownMenuLabel>
              {TASK_PRIORITIES.map((priority) => (
                <DropdownMenuCheckboxItem
                  key={priority}
                  checked={priorityFilter.includes(priority)}
                  onCheckedChange={(checked) =>
                    togglePriority(priority, checked === true)
                  }
                  onSelect={(event) => event.preventDefault()}
                  className="rounded-xl text-xs"
                >
                  {PRIORITY_LABELS[priority]}
                </DropdownMenuCheckboxItem>
              ))}
            </DropdownMenuGroup>
            {priorityFilter.length > 0 && (
              <>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                  onSelect={() => onPriorityFilterChange([])}
                  className="rounded-xl text-xs font-semibold"
                >
                  Clear filter
                </DropdownMenuItem>
              </>
            )}
          </DropdownMenuContent>
        </DropdownMenu>

        <Button
          onClick={onAddTaskClick}
          size="sm"
          className="rounded-full bg-primary px-4 text-xs font-semibold text-primary-foreground hover:bg-primary-hover"
        >
          <Plus className="size-4" />
          Add task
        </Button>
      </div>
    </div>
  );
}
