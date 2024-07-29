"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubCategory_Table from "@/components/dashboard/tables/SubCategory_Table";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const schema = zod.object({
  name: zod.string().min(2),
  description: zod.string().min(2),
});

export default function page() {
  const t = useTranslations("SubCategory");

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const ref_SheetButton = useRef<HTMLButtonElement>(null);
  return (
    <MainProviderPerants name={t("subCategory")}>
      <section className="bg-gray-400/10 flex-wrap sm:flex-nowrap rounded-md w-full py-5 px-3 flex gap-2">
        <Input placeholder="Search...." />
        <SheetControlle
          SheetTriggerRef={ref_SheetButton}
          buttonName={t("Add subCategory")}
          tital={t("Add subCategory")}
        >
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("subCategory Title")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("Display Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                {t("Add subCategory")}
              </Button>
            </form>
          </Form>
        </SheetControlle>
        <Button className="h-12">{t("Filter")}</Button>
        <Button className="h-12">{t("Restart")}</Button>
      </section>
      <section className="bg-gray-400/10 p-2 mt-5 rounded-md">
        <SubCategory_Table
          openEdit={() => {
            ref_SheetButton.current?.click();
          }}
        />
      </section>
    </MainProviderPerants>
  );
}
