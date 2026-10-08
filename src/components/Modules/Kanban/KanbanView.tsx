"use client";

import { useCallback, useMemo, useState, type ReactNode } from "react";
import Link from "next/link";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { useGetMe } from "@/hooks/auth.hooks";
import { useGetProjects, useGetProjectTasks } from "@/hooks/project.hooks";
import { useGetMyAssignedTask, useUpdateTask } from "@/hooks/task.hooks";
import { getErrorMessage } from "@/lib/api-error";
import {
  getDistinctAssignees,
  toKanbanRole,
  type KanbanActor,
} from "@/lib/kanban";
import type { ProjectParams } from "@/types/project.types";
import type { Task, TaskPriority, TaskStatus } from "@/types/task.types";
import { KanbanBoard, KanbanBoardSkeleton } from "./KanbanBoard";
import { KanbanHeader } from "./KanbanHeader";
import { CreateTaskDialog } from "../Tasks/CreateTaskDialog";
import { TaskDetailsSheet } from "../Tasks/TaskDetailsSheet";


const PROJECT_PARAMS: ProjectParams = { limit: 100 };

function StateMessage({
  title,
  children,
}: {
  title: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-border bg-card px-6 py-16 text-center">
      <h2 className="font-heading text-base font-bold text-foreground">{title}</h2>
      {children}
    </div>
  );
}

interface KanbanViewProps {
  /** Route of your create-project page. Enables the "Create new project" actions. */
  createProjectHref?: string;
}

/**
 * One board for both dashboards. The role comes from `useGetMe`:
 *  - MANAGER: tasks of the selected project (`GET /project/:id/tasks`), can move tasks anywhere.
 *  - MEMBER: own assigned tasks (`GET /task/myAssigned`), can't move tasks into or out of Done.
 */
export function KanbanView({ createProjectHref }: KanbanViewProps) {
  const meQuery = useGetMe();
  const me = meQuery.data?.data;
  const role = toKanbanRole(me?.role);
  const isManager = role === "MANAGER";
  const memberProfile = me?.memberProfile ?? null;
  const memberId = memberProfile?.id ?? null;

  const projectsQuery = useGetProjects(PROJECT_PARAMS);
  const projects = useMemo(
    () => (projectsQuery.data?.data ?? []).filter((project) => !project.isDeleted),
    [projectsQuery.data],
  );

  const [projectSelection, setProjectSelection] = useState<string | null>(null);
  const [priorityFilter, setPriorityFilter] = useState<TaskPriority[]>([]);
  const [openTaskId, setOpenTaskId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);

  // Managers always have a project selected (first one by default); members default to "all projects".
  const selectedProjectId = projects.some(
    (project) => project.id === projectSelection,
  )
    ? projectSelection
    : null;
  const activeProjectId = isManager
    ? (selectedProjectId ?? projects[0]?.id ?? null)
    : selectedProjectId;

  const managerTasksQuery = useGetProjectTasks(isManager && activeProjectId ? activeProjectId : "");
  const memberTasksQuery = useGetMyAssignedTask({ enabled: role === "MEMBER" });
  const tasksQuery = isManager ? managerTasksQuery : memberTasksQuery;

  const scopedTasks = useMemo<Task[]>(() => {
    const fetched = tasksQuery.data?.data ?? [];
    if (isManager) {
      // Defensive: GET /project/:id/tasks must only return this project's tasks (see PATCHES.md).
      return fetched.filter((task) => task.projectId === activeProjectId);
    }
    // /task/myAssigned omits `assignee`; every task in it is assigned to the signed-in member.
    const mine = memberProfile
      ? fetched.map((task) =>
          task.assignee || task.assigneeId !== memberProfile.id
            ? task
            : { ...task, assignee: memberProfile },
        )
      : fetched;
    return activeProjectId ? mine.filter((task) => task.projectId === activeProjectId) : mine;
  }, [tasksQuery.data, isManager, activeProjectId, memberProfile]);

  const visibleTasks = useMemo(
    () =>
      priorityFilter.length === 0
        ? scopedTasks
        : scopedTasks.filter((task) => priorityFilter.includes(task.priority)),
    [scopedTasks, priorityFilter],
  );
  const assignees = useMemo(() => getDistinctAssignees(scopedTasks), [scopedTasks]);
  const openTask = useMemo(
    () => scopedTasks.find((task) => task.id === openTaskId) ?? null,
    [scopedTasks, openTaskId],
  );

  const { mutateAsync: updateTask } = useUpdateTask();
  const handleMoveTask = useCallback(
    (task: Task, nextStatus: TaskStatus) => {
      updateTask({
        id: task.id,
        projectId: task.projectId,
        payload: { status: nextStatus },
      }).catch((error: unknown) => {
        toast.error(getErrorMessage(error, "Could not move the task"));
      });
    },
    [updateTask],
  );

  if (meQuery.isError) {
    return (
      <StateMessage title="Couldn't load your account">
        <Button variant="outline" size="sm" onClick={() => void meQuery.refetch()}>
          Try again
        </Button>
      </StateMessage>
    );
  }

  if (!meQuery.isLoading && role === null) {
    return <StateMessage title="The board is available to managers and members" />;
  }

  if (meQuery.isLoading || role === null) return <KanbanBoardSkeleton />;

  if (isManager && !projectsQuery.isLoading && projects.length === 0) {
    return (
      <StateMessage title="Create a project to start adding tasks">
        {createProjectHref && (
          <Button size="sm">
            <Link href={createProjectHref}>Create project</Link>
          </Button>
        )}
      </StateMessage>
    );
  }

  const actor: KanbanActor = { role, memberId };
  const isBoardLoading = tasksQuery.isLoading || (isManager && projectsQuery.isLoading);

  return (
    <div className="space-y-6">
      <KanbanHeader
        projects={projects}
        selectedProjectId={activeProjectId}
        allowAllProjects={!isManager}
        onProjectChange={setProjectSelection}
        assignees={assignees}
        priorityFilter={priorityFilter}
        onPriorityFilterChange={setPriorityFilter}
        onAddTaskClick={() => setIsCreateOpen(true)}
        isSyncing={tasksQuery.isFetching}
        createProjectHref={isManager ? createProjectHref : undefined}
      />

      {tasksQuery.isError ? (
        <StateMessage title="Couldn't load tasks">
          <Button variant="outline" size="sm" onClick={() => void tasksQuery.refetch()}>
            Try again
          </Button>
        </StateMessage>
      ) : isBoardLoading ? (
        <KanbanBoardSkeleton />
      ) : (
        <KanbanBoard
          tasks={visibleTasks}
          role={role}
          currentMemberId={memberId}
          onMoveTask={handleMoveTask}
          onOpenTask={(task) => setOpenTaskId(task.id)}
        />
      )}

      <CreateTaskDialog
        open={isCreateOpen}
        onOpenChange={setIsCreateOpen}
        projects={projects}
        defaultProjectId={activeProjectId}
      />

      <TaskDetailsSheet
        task={openTask}
        projectName={
          projects.find((project) => project.id === openTask?.projectId)?.name ??
          openTask?.project?.name ??
          null
        }
        actor={actor}
        onOpenChange={(open) => {
          if (!open) setOpenTaskId(null);
        }}
        onChangeStatus={handleMoveTask}
      />
    </div>
  );
}