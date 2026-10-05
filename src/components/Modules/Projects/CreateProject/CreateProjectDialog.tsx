"use client";
import { X, UploadCloud, FileText, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useRef, useState } from "react";
import type { ReactElement } from "react";
import { toast } from "sonner";
import { useCreateProject } from "@/hooks/project.hooks";
import { useForm } from "@tanstack/react-form";
import {
  MAX_ADDITIONAL_FILES,
  ProjectPayloadSchema,
} from "@/validators/project.validators";

const CreateProjectDialog = ({ children }: { children: ReactElement }) => {
  const [isOpen, setIsOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { mutate: createProject, isPending } = useCreateProject();
  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
      additionalFiles: [] as File[],
    },
    validators: {
      onChange: ({ value }) => {
        const result = ProjectPayloadSchema.safeParse(value);
        return result.success ? undefined : result.error;
      },
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();
      formData.append("name", value.name);

      if (value.description) {
        formData.append("description", value.description);
      }

      if (value.additionalFiles && value.additionalFiles.length > 0) {
        value.additionalFiles.forEach((file) => {
          formData.append("additionalFiles", file);
        });
      }

      createProject(formData, {
        onSuccess: () => {
          form.reset();
          setIsOpen(false);
          toast.success("Project created successfully");
        },
        onError: () => {
          toast.error("Failed to create project");
        },
      });
    },
  });
  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger render={children} />

      <DialogContent className="max-w-md bg-white p-6 dark:bg-card dark:border-border rounded-2xl">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl font-bold text-zinc-900 dark:text-foreground">
            Create New Project
          </DialogTitle>
          <DialogDescription className="text-zinc-500 dark:text-muted-foreground">
            Fill in the details below to start a new project pipeline.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-4 flex flex-col gap-5"
        >
          {/* Project Name Field */}
          <form.Field name="name">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor={field.name}
                  className="text-zinc-700 dark:text-foreground font-semibold"
                >
                  Project Name <span className="text-red-500">*</span>
                </Label>
                <Input
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="e.g. Q3 Marketing Campaign"
                  className="rounded-lg border-zinc-200 focus-visible:ring-blue-600 dark:border-border dark:focus-visible:ring-primary"
                />
                {field.state.meta.errors ? (
                  <p className="text-xs text-red-500">
                    {field.state.meta.errors.join(", ")}
                  </p>
                ) : null}
              </div>
            )}
          </form.Field>

          {/* Description Field */}
          <form.Field name="description">
            {(field) => (
              <div className="flex flex-col gap-2">
                <Label
                  htmlFor={field.name}
                  className="text-zinc-700 dark:text-foreground font-semibold"
                >
                  Description
                </Label>
                <Textarea
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Briefly describe the project goals..."
                  className="min-h-25 resize-none rounded-lg border-zinc-200 focus-visible:ring-blue-600 dark:border-border dark:focus-visible:ring-primary"
                />
              </div>
            )}
          </form.Field>

          {/* Additional Files Field */}
          <form.Field name="additionalFiles">
            {(field) => {
              const files = field.state.value;
              const hasReachedMax = files.length >= MAX_ADDITIONAL_FILES;

              return (
                <div className="flex flex-col gap-2">
                  <Label className="text-zinc-700 dark:text-foreground font-semibold flex justify-between">
                    <span>Additional Files</span>
                    <span className="text-xs font-normal text-zinc-500">
                      {files.length} / {MAX_ADDITIONAL_FILES} attached
                    </span>
                  </Label>

                  {/* Hidden File Input */}
                  <input
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.png,.jpeg,.jpg"
                    ref={fileInputRef}
                    className="hidden"
                    onChange={(e) => {
                      const selected = Array.from(e.target.files || []);
                      const combined = [...files, ...selected].slice(
                        0,
                        MAX_ADDITIONAL_FILES,
                      );
                      field.handleChange(combined);
                      if (fileInputRef.current) fileInputRef.current.value = ""; // reset input
                    }}
                  />

                  {/* Upload Dropzone UI */}
                  {!hasReachedMax && (
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-6 transition-colors hover:bg-zinc-100 dark:border-border dark:bg-muted/20 dark:hover:bg-muted/40"
                    >
                      <div className="flex size-10 items-center justify-center rounded-full bg-blue-50 text-blue-600 dark:bg-primary/10 dark:text-primary">
                        <UploadCloud className="size-5" />
                      </div>
                      <div className="text-center">
                        <p className="text-sm font-medium text-zinc-700 dark:text-foreground">
                          Click to upload files
                        </p>
                        <p className="mt-1 text-xs text-zinc-500 dark:text-muted-foreground">
                          PDF, DOC, PNG or JPEG (max 5MB)
                        </p>
                      </div>
                    </button>
                  )}

                  {/* Selected Files Preview List */}
                  {files.length > 0 && (
                    <div className="mt-3 flex flex-col gap-2">
                      {files.map((file, index) => (
                        <div
                          key={`${file.name}-${index}`}
                          className="flex items-center justify-between rounded-lg border border-zinc-200 bg-white p-2.5 shadow-xs dark:border-border dark:bg-card"
                        >
                          <div className="flex items-center gap-3 overflow-hidden">
                            <div className="flex size-8 shrink-0 items-center justify-center rounded-md bg-zinc-100 text-zinc-500 dark:bg-muted dark:text-muted-foreground">
                              <FileText className="size-4" />
                            </div>
                            <div className="flex flex-col truncate">
                              <span className="truncate text-sm font-medium text-zinc-900 dark:text-foreground">
                                {file.name}
                              </span>
                              <span className="text-[10px] text-zinc-500 dark:text-muted-foreground">
                                {(file.size / 1024 / 1024).toFixed(2)} MB
                              </span>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() => {
                              const newFiles = files.filter(
                                (_, i) => i !== index,
                              );
                              field.handleChange(newFiles);
                            }}
                            className="rounded-full p-1.5 text-zinc-400 hover:bg-zinc-100 hover:text-red-600 dark:hover:bg-muted dark:hover:text-red-400 transition-colors"
                          >
                            <X className="size-4" />
                          </button>
                        </div>
                      ))}
                    </div>
                  )}

                  {field.state.meta.errors ? (
                    <p className="text-xs text-red-500 mt-1">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              );
            }}
          </form.Field>

          {/* Submit Actions */}
          <form.Subscribe selector={(state) => state.canSubmit}>
            {(canSubmit) => (
              <div className="mt-6 flex items-center justify-end gap-3 pt-4 border-t border-zinc-100 dark:border-border/50">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsOpen(false)}
                  className="rounded-full px-5 font-semibold text-zinc-700 dark:text-foreground"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={!canSubmit || isPending}
                  className="rounded-full bg-blue-600 px-6 font-semibold text-white shadow-xs transition-colors hover:bg-blue-700 dark:bg-primary dark:hover:bg-primary-hover"
                >
                  {isPending ? (
                    <Loader2 className="mr-2 size-4 animate-spin" />
                  ) : (
                    "Create Project"
                  )}
                </Button>
              </div>
            )}
          </form.Subscribe>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateProjectDialog;
