"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useCreateProjectTask } from "@/hooks/project.hooks";
import { getErrorMessage } from "@/lib/api-error";

import type { ProjectSummary, TaskCreatePayload } from "@/types/project.types";
import { TASK_PRIORITIES } from "@/types/task.types";
import { CreateTaskFormValues, createTaskSchema } from "@/validators/task.validators";
import { isTaskPriority, parseLabels, PRIORITY_LABELS } from "@/lib/kanban";
import { FieldError } from "@/lib/field-error";



interface CreateTaskFormProps {
  projects: readonly ProjectSummary[];
  defaultProjectId: string | null;
  onClose: () => void;
}

/**
 * Mounted by the dialog only while it is open, so every opening starts from
 * fresh default values and no reset effect is needed.
 */
function CreateTaskForm({ projects, defaultProjectId, onClose }: CreateTaskFormProps) {
  const { mutateAsync: createTask } = useCreateProjectTask();

  const defaultValues: CreateTaskFormValues = {
    projectId: defaultProjectId ?? projects[0]?.id ?? "",
    title: "",
    description: "",
    priority: "MEDIUM",
    labels: "",
  };

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: createTaskSchema },
    onSubmit: async ({ value }) => {
      const parsed = createTaskSchema.parse(value);
      const payload: TaskCreatePayload = {
        title: parsed.title,
        priority: parsed.priority,
        labels: parseLabels(parsed.labels),
        ...(parsed.description ? { description: parsed.description } : {}),
      };
      try {
        await createTask({ projectId: parsed.projectId, payload });
        toast.success("Task created");
        onClose();
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not create the task"));
      }
    },
  });

  return (
    <form
      noValidate
      className="space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
    >
      <form.Field name="projectId">
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor="create-task-project">Project</Label>
            <Select
              value={field.state.value}
              onValueChange={(value) => {
                if (value !== null) field.handleChange(value);
              }}
            >
              <SelectTrigger id="create-task-project" className="w-full">
                <SelectValue placeholder="Choose a project" />
              </SelectTrigger>
              <SelectContent>
                {projects.map((project) => (
                  <SelectItem key={project.id} value={project.id}>
                    {project.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="title">
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor="create-task-title">Title</Label>
            <Input
              id="create-task-title"
              name={field.name}
              autoComplete="off"
              aria-invalid={field.state.meta.errors.length > 0}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <form.Field name="description">
        {(field) => (
          <div className="space-y-1.5">
            <Label htmlFor="create-task-description">Description</Label>
            <Textarea
              id="create-task-description"
              name={field.name}
              rows={4}
              aria-invalid={field.state.meta.errors.length > 0}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
            <FieldError errors={field.state.meta.errors} />
          </div>
        )}
      </form.Field>

      <div className="grid gap-4 sm:grid-cols-2">
        <form.Field name="priority">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="create-task-priority">Priority</Label>
              <Select
                value={field.state.value}
                onValueChange={(value) => {
                  if (isTaskPriority(value)) field.handleChange(value);
                }}
              >
                <SelectTrigger id="create-task-priority" className="w-full">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {TASK_PRIORITIES.map((priority) => (
                    <SelectItem key={priority} value={priority}>
                      {PRIORITY_LABELS[priority]}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          )}
        </form.Field>

        <form.Field name="labels">
          {(field) => (
            <div className="space-y-1.5">
              <Label htmlFor="create-task-labels">Labels</Label>
              <Input
                id="create-task-labels"
                name={field.name}
                placeholder="design, banner"
                autoComplete="off"
                aria-invalid={field.state.meta.errors.length > 0}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(event) => field.handleChange(event.target.value)}
              />
              <FieldError errors={field.state.meta.errors} />
            </div>
          )}
        </form.Field>
      </div>

      <DialogFooter>
        <Button type="button" variant="outline" onClick={onClose}>
          Cancel
        </Button>
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Creating…" : "Create task"}
            </Button>
          )}
        </form.Subscribe>
      </DialogFooter>
    </form>
  );
}

interface CreateTaskDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  projects: readonly ProjectSummary[];
  /** Project preselected when the dialog opens. */
  defaultProjectId: string | null;
}

export function CreateTaskDialog({
  open,
  onOpenChange,
  projects,
  defaultProjectId,
}: CreateTaskDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="font-heading">Create task</DialogTitle>
          <DialogDescription>New tasks start in To do.</DialogDescription>
        </DialogHeader>

        {projects.length === 0 ? (
          <p className="text-sm text-muted-foreground">Create a project before adding tasks.</p>
        ) : (
          <CreateTaskForm
            projects={projects}
            defaultProjectId={defaultProjectId}
            onClose={() => onOpenChange(false)}
          />
        )}
      </DialogContent>
    </Dialog>
  );
}