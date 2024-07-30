"use client";
import { useForm, useFieldArray } from "react-hook-form";
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
import { PlusCircle, Trash2 } from "lucide-react";
import axios from "axios";
import ButtonLoading from "../buttons/ButtonLoading";
import { Store_customiza_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";

type FaqsFormValues = z.infer<typeof faqs_schema>;

export default function FAQs({ defaultData }: { defaultData: any }) {
  const {toast} = useToast();

  const form = useForm<FaqsFormValues>({
    resolver: zodResolver(faqs_schema),
    defaultValues: defaultData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "faqs.faq",
  });

  const submit = async (data: FaqsFormValues) => {
    try {
      await Store_customiza_Update({FaqsSchema:data});
      toast({
        title: "FAQs updated successfully",
        description: "The FAQs page settings have been updated.",
        duration: 2000,
      })
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Failed to update FAQs",
        description: "An error occurred while updating the FAQs page settings.",
        duration: 2000,
      })
    }
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
                    <Switch
                        defaultChecked={field.value}
                        onCheckedChange={(value) =>
                          field.onChange(value)
                        }
                      />

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
                    <Switch
                        defaultChecked={field.value}
                        onCheckedChange={(value) =>
                          field.onChange(value)
                        }
                      />
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

            <div className="flex justify-between min-h-12 w-full items-center">
              <Tag_Hr name="FAQs" />
              <Button
                variant="ghost"
                size="icon"
                type="button"
                onClick={() => append({ faqTitle: "", faqDescription: "" })}
              >
                <PlusCircle />
              </Button>
            </div>

            <section>
              {fields.length >= 1 ? (
                <>
                  <FormField
                    control={form.control}
                    name="faqs.enable"
                    render={({ field }) => (
                      <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                        <FormLabel className="w-full">Enable</FormLabel>
                        <div className="w-full col-span-3">
                        <Switch
                        defaultChecked={field.value}
                        onCheckedChange={(value) =>
                          field.onChange(value.toString())
                        }
                      />

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
                              <Textarea
                                {...field}
                                placeholder="FAQ Description"
                              />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </div>
                  ))}
                </>
              ) : (
                <div className="flex justify-center items-center min-h-40">
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    className="w-60 h-60"
                    onClick={() => append({ faqTitle: "", faqDescription: "" })}
                  >
                    <PlusCircle size={60}/>
                  </Button>
                </div>
              )}
            </section>

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
