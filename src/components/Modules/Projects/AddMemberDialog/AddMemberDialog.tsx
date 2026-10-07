import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAssignedTaskToMember } from "@/hooks/task.hooks";
import { ProjectSummary } from "@/types/project.types";
import { AddMemberSchema, NO_TASK_MESSAGE } from "@/validators/task.validators";
import { useForm } from "@tanstack/react-form";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

export function AddMemberDialog({
  project,
  isOpen,
  setIsOpen,
}: {
  project: ProjectSummary;
  isOpen: boolean;
  setIsOpen: (val: boolean) => void;
}) {
  const assignMutation = useAssignedTaskToMember();

  // Backend assigns by task id: prefer an unassigned task, else the first one
  const targetTask =
    project.tasks?.find((t) => !t.assigneeId) ?? project.tasks?.[0];

  const form = useForm({
    defaultValues: { memberEmail: "" },
    validators: { onChange: AddMemberSchema },
    onSubmit: async ({ value }) => {
      if (!targetTask) {
        toast.error(NO_TASK_MESSAGE);
        return;
      }

      assignMutation.mutate(
        { id: targetTask.id, payload: { memberEmail: value.memberEmail } },
        {
          onSuccess: () => {
            toast.success("Member added successfully");
            form.reset();
            setIsOpen(false);
          },
          onError: (error) => {
            toast.error(
              error instanceof Error && error.message
                ? error.message
                : "Failed to add member"
            );
          },
        }
      );
    },
  });

  return (
    <Dialog
      open={isOpen}
      onOpenChange={(open) => {
        if (!open) form.reset();
        setIsOpen(open);
      }}
    >
      <DialogContent className="max-w-md rounded-3xl bg-white p-6 shadow-xl dark:border-border dark:bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl font-bold">
            Add Member
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
            name="memberEmail"
            children={(field) => {
              const errors = field.state.meta.errors
                .map((err) => (typeof err === "string" ? err : err?.message))
                .filter(Boolean);

              return (
                <div className="flex flex-col gap-1.5">
                  <Label className="text-xs font-bold text-zinc-700 dark:text-foreground">
                    Member Email
                  </Label>
                  <Input
                    type="email"
                    value={field.state.value}
                    onBlur={field.handleBlur}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="e.g. demouser@sprintly.com"
                    className="rounded-xl"
                  />
                  {field.state.meta.isTouched && errors.length > 0 ? (
                    <span className="text-xs text-rose-500">
                      {errors.join(", ")}
                    </span>
                  ) : null}
                </div>
              );
            }}
          />

          <div className="mt-4 flex justify-end gap-3 border-t border-zinc-100 pt-4">
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
              disabled={assignMutation.isPending}
              className="rounded-full bg-blue-600 px-6 text-white hover:bg-blue-700"
            >
              {assignMutation.isPending ? (
                <Loader2 className="mr-2 size-4 animate-spin" />
              ) : (
                "Add Member"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}