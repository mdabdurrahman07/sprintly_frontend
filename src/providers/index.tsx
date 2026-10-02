import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { TooltipProvider } from "@/components/ui/tooltip";
import GoogleAuthProvider from "./GoogleAuthProvider";


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <GoogleAuthProvider>
      <QueryProvider>
      <TooltipProvider>{children}</TooltipProvider>
    </QueryProvider>
    </GoogleAuthProvider>
  );
}
