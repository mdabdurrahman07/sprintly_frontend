"use client";

import { useRef, useState } from "react";
import { useForm } from "@tanstack/react-form";
import { toast } from "sonner";
import { Camera, Loader2, X, Plus } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

import { SessionUser } from "@/types/user.types";
import { useUpdateManagerProfile, useUpdateMemberProfile } from "@/hooks/profile.hooks";
import { ManagerProfileUpdateSchema, MemberProfileUpdateSchema } from "@/validators/profile.validators";

interface EditProfileDialogProps {
  user: SessionUser;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditProfileDialog({
  user,
  open,
  onOpenChange,
}: EditProfileDialogProps) {
  const isManager = user.role === "MANAGER";
  const profile = isManager ? user.managerProfile : user.memberProfile;
  const avatarInputRef = useRef<HTMLInputElement>(null);
  const [newSkill, setNewSkill] = useState("");

  const updateMemberMutation = useUpdateMemberProfile();
  const updateManagerMutation = useUpdateManagerProfile();

  const isPending =
    updateMemberMutation.isPending || updateManagerMutation.isPending;

  const currentSchema = isManager
    ? ManagerProfileUpdateSchema
    : MemberProfileUpdateSchema;

  const form = useForm({
    defaultValues: {
      bio: profile?.bio || "",
      phoneNumber: profile?.phoneNumber || "",
      skills: (!isManager ? user.memberProfile?.skills : []) || [],
      avatarFile: undefined as File | undefined,
    },
    validators: {
      onChange: currentSchema,
    },
    onSubmit: async ({ value }) => {
      const formData = new FormData();

      if (value.bio !== undefined) formData.append("bio", value.bio);
      if (value.phoneNumber !== undefined)
        formData.append("phoneNumber", value.phoneNumber);

      if (value.avatarFile) {
        const avatarKey = isManager ? "managerAvatarUrl" : "memberAvatarUrl";
        formData.append(avatarKey, value.avatarFile);
      }

      if (!isManager && value.skills) {
        value.skills.forEach((skill) => formData.append("skills", skill));
      }

      const mutation = isManager
        ? updateManagerMutation
        : updateMemberMutation;

      mutation.mutate(formData, {
        onSuccess: () => {
          toast.success("Profile updated successfully!");
          onOpenChange(false);
        },
        onError: (error) => {
          toast.error(error.message || "Failed to update profile.");
        },
      });
    },
  });

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md rounded-3xl bg-white p-6 shadow-xl dark:border-border dark:bg-card">
        <DialogHeader>
          <DialogTitle className="font-headline text-xl font-bold text-zinc-900 dark:text-foreground">
            Edit Profile
          </DialogTitle>
          <DialogDescription className="text-xs text-zinc-500 dark:text-muted-foreground">
            Update your profile details and public avatar.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            e.stopPropagation();
            form.handleSubmit();
          }}
          className="mt-4 flex flex-col gap-4"
        >
          {/* Avatar Upload Field */}
          <form.Field
            name="avatarFile"
            children={(field) => {
              const previewUrl = field.state.value
                ? URL.createObjectURL(field.state.value)
                : isManager
                ? user.managerProfile?.managerAvatarUrl
                : user.memberProfile?.memberAvatarUrl;

              return (
                <div className="flex flex-col items-center justify-center gap-2">
                  <div className="relative">
                    <div className="flex size-20 items-center justify-center overflow-hidden rounded-full bg-blue-100 font-headline text-xl font-bold text-blue-600 dark:bg-blue-500/20 dark:text-blue-400">
                      {previewUrl ? (
                        <img
                          src={previewUrl}
                          alt={user.name}
                          className="size-full object-cover"
                        />
                      ) : (
                        user.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")
                          .toUpperCase()
                          .slice(0, 2)
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => avatarInputRef.current?.click()}
                      className="absolute bottom-0 right-0 flex size-7 items-center justify-center rounded-full bg-blue-600 text-white shadow-md transition-hover hover:bg-blue-700"
                    >
                      <Camera className="size-4" />
                    </button>
                  </div>
                  <input
                    ref={avatarInputRef}
                    type="file"
                    accept="image/png,image/jpeg,image/webp"
                    className="hidden"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) field.handleChange(file);
                    }}
                  />
                  {field.state.meta.errors ? (
                    <p className="text-xs text-rose-500">
                      {field.state.meta.errors.join(", ")}
                    </p>
                  ) : null}
                </div>
              );
            }}
          />

          {/* Bio Field */}
          <form.Field
            name="bio"
            children={(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className="text-xs font-bold text-zinc-700 dark:text-foreground">
                  About / Bio
                </Label>
                <Textarea
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="Tell us about yourself..."
                  className="min-h-20 resize-none rounded-xl border-zinc-200 text-sm focus-visible:ring-blue-600 dark:border-border"
                />
              </div>
            )}
          />

          {/* Phone Number Field */}
          <form.Field
            name="phoneNumber"
            children={(field) => (
              <div className="flex flex-col gap-1.5">
                <Label htmlFor={field.name} className="text-xs font-bold text-zinc-700 dark:text-foreground">
                  Phone Number
                </Label>
                <Input
                  id={field.name}
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  placeholder="+880 1780-000000"
                  className="rounded-xl border-zinc-200 text-sm focus-visible:ring-blue-600 dark:border-border"
                />
              </div>
            )}
          />

          {/* Skills Field (Only for Member) */}
          {!isManager && (
            <form.Field
              name="skills"
              children={(field) => {
                const skillsList = field.state.value || [];

                const addSkill = () => {
                  if (newSkill.trim() && !skillsList.includes(newSkill.trim())) {
                    field.handleChange([...skillsList, newSkill.trim()]);
                    setNewSkill("");
                  }
                };

                return (
                  <div className="flex flex-col gap-1.5">
                    <Label className="text-xs font-bold text-zinc-700 dark:text-foreground">
                      Skills
                    </Label>
                    <div className="flex gap-2">
                      <Input
                        value={newSkill}
                        onChange={(e) => setNewSkill(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            addSkill();
                          }
                        }}
                        placeholder="Add a skill (e.g. Accounts)"
                        className="rounded-xl border-zinc-200 text-sm dark:border-border"
                      />
                      <Button
                        type="button"
                        onClick={addSkill}
                        variant="outline"
                        className="rounded-xl border-zinc-200 dark:border-border"
                      >
                        <Plus className="size-4" />
                      </Button>
                    </div>
                    <div className="mt-2 flex flex-wrap gap-1.5">
                      {skillsList.map((skill, index) => (
                        <span
                          key={skill}
                          className="inline-flex items-center gap-1 rounded-full border border-zinc-200/80 bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-700 dark:border-border dark:bg-muted dark:text-foreground"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() =>
                              field.handleChange(
                                skillsList.filter((_, i) => i !== index)
                              )
                            }
                            className="text-zinc-400 hover:text-rose-500"
                          >
                            <X className="size-3" />
                          </button>
                        </span>
                      ))}
                    </div>
                  </div>
                );
              }}
            />
          )}

          {/* Form Actions */}
          <div className="mt-4 flex items-center justify-end gap-3 pt-3 border-t border-zinc-100 dark:border-border/50">
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full px-5 font-semibold text-zinc-700 dark:border-border dark:text-foreground"
            >
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isPending}
              className="rounded-full bg-blue-600 px-6 font-semibold text-white transition-colors hover:bg-blue-700 dark:bg-primary dark:hover:bg-primary-hover"
            >
              {isPending ? (
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