"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import Upload_Image from "../utils/Upload_Image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import Tag_Hr from "./Tag";
import { faqs_schema } from "@/Types";
import { Switch } from "@/components/ui/switch";
import { Trash2 } from "lucide-react";

type FaqsFormValues = z.infer<typeof faqs_schema>;

export default function FAQs() {
  const form = useForm<FaqsFormValues>({
    resolver: zodResolver(faqs_schema),
    defaultValues: {
      pageHeader: {
        enable: "false",
        pageHeaderBackground: "",
        pageTitle: "",
      },
      leftColumn: {
        enable: "false",
        leftImage: "",
      },
      faqs: {
        enable: "false",
        faq: [
          { faqTitle: "", faqDescription: "" },
          { faqTitle: "", faqDescription: "" },
          { faqTitle: "", faqDescription: "" },
          { faqTitle: "", faqDescription: "" },
          { faqTitle: "", faqDescription: "" },
        ],
      },
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs.faq",
  });

  const submit = (data: FaqsFormValues) => {
    console.log(data);
  };

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-2">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-red-400">
        FAQs
      </h1>
      <section className="px-4 md:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <Tag_Hr name="Page Header" />
            <section>
              <FormField
                control={form.control}
                name="pageHeader.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Enable</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageHeader.pageHeaderBackground"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Page Header Background
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        name="pageHeader.pageHeaderBackground"
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
                name="pageHeader.pageTitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Page Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="Page Title" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Left Column" />
            <section>
              <FormField
                control={form.control}
                name="leftColumn.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Enable</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="leftColumn.leftImage"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Left Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        name="leftColumn.leftImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <div className="flex justify-between w-full items-center">
            <Tag_Hr name="FAQs" />
            <Button
                type="button"
                onClick={() => append({ faqTitle: "", faqDescription: "" })}
              >
                Add FAQ
              </Button>
            </div>

            <section>
              <FormField
                control={form.control}
                name="faqs.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Enable</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              {fields.map((field, index) => (
                <div key={field.id} className="mb-4">
                  <FormField
                    control={form.control}
                    name={`faqs.faq.${index}.faqTitle`}
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                        <FormLabel className="w-full">FAQ Title</FormLabel>
                        <div className="w-full col-span-3">
                          <div className="flex gap-4">
                            <Input
                              type="text"
                              {...field}
                              placeholder="FAQ Title"
                            />{" "}
                            <Button
                              size="icon"
                              type="button"
                              onClick={() => remove(index)}
                              variant="destructive"
                            >
                              <Trash2 />
                            </Button>
                          </div>
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`faqs.faq.${index}.faqDescription`}
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                        <FormLabel className="w-full">
                          FAQ Description
                        </FormLabel>
                        <div className="w-full col-span-3">
                          <Textarea {...field} placeholder="FAQ Description" />
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                </div>
              ))}
            </section>

            <Button className="fixed bottom-2 right-2">Save Changes</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
