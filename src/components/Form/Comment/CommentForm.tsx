"use client";

import { revalidateLogic, useForm } from "@tanstack/react-form";
import { Loader2, Send } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { useCreateTaskComment } from "@/hooks/comment.hooks";
import { getErrorMessage } from "@/lib/api-error";

import type { Task } from "@/types/task.types";
import {
  CommentFormValues,
  commentSchema,
} from "@/validators/comment.validators";
import { FieldError } from "@/lib/field-error";

interface CommentFormProps {
  task: Task;
}

export function CommentForm({ task }: CommentFormProps) {
  const { mutateAsync: createComment } = useCreateTaskComment();

  const defaultValues: CommentFormValues = { content: "" };

  const form = useForm({
    defaultValues,
    validationLogic: revalidateLogic(),
    validators: { onDynamic: commentSchema },
    onSubmit: async ({ value, formApi }) => {
      const { content } = commentSchema.parse(value);
      try {
        await createComment({
          taskId: task.id,
          projectId: task.projectId,
          payload: { content },
        });
        formApi.reset();
      } catch (error) {
        toast.error(getErrorMessage(error, "Could not post the comment"));
      }
    },
  });

  return (
    <form
      noValidate
      onSubmit={(event) => {
        event.preventDefault();
        event.stopPropagation();
        void form.handleSubmit();
      }}
      className="space-y-2 border-t border-border p-4"
    >
      <form.Field name="content">
        {(field) => (
          <>
            <Textarea
              rows={2}
              name={field.name}
              placeholder="Write a comment"
              aria-label="Write a comment"
              aria-invalid={field.state.meta.errors.length > 0}
              value={field.state.value}
              onBlur={field.handleBlur}
              onChange={(event) => field.handleChange(event.target.value)}
            />
            <FieldError errors={field.state.meta.errors} />
          </>
        )}
      </form.Field>

      <div className="flex justify-end">
        <form.Subscribe selector={(state) => state.isSubmitting}>
          {(isSubmitting) => (
            <Button type="submit" size="sm" disabled={isSubmitting}>
              {isSubmitting ? (
                <Loader2 className="size-4 animate-spin" />
              ) : (
                <Send className="size-4" />
              )}
              Post comment
            </Button>
          )}
        </form.Subscribe>
      </div>
    </form>
  );
}
