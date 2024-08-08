"use client";
import { Global_Setting_Update } from "@/Actions/quires";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { setSetting } from "@/Redux/Actions/Setting";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as z from "zod";

const SettingsSchema = z.object({
  numberOfImages: z.number(),
  defaultCurrency: z.string(),
  defaultTimeZone: z.string(),
  defaultDateFormat: z.string(),
  receiptSizeWidth: z.number(),
  shopName: z.string(),
  companyName: z.string(),
  vatNumber: z.number(),
  address: z.string(),
  postCode: z.number(),
  contactEmail: z.string(),
  website: z.string(),
});

export default function FormGlobalSetting({
  defualtData,
}: {
  defualtData: any;
}) {
  const { toast } = useToast();
  const t = useTranslations("SettingPage");
  const dispatch = useDispatch();
  const form = useForm<z.infer<typeof SettingsSchema>>({
    resolver: zodResolver(SettingsSchema),
    defaultValues: defualtData,
  });


  const submit = async (value: z.infer<typeof SettingsSchema>) => {
    const data = await Global_Setting_Update(value);
    dispatch(setSetting(data));
    toast({
      title: "Global Setting Updated",
      description: "Your global settings have been updated successfully.",
      duration: 2000,
    });

  };
  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(submit)}
        className="space-y-2"
        action=""
      >
        <FormField
          control={form.control}
          name="shopName"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 sm:grid-cols-4 text-nowrap gap-2 sm:gap-2  place-items-center">
              <FormLabel>{t("Shop Name")} </FormLabel>
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
                <Input
                  type="text"
                  {...field}
                  placeholder={t("Contact Email")}
                />
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
                <Input
                  type="text"
                  {...field}
                  placeholder={t("Default Currency")}
                />
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
                <Input
                  type="text"
                  {...field}
                  placeholder={t("Default DateFormat")}
                />
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
                <Input
                  type="text"
                  {...field}
                  placeholder={t("Default TimeZone")}
                />
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
                <Input
                  type="number"
                  defaultValue={field.value}
                  {...field}
                  onChange={(value) => {
                    field.onChange(+value.target.value);
                  }}
                  placeholder={t("Number Of Images")}
                />
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
                <Input
                  defaultValue={field.value}
                  onChange={(value) => {
                    field.onChange(+value.currentTarget.value);
                  }}
                  type="number"
                  placeholder={t("Post Code")}
                />
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
                <Input
                  defaultValue={field.value}
                  onChange={(value) => {
                    field.onChange(+value.currentTarget.value);
                  }}
                  type="number"
                  placeholder={t("Receipt Size Width")}
                />
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
                <Input
                  defaultValue={field.value}
                  onChange={(value) => {
                    field.onChange(+value.currentTarget.value);
                  }}
                  type="number"
                  placeholder={t("Vat Number")}
                />
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
        <ButtonLoading
          loading={form.formState.isSubmitting}
          name={t("Save Changes")}
        />
      </form>
    </Form>
  );
}
