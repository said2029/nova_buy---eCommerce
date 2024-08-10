import SidbarProvider from "@/Providers/SidbarProvider";
import { unstable_setRequestLocale } from "next-intl/server";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";


const locales = ["en", "ar"];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}
export default function layout({
  children,
  params:{locale}
}: {
  children: ReactNode;
  params:{locale:string}
}) {
  const cookieStore = cookies();
  if (!cookieStore.get("auth")) {
    redirect(`/auth`);
  }
  unstable_setRequestLocale(locale);
  return <SidbarProvider>{children}</SidbarProvider>;
}
