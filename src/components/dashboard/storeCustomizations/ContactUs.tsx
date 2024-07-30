"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contact_us_schema } from "@/Types";
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
import Tag_Hr from "./Tag";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import ButtonLoading from "../buttons/ButtonLoading";
import { Store_customiza_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";

type ContactUsFormValues = z.infer<typeof contact_us_schema>;

export default function ContactUs({ defaultData }: { defaultData: any }) {
  const {toast} = useToast();

  const form = useForm<ContactUsFormValues>({
    resolver: zodResolver(contact_us_schema),
    defaultValues: defaultData,
  });

  const submit = async (data: ContactUsFormValues) => {
    try {
      await Store_customiza_Update({ContactUsSchema:data});
      toast({
        title: "Contact Us Form Submitted",
        description: "Your contact us form has been submitted successfully.",
        duration: 2000,
      })
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Error Occurred",
        description: "An error occurred while submitting your contact us form.",
        duration: 2000,
      })
    }
  };
  const t = useTranslations("storeCustomizations");

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-2">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-blue-400">
        {t("Contact Us")}
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
                        onCheckedChange={(value) => field.onChange(value)}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="pageHeader.backgroundImage"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Background Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        name="pageHeader.backgroundImage"
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

            <Tag_Hr name="Email Us Box" />
            <section>
              <FormField
                control={form.control}
                name="emailUsBox.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="emailUsBox.title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="emailUsBox.email"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Email</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="email" {...field} placeholder="Email" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="emailUsBox.text"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Text</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Text" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Call Us Box" />
            <section>
              <FormField
                control={form.control}
                name="callUsBox.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="callUsBox.title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="callUsBox.phone"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Phone</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="Phone" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="callUsBox.text"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Text</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Text" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Address Box" />
            <section>
              <FormField
                control={form.control}
                name="addressBox.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="addressBox.title"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="addressBox.address"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Address</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="Address" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Middle Left Column" />
            <section>
              <FormField
                control={form.control}
                name="middleLeftColumn.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="middleLeftColumn.middleLeftImage"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Middle Left Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        name="middleLeftColumn.middleLeftImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Contact Form" />
            <section>
              <FormField
                control={form.control}
                name="contactForm.enable"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
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
                name="contactForm.contactFormTitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Contact Form Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Contact Form Title"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contactForm.contactFormDescription"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Contact Form Description
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea
                        {...field}
                        placeholder="Contact Form Description"
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
