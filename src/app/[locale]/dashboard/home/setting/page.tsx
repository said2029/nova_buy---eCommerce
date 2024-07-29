"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

const SettingsSchema = z.object({
  numberOfImages: z.string(),
  defaultCurrency: z.string(),
  defaultTimeZone: z.string(),
  defaultDateFormat: z.string(),
  receiptSizeWidth: z.string(),
  shopName: z.string(),
  companyName: z.string(),
  vatNumber: z.string(),
  address: z.string(),
  postCode: z.string(),
  contactEmail: z.string(),
  website: z.string(),
});

export default function page() {
  const t = useTranslations("SettingPage");
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: {
      numberOfImages: "",
      defaultCurrency: "",
      defaultTimeZone: "",
      defaultDateFormat: "",
      receiptSizeWidth: "",
      shopName: "",
      companyName: "",
      vatNumber: "",
      address: "",
      postCode: "",
      contactEmail: "",
      website: "",
    },
  });

  const submit = (value:z.infer<typeof SettingsSchema>)=>{
    console.log(value);
  }
  return (
    <MainProviderPerants name={t("Setting")}>
      <section className="bg-gray-400/10 p-3 rounded-md md:px-10 lg:px-48 ">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(submit)} className="space-y-2"  action="">
            <FormField
              control={form.control}
              name="shopName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4 text-nowrap gap-2 sm:gap-2  place-items-center">
                  <FormLabel >{t("Shop Name")} </FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Shop Name")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="companyName"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Company Name")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Company Name")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="contactEmail"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Contact Email")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Contact Email")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultCurrency"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Default Currency")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Default Currency")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultDateFormat"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Default DateFormat")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Default DateFormat")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="defaultTimeZone"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Default TimeZone")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Default TimeZone")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="numberOfImages"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Number Of Images")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="number" {...field} placeholder={t("Number Of Images")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Address")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Address")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="postCode"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Post Code")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="number" {...field} placeholder={t("Post Code")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="receiptSizeWidth"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Receipt Size Width")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="number" {...field} placeholder={t("Receipt Size Width")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="vatNumber"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Vat Number")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="number" {...field} placeholder={t("Vat Number")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="website"
              render={({ field }) => (
                <FormItem className="grid grid-cols-1 sm:grid-cols-4  text-nowrap gap-2  place-items-center">
                  <FormLabel>{t("Website")}</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="text" {...field} placeholder={t("Website")} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
             <Button className="fixed bottom-2 right-2">{t("Save Changes")}</Button>
          </form>
        </Form>
      </section>
    </MainProviderPerants>
  );
}
