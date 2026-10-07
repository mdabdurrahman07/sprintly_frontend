import { getFirstErrorMessage } from "@/lib/form";
 
interface FieldErrorProps {
  errors: readonly unknown[];
}
 
export function FieldError({ errors }: FieldErrorProps) {
  const message = getFirstErrorMessage(errors);
  if (!message) return null;
  return (
    <p role="alert" className="text-xs text-destructive">
      {message}
    </p>
  );
}