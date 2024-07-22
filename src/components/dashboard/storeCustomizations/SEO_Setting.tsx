"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
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

type SEOFormValues = z.infer<typeof SEO_schema>;

export default function SEOSettingsPage() {
  const form = useForm<SEOFormValues>({
    resolver: zodResolver(SEO_schema),
    defaultValues: {
      faviconIcon: "",
      metaTitle: "",
      metaDescription: "",
      metaUrl: "",
      metaKeywords: "",
    },
  });

  const submit = (data: SEOFormValues) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-4">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-blue-400">
        SEO Settings
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
              name="metaKeywords"
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
            <Button className="fixed bottom-2 right-2">Save Changes</Button>

          </form>
        </Form>
      </section>
    </div>
  );
}
