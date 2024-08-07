"use client";
import { Privacy_TC_schema } from "@/Types";
import React from "react";
import { z } from "zod";
import Tag_Hr from "./Tag";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Switch } from "@/components/ui/switch";
import Upload_Image from "../utils/Upload_Image";
import { Input } from "@/components/ui/input";
import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";
import axios from "axios";
import ButtonLoading from "../buttons/ButtonLoading";
import { Store_customiza_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";
const TextEditor = dynamic(() => import("../utils/RichText_editor"), {
  ssr: false,
});

type schemaP_T = z.infer<typeof Privacy_TC_schema>;
export default function Privacy_Policy_and_TC({
  
  defaultData,
}: {
  defaultData: any;
}) {
  
  const {toast} = useToast();
  const form = useForm<schemaP_T>({
    resolver: zodResolver(Privacy_TC_schema),
    defaultValues: defaultData,
  });
  const t = useTranslations("storeCustomizations");

  const submit = async (data: schemaP_T) => {
    try {
      await Store_customiza_Update({PrivacyTCSchema:data});
      toast({
        title: "Privacy Policy and T&C updated successfully",
        description: "Your Privacy Policy and T&C settings have been updated successfully.",
        duration: 2000,
      })
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Failed to update Privacy Policy and T&C",
        description: "An error occurred while updating your Privacy Policy and T&C settings.",
        duration: 2000,
      })
    }
  };
  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-2">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-teal-600">
        {t("Privacy Policy and T&C")}
      </h1>
      <section className="px-4 md:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <Tag_Hr name="Privacy Policy" />
            <section className="px-4">
              <FormField
                control={form.control}
                name="privacyPolicy.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Enable</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch
                        defaultChecked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacyPolicy.background"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">background Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        onChange={field.onChange}
                        value={field.value}
                        name="privacyPolicy.background"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacyPolicy.title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="Title" />
                      <FormMessage />

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="privacyPolicy.pageContent"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Content</FormLabel>
                    <div className="w-full col-span-3">
                      <TextEditor
                        onChange={field.onChange}
                        value={field.value}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>
            <Tag_Hr name="Terms And Conditions" />
            <section className="px-4">
              <FormField
                control={form.control}
                name="termsAndConditions.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Enable</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch
                        defaultChecked={field.value}
                        onCheckedChange={(value) => field.onChange(value)}
                      />

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="termsAndConditions.background"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">background Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        value={field.value}
                        onChange={field.onChange}
                        name="privacyPolicy.background"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="termsAndConditions.title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="Title" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="termsAndConditions.pageContent"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Content</FormLabel>
                    <div className="w-full col-span-3">
                      <TextEditor
                        onChange={field.onChange}
                        value={field.value}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
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
