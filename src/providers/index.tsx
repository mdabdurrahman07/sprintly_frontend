import { ReactNode } from "react";
import QueryProvider from "./QueryProvider";
import { GooeyToaster } from "goey-toast";


export default function Providers({ children }: { children: ReactNode }) {
  return (
    <QueryProvider>
      {children}
    </QueryProvider>
  );
}
