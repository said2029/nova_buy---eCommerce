import SidbarProvider from "@/Providers/SidbarProvider";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return <SidbarProvider>{children}</SidbarProvider>;
}
