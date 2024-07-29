"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import Coupon_Table from "@/components/dashboard/tables/Coupon_Table";
import Upload_Image from "@/components/dashboard/utils/Upload_Image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const CouponSchema = zod.object({
  name: zod.string(),
  code: zod.string(),
  discount: zod.string(),
  time_validate: zod.string(),
  MaxUse: zod.string(),
  Image: zod.string(),
});

export default function page() {
  const t = useTranslations("Coupon");
  const form = useForm<zod.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
  });
  const submit = (value: zod.infer<typeof CouponSchema>) => {
    console.log(value);
    form.reset();
    // add to database
  };
  const ref_SheetButton = useRef<HTMLButtonElement>(null);
  return (
    <MainProviderPerants name={t("Coupon")}>
      <section className="bg-gray-400/10 flex-wrap sm:flex-nowrap rounded-md w-full py-5 px-3 flex gap-2">
        <Input placeholder="Search...." />
        <SheetControlle SheetTriggerRef={ref_SheetButton} buttonName={t("Add Coupon")} tital={t("Add Coupon")}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Upload_Image
                      name="Image_Coupon"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("Coupon Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("Coupon Code")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("Coupon discount")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time_validate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder={t("Coupon Time End")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MaxUse"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("Coupon Max Using")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t("Add Coupon")}
              </Button>
            </form>
          </Form>
        </SheetControlle>
        <Button className="h-12">{t("Filter")}</Button>
        <Button className="h-12">{t("Restart")}</Button>
      </section>
      <section className="mt-5 rounded-md p-2 bg-gray-400/10 ">
        <Coupon_Table openEdit={()=>{
          ref_SheetButton.current?.click();
        }}/>
      </section>
    </MainProviderPerants>
  );
}
