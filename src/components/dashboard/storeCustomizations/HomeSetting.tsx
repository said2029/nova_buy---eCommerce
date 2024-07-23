"use client";
import React from "react";
import { HomeSettingSchema } from "@/Types";
import { Controller, useFieldArray, useForm } from "react-hook-form";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Upload_Image from "../utils/Upload_Image";
import Tag_Hr from "./Tag";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { MultiSelectTest } from "../utils/MultiSelelecor";
import { Textarea } from "@/components/ui/textarea";

const Menu_Editor = [
  "categories",
  "aboutUs",
  "contactUs",
  "offers",
  "faq",
  "privacyPolicy",
  "termsAndConditions",
  "pages",
  "myAccount",
  "login",
  "logout",
  "checkout",
];
export default function HomeSetting() {
  const form = useForm<z.infer<typeof HomeSettingSchema>>({
    resolver: zodResolver(HomeSettingSchema),
    defaultValues: {
      sliderHero: [
        {
          sliderImages: "",
          sliderTitle: "",
          sliderDescription: "",
          sliderButtonName: "",
          sliderButtonLink: "",
        },
        {
          sliderImages: "",
          sliderTitle: "",
          sliderDescription: "",
          sliderButtonName: "",
          sliderButtonLink: "",
        },
        {
          sliderImages: "",
          sliderTitle: "",
          sliderDescription: "",
          sliderButtonName: "",
          sliderButtonLink: "",
        },
        {
          sliderImages: "",
          sliderTitle: "",
          sliderDescription: "",
          sliderButtonName: "",
          sliderButtonLink: "",
        },
        {
          sliderImages: "",
          sliderTitle: "",
          sliderDescription: "",
          sliderButtonName: "",
          sliderButtonLink: "",
        },
      ],
      footerBlocks: [
        {
          active: "",
          title: "",
          link1: "",
          link2: "",
          link3: "",
          link4: "",
        },
        {
          active: "",
          title: "",
          link1: "",
          link2: "",
          link3: "",
          link4: "",
        },
        {
          active: "",
          title: "",
          link1: "",
          link2: "",
          link3: "",
          link4: "",
        },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "sliderHero",
  });
  const {
    fields: fields2,
    append: append2,
    remove: remove2,
  } = useFieldArray({
    control: form.control,
    name: "footerBlocks",
  });

  const submit = (value: z.infer<typeof HomeSettingSchema>) => {
    console.log(value);
  };

  return (
    <div className="bg-gray-200/10 rounded-md mt-10 p-2">
      <h1 className="font-semibold text-2xl pl-4 border-s-4 border-red-400">
        Home Setting
      </h1>
      <hr className="my-3 border-2 bg-background" />
      <section className="px-4 md:px-10">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)}>
            <Tag_Hr name="Header Contacts" />
            <section>
              <FormField
                control={form.control}
                name="headerText"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Contact Us</FormLabel>
                    <div className="w-full col-span-3">
                      <Input type="text" {...field} placeholder="header Text" />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="phoneNumber"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Phone Number</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="text"
                        {...field}
                        placeholder="Phone Number"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="headerLogoImage"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Header Logo Image</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        name="headerLogoImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Menu Editor" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 md:px-28">
              {Menu_Editor.map((item: any, i: any) => {
                return (
                  <FormField
                    key={i}
                    control={form.control}
                    name={item}
                    render={({ field }) => (
                      <FormItem className="text-nowrap gap-6">
                        <FormLabel className="w-full">{field.name}</FormLabel>
                        <div className="w-full col-span-3">
                          <Input {...field} placeholder={field.name} />
                          <FormMessage />
                        </div>
                      </FormItem>
                    )}
                  />
                );
              })}
            </div>

            <Tag_Hr name="Main Slider" />
            <section>
              <Tabs defaultValue="Slider 1">
                <TabsList className="bg-gray-200/10 h-16 flex flex-wrap w-full">
                  <TabsTrigger value="Slider 1">Slider 1</TabsTrigger>
                  <TabsTrigger value="Slider 2">Slider 2</TabsTrigger>
                  <TabsTrigger value="Slider 3">Slider 3</TabsTrigger>
                  <TabsTrigger value="Slider 4">Slider 4</TabsTrigger>
                  <TabsTrigger value="Slider 5">Slider 5</TabsTrigger>
                </TabsList>

                {fields.map((fields, index) => {
                  return (
                    <TabsContent key={index} value={`Slider ${index + 1}`}>
                      <Controller
                        control={form.control}
                        name={`sliderHero.${index}.sliderImages`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">
                              Slider Images
                            </FormLabel>
                            <div className="w-full col-span-3">
                              <Upload_Image
                                name={`sliderHero.${index}.sliderImages`}
                                value={field.value}
                                onChange={field.onChange}
                              />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`sliderHero.${index}.sliderTitle`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">
                              Slider Title
                            </FormLabel>
                            <div className="w-full col-span-3">
                              <Input
                                type="text"
                                placeholder="Slider Title"
                                {...field}
                              />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`sliderHero.${index}.sliderDescription`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">
                              Slider Description
                            </FormLabel>
                            <div className="w-full col-span-3">
                              <Textarea
                                placeholder="Slider Description"
                                {...field}
                              />

                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`sliderHero.${index}.sliderButtonName`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">
                              Slider Button Name
                            </FormLabel>
                            <div className="w-full col-span-3">
                              <Input
                                placeholder="Slider Button Name"
                                {...field}
                              />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`sliderHero.${index}.sliderButtonLink`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">
                              Slider Button Link
                            </FormLabel>
                            <div className="w-full col-span-3">
                              <Input
                                placeholder="Slider Button Link"
                                {...field}
                              />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </TabsContent>
                  );
                })}
              </Tabs>
            </section>

            <Tag_Hr name="Discount Coupon Code Box" />
            <section>
              <Controller
                control={form.control}
                name="superDiscountCouponIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Show Discount Coupon
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="superDiscountTitle"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Super Discount Title
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Discount Title" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="superDiscountCouponsCode"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Active Coupon Code</FormLabel>
                    <div className="w-full col-span-3">
                      <MultiSelectTest
                        onChange={field.onChange}
                        valueSelect={field.value}
                        options={["sdfsdf", "dsfsdfs"]}
                        name="Coupons"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Promotion Banner" />
            <section>
              <Controller
                control={form.control}
                name="promotionBannerIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Show Promotion Banner
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="promotionBannerTitle"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Promotion Banner Title
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Promotion Banner Title" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="promotionBannerDescription"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Banner Description</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea
                        placeholder="Banner Description
"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="promotionBannerButtonName"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Button Name</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Button Name" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="promotionBannerButtonLink"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Button Link</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Button Link" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Popular Products" />
            <section>
              <Controller
                control={form.control}
                name="popularProductsIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Show PopularProducts
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="popularProductsTitle"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Popular Products Title
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Popular Products Title" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="popularProductsDiscriotion"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Products Limit</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea
                        placeholder="Products Limit
"
                        {...field}
                      />

                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />

              <Controller
                control={form.control}
                name="popularProductsProductsLimit"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Popular Products ProductsLimit
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="number"
                        placeholder="Popular Products ProductsLimit"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>
            <Tag_Hr name="Quick Delivery" />
            <section>
              <Controller
                control={form.control}
                name="popularProductsIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Show PopularProducts
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionImage"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Quick Delivery SectionImage
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        value={field.value}
                        name="quickDeliverySectionImage"
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionSubTitle"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Section SubTitle</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Section SubTitle" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionTitle"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Section Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Section Title" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionDescription"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Section Description
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea placeholder="Section Description" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionButtonName"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Section ButtonName</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Section ButtonName" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionButtonLink"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Section ButtonLink</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Section ButtonLink" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Latest Discounted Products" />
            <section>
              <Controller
                control={form.control}
                name="latestDiscountedProductsIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Show Latest Discounted Products
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="quickDeliverySectionImage"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Latest Discounted Products Title
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        placeholder="Latest Discounted Products Title"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="latestDiscountedProductsDescription"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Products Description
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea
                        placeholder="Latest Discounted Products Description"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="latestDiscountedProductsLimit"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Products Limit</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        type="number"
                        placeholder="Products Limit"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Get Your Daily Needs" />
            <section>
              <Controller
                control={form.control}
                name="getYourDailyNeedsIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Show</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitle"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Title</FormLabel>
                    <div className="w-full col-span-3">
                      <Input
                        placeholder="Get Your Daily Needs Title"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsDescription"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Description</FormLabel>
                    <div className="w-full col-span-3">
                      <Textarea
                        placeholder="Get Your Daily Needs Description"
                        {...field}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitleImageLeft"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Title Image Left</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                        value={field.value}
                        onChange={field.onChange}
                        name="getYourDailyNeedsTitleImageLeft"
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitleImageRight"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Title Image Right</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                      name="getYourDailyNeedsTitleImageRight"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitleButton1Image"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Title Button 1 Image
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                      name="getYourDailyNeedsTitleButton1Image"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitleButton1Link"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Title Button 1 Image
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Title Button 1 Image" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitleButton2Image"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Title Button 2 Image
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                      name="getYourDailyNeedsTitleButton2Image"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="getYourDailyNeedsTitleButton2Link"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Title Button 2 Image
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Title Button 2 Image" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Feature Promo Section" />
            <section>
              <Controller
                control={form.control}
                name="featurePromoIsActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Show Promo Section</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="featurePromoSectionFreeShipping"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Free Shipping</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Free Shipping" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="featurePromoSectionSupport"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Section Support</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Section Support" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="featurePromoSectionSupport"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Secure Payment</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Secure Payment" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="featurePromoSectionLatestOffer"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Section Latest Offer
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Section Latest Offer" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Tag_Hr name="Footer" />
            <section className="md:px-10">
              {fields2.map((block, index) => {
                return (
                  <div key={index}>
                    <Tag_Hr name={`Section ${index + 1}`} />
                    <section className="px-6">
                      <Controller
                        control={form.control}
                        name={`footerBlocks.${index}.active`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">Active</FormLabel>
                            <div className="w-full col-span-3">
                              <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`footerBlocks.${index}.title`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">Title</FormLabel>
                            <div className="w-full col-span-3">
                              <Input placeholder="Title" {...field} />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`footerBlocks.${index}.link1`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">Link1</FormLabel>
                            <div className="w-full col-span-3">
                              <Input placeholder="Link1" {...field} />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`footerBlocks.${index}.link2`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">Link2</FormLabel>
                            <div className="w-full col-span-3">
                              <Input placeholder="Link2" {...field} />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`footerBlocks.${index}.link3`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">Link3</FormLabel>
                            <div className="w-full col-span-3">
                              <Input placeholder="Link3" {...field} />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                      <Controller
                        control={form.control}
                        name={`footerBlocks.${index}.link4`}
                        render={({ field }) => (
                          <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                            <FormLabel className="w-full">Link4</FormLabel>
                            <div className="w-full col-span-3">
                              <Input placeholder="Link4" {...field} />
                              <FormMessage />
                            </div>
                          </FormItem>
                        )}
                      />
                    </section>
                  </div>
                );
              })}
              <Tag_Hr name={`Section ${fields2.length + 1}`} />
              <section className="px-6">
                <Controller
                  control={form.control}
                  name="footerBlock.active"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Active</FormLabel>
                      <div className="w-full col-span-3">
                        <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.footerLogo"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Footer Logo</FormLabel>
                      <div className="w-full col-span-3">
                        <Upload_Image
                        name="footerBlock.footerLogo"
                          value={field.value}
                          onChange={field.onChange}
                        />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.address"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Address</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Address" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.email"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Email</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Email" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.phone"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Phone</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Phone" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </section>
              <Tag_Hr name="Social Links" />
              <section className="px-6">
                <Controller
                  control={form.control}
                  name="footerBlock.socialLinks.active"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Active</FormLabel>
                      <div className="w-full col-span-3">
                        <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.socialLinks.facebook"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">facebook</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="facebook" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.socialLinks.linkedin"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Linkedin</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Linkedin" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.socialLinks.pinterest"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Pinterest</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Pinterest" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.socialLinks.twitter"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">Twitter</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Twitter" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
                <Controller
                  control={form.control}
                  name="footerBlock.socialLinks.whatsApp"
                  render={({ field }) => (
                    <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                      <FormLabel className="w-full">WhatsApp</FormLabel>
                      <div className="w-full col-span-3">
                        <Input placeholder="Phone" {...field} />
                        <FormMessage />
                      </div>
                    </FormItem>
                  )}
                />
              </section>
            </section>

            <Tag_Hr name="Payment Method" />
            <section>
              <Controller
                control={form.control}
                name="paymentMethodActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Show PaymentMethod</FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="paymentMethodImage"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">PaymentMethod Logo</FormLabel>
                    <div className="w-full col-span-3">
                      <Upload_Image
                      name="paymentMethodImage"
                        value={field.value}
                        onChange={field.onChange}
                      />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>
            <Tag_Hr name="Footer Bottom Contact" />
            <section>
              <Controller
                control={form.control}
                name="footerBottomContactActive"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">
                      Show Bottom Contact
                    </FormLabel>
                    <div className="w-full col-span-3">
                      <Switch onCheckedChange={value=> field.onChange(value.toString())} {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
              <Controller
                control={form.control}
                name="footerBottomContactNumber"
                render={({ field }) => (
                  <FormItem className="grid  grid-cols-1 md:grid-cols-4 text-nowrap gap-6  place-items-center">
                    <FormLabel className="w-full">Contact Number</FormLabel>
                    <div className="w-full col-span-3">
                      <Input placeholder="Contact Number" {...field} />
                      <FormMessage />
                    </div>
                  </FormItem>
                )}
              />
            </section>

            <Button className="fixed bottom-2 right-2">Save Changes</Button>
          </form>
        </Form>
      </section>
    </div>
  );
}
