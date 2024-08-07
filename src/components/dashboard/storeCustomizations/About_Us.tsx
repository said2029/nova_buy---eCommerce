"use client";
import { useForm, Controller, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Upload_Image from "../utils/Upload_Image";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { About_us_schema } from "@/Types";
import { z } from "zod";
import Tag_Hr from "./Tag";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { PlusCircle, Trash2, X } from "lucide-react";
import { useTranslations } from "next-intl";
import axios from "axios";
import { Switch } from "@/components/ui/switch";
import ButtonLoading from "../buttons/ButtonLoading";
import { Store_customiza_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";

type AboutUsFormValues = z.infer<typeof About_us_schema>;

export default function page({ defaultData }: { defaultData: any }) {
  const {toast} = useToast();
  const form = useForm<AboutUsFormValues>({
    resolver: zodResolver(About_us_schema),
    defaultValues: defaultData,
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "ourTeam.member",
  });

  const submit = async (data: AboutUsFormValues) => {
    try {
      await Store_customiza_Update({AboutUsSchema:data});
      toast({
        title: "Changes Saved",
        description: "The changes have been saved successfully.",
      })
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Error Saving Changes",
        description: "An error occurred while saving the changes. Please try again.",
      })
    }
  };
  const t = useTranslations("storeCustomizations");

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-2">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-teal-600">
        {t("About US")}
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
                name="pageHeader.pageHeaderBackground"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Page Header Background
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        onChange={field.onChange}
                        name="pageHeader.pageHeaderBackground"
                        value={field.value}
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

            <Tag_Hr name="About Page" />
            <section>
              <FormField
                control={form.control}
                name="aboutPage.enable"
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
                name="aboutPage.topTitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Top Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="Top Title" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.topDescription"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Top Description</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Top Description" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.boxOneTitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Box One Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Box One Title"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.boxOneSubtitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Box One Subtitle</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Box One Subtitle"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.boxOneDescription"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Box One Description
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Box One Description" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.boxTwoTitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Box Two Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Box Two Title"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.boxTwoSubtitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Box Two Subtitle</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Box Two Subtitle"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="aboutPage.boxTwoDescription"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Box Two Description
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Box Two Description" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Page Top Content Right" />
            <section>
              <FormField
                control={form.control}
                name="pageTopContentRight.enable"
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
                name="pageTopContentRight.topContentRightImage"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Top Content Right Image
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        onChange={field.onChange}
                        name="pageTopContentRight.topContentRightImage"
                        value={field.value}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Content Section" />
            <section>
              <FormField
                control={form.control}
                name="contentSection.enable"
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
                name="contentSection.firstParagraph"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">First Paragraph</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="First Paragraph" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentSection.secondParagraph"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Second Paragraph</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Second Paragraph" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="contentSection.contentImage"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Content Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        onChange={field.onChange}
                        name="contentSection.contentImage"
                        value={field.value}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Our Team" />
            <section>
              <FormField
                control={form.control}
                name="ourTeam.enableThisBlock"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Enable This Block</FormLabel>
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
                name="ourTeam.ourTeamTitle"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">Our Team Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Our Team Title"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="ourTeam.ourTeamDescription"
                render={({ field }) => (
                  <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                    <FormLabel className="w-full">
                      Our Team Description
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea {...field} placeholder="Our Team Description" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Tabs className="mt-9 relative" defaultValue="Member 1">
                <TabsList className="bg-gray-200/10 min-h-16 h-fit max-h-24 overflow-y-auto py-2 flex flex-wrap w-full relative">
                  {fields.map((_, index) => (
                    <TabsTrigger value={`Member ${index + 1}`}>
                      Member {index + 1}
                    </TabsTrigger>
                  ))}
                  <Button
                    onClick={() => {
                      append({
                        ourTeamOneImage: "",
                        ourTeamOneTitle: "",
                        ourTeamOneSubTitle: "",
                      });
                    }}
                    variant="ghost"
                    className="absolute right-0 top-3 "
                  >
                    <PlusCircle />
                  </Button>
                </TabsList>

                {fields.map((_, index) => (
                  <TabsContent
                    className="relative"
                    value={`Member ${index + 1}`}
                  >
                    <Trash2
                      className="cursor-pointer text-red-400 hover:scale-110 duration-200"
                      onClick={() => {
                        remove(index);
                      }}
                    />
                    <FormField
                      key={index}
                      control={form.control}
                      name={`ourTeam.member.${index}.ourTeamOneImage`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                          <FormLabel className="w-full">
                            Member {index + 1} Image
                          </FormLabel>
                          <div className="w-full col-span-3">
                            <Upload_Image
                              onChange={field.onChange}
                              name={`ourTeam.member.${index}.ourTeamOneImage`}
                              value={field.value}
                            />
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      key={index}
                      control={form.control}
                      name={`ourTeam.member.${index}.ourTeamOneTitle`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                          <FormLabel className="w-full">
                            Member {index + 1} Title
                          </FormLabel>
                          <div className="w-full col-span-3">
                            <Input
                              type="text"
                              {...field}
                              placeholder="Member Title"
                            />
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                    <FormField
                      key={index}
                      control={form.control}
                      name={`ourTeam.member.${index}.ourTeamOneSubTitle`}
                      render={({ field }) => (
                        <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
                          <FormLabel className="w-full">
                            Member {index + 1} Subtitle
                          </FormLabel>
                          <div className="w-full col-span-3">
                            <Input
                              type="text"
                              {...field}
                              placeholder="Member Subtitle"
                            />
                            <FormMessage />
                          </div>
                        </FormItem>
                      )}
                    />
                  </TabsContent>
                ))}
              </Tabs>
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
