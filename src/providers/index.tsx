import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAuthProvider from "./GoogleAuthProvider";
import { ThemeProvider } from "next-themes";

export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <ThemeProvider
        attribute="class"
        defaultTheme="system"
        enableSystem
        disableTransitionOnChange
      >
        <QueryProvider>
          <TooltipProvider>{children}</TooltipProvider>
        </QueryProvider>
      </ThemeProvider>
    </GoogleAuthProvider>
  );
}
