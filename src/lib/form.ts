export const getFirstErrorMessage = (errors: readonly unknown[]): string | undefined => {
  for (const error of errors) {
    if (typeof error === "string" && error) return error;
    if (typeof error === "object" && error !== null && "message" in error) {
      const { message } = error as { message: unknown };
      if (typeof message === "string" && message) return message;
    }
  }
  return undefined;
};
 