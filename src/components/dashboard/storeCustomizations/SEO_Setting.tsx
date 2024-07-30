"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { SEO_schema } from "@/Types"; // Adjust the path according to your project
import Upload_Image from "../utils/Upload_Image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import axios from "axios";
import ButtonLoading from "../buttons/ButtonLoading";
import { Store_customiza_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";

type SEOFormValues = z.infer<typeof SEO_schema>;

export default function SEOSettingsPage({ defaultData }: { defaultData: any }) {
  const {toast} = useToast();

  const form = useForm<SEOFormValues>({
    resolver: zodResolver(SEO_schema),
    defaultValues: defaultData,
  });

  const submit = async (data: SEOFormValues) => {
    try {
      await Store_customiza_Update({SEOSchema:data});
      toast({
        title: "SEO Settings Updated",
        description: "Your SEO settings have been updated successfully.",
        duration: 2000,
      })
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Error Updating SEO Settings",
        description: "There was an error updating your SEO settings. Please try again later.",
        duration: 2000,
      })
    }
  };

  const t = useTranslations("storeCustomizations");

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-4">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-blue-400">
        {t("SEO Setting")}
      </h1>
      <section className="px-4 md:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            {/* Favicon Icon */}
            <FormField
              control={form.control}
              name="faviconIcon"
              render={({ field }) => (
                <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Banner Description</FormLabel>
                  <div className="w-full col-span-3">
                    <Upload_Image
                      name="faviconIcon"
                      value={field.value}
                      onChange={field.onChange}
                    />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaTitle"
              render={({ field }) => (
                <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Meta Title</FormLabel>
                  <div className="w-full col-span-3">
                    <Input placeholder="Meta Title" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaDescription"
              render={({ field }) => (
                <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Meta Title</FormLabel>
                  <div className="w-full col-span-3">
                    <Textarea placeholder="Meta Title" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaKeywords"
              render={({ field }) => (
                <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Meta Title</FormLabel>
                  <div className="w-full col-span-3">
                    <Textarea placeholder="Meta Title" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="metaUrl"
              render={({ field }) => (
                <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Meta Title</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="url" placeholder="Meta Title" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <ButtonLoading
              name="Save Changes"
              loading={form.formState.isSubmitting}
            />
          </form>
        </Form>
      </section>
    </div>
  );
}
