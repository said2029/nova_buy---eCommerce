import SidbarProvider from "@/Providers/SidbarProvider";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default function layout({
  children,
  params: { locale },
}: {
  children: ReactNode;
  params: { locale: string };
}) {
  const cookieStore = cookies();
  if (!cookieStore.get("auth")) {
    redirect(`/dashboard/auth`);
  }
  return <SidbarProvider locale={locale}>{children}</SidbarProvider>;
}
