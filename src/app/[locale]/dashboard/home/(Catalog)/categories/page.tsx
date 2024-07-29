"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import Category_Table from "@/components/dashboard/tables/Category_Table";
import { MultiSelectTest } from "@/components/dashboard/utils/MultiSelelecor";
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
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useRef } from "react";
import { useForm } from "react-hook-form";
import * as zod from "zod";

const CategorySchema = zod.object({
  name: zod.string().min(3).max(255),
  image: zod.string().url(),
  description: zod.string(),
  subcategories: zod.array(zod.string()),

    
})

export default function page() {
  const t = useTranslations("Category");
  const form = useForm<zod.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
  });

  function submit(value: zod.infer<typeof CategorySchema>) {
    console.log(value);
    form.reset();
  }

  const ref_SheetButton = useRef<HTMLButtonElement>(null);
  return (
    <MainProviderPerants name="Category">
      <section className="bg-gray-400/10 rounded-md w-full flex-wrap sm:flex-nowrap py-5 px-3 flex gap-2">
        <Input className="flex-grow" placeholder="Search...." />
        <SheetControlle SheetTriggerRef={ref_SheetButton} buttonName={t("Add Category")} tital={t("Add Category")}>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Upload_Image
                        name="image_gategory"
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
                      <Input placeholder={t("Category Name")}  {...field} />
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
                      <Textarea placeholder={t("Category Description")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subcategories"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelectTest
                        name="SubCategories"
                        valueSelect={field.value}
                        onChange={field.onChange}
                        options={["23324", "w324"]}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button type="submit" className="w-full">
                {t("Add Category")}
              </Button>
            </form>
          </Form>
        </SheetControlle>
        <Button className="h-12">{t("Filter")}</Button>
        <Button className="h-12">{t("Restar")}</Button>
      </section>
      <section className="bg-gray-400/10 rounded-md p-2 mt-5">
        <Category_Table openEdit={()=>{
          ref_SheetButton.current?.click();
        }}/>
      </section>
    </MainProviderPerants>
  );
}
