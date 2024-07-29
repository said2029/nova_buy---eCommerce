"use client";
import User_Table from "@/components/dashboard/tables/Table_Users";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

export const UserSchema = z.object({
  fullName: z.string().min(10),
  email: z.string().email(),
  status: z.string().optional(),
  phone: z.string().optional(),
  address: z.string().optional(),
});

export default function page() {
  const t = useTranslations("UserPage");
  const form = useForm<z.infer<typeof UserSchema>>({
    resolver: zodResolver(UserSchema),
    defaultValues: {
      fullName: "",
      email: "",
      status: "",
      phone: "",
      address: "",
    },

  })
  return (
    <MainProviderPerants name={t("Users")}>
      <section className="bg-gray-500/10 p-3 flex-wrap sm:flex-nowrap rounded-md flex gap-3">
        <Input className="h-12" placeholder={t("Search")} />
        <Button className="w-28 h-12">{t("Filter")}</Button>
        <Button className="w-28 h-12">{t("Restart")}</Button>
      </section>
      <section className="bg-gray-500/10 p-3 rounded-md mt-10">
        <User_Table form={form}/>
      </section>
    </MainProviderPerants>
  );
}
