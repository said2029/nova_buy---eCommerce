"use client";
import { Setting_Store_Update } from "@/Actions/quires";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import * as z from "zod";

const StoreSettingsSchema = z.object({
  enableCashOnDelivery: z.boolean().optional(),
  enableStripePayment: z.boolean().optional(),
  stripeKey: z.string(),
  stripeSecret: z.string(),
  enableRazorPay: z.boolean().optional(),
  razorPayId: z.string(),
  razorPaySecret: z.string(),
  enableGoogleLogin: z.boolean().optional(),
  googleClientId: z.string(),
  googleSecretKey: z.string(),
  enableGoogleAnalytics: z.boolean().optional(),
  googleAnalyticKey: z.string(),
  enableTawkChat: z.boolean().optional(),
  tawkChatPropertyId: z.string(),
  tawkChatWidgetId: z.string(),
});

export default function FormSetting_Store({
  defaultData,
}: {
  defaultData: any;
}) {
  const {toast} = useToast();
  const form = useForm<z.infer<typeof StoreSettingsSchema>>({
    resolver: zodResolver(StoreSettingsSchema),
    defaultValues: defaultData,
  });
  const submit = async (value: z.infer<typeof StoreSettingsSchema>) => {
    await Setting_Store_Update(value);

    toast({
      title: "Store Setting Updated",
      description: "Your store settings have been updated successfully.",
      duration: 2000,
    });
    form.reset();
  };
  const t = useTranslations("StoreSetting");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(submit)}>
        <FormField
          control={form.control}
          name="enableCashOnDelivery"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4 text-nowrap gap-6 place-items-center">
              <FormLabel className="w-full">
                {"Enable Cash OnDelivery"}
              </FormLabel>
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
          name="enableGoogleLogin"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Enable Google Login</FormLabel>
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
          name="googleClientId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Google Client Id</FormLabel>
              <div className="w-full col-span-3">
                <Input
                  type="password"
                  placeholder="Google ClientId"
                  {...field}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="googleSecretKey"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Google Secret Key</FormLabel>
              <div className="w-full col-span-3">
                <Input
                  type="password"
                  placeholder="Google Secret Key"
                  {...field}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableStripePayment"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Enable Stripe Payment</FormLabel>
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
          name="stripeKey"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Stripe Key</FormLabel>
              <div className="w-full col-span-3">
                <Input type="password" placeholder="Stripe Key" {...field} />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="stripeSecret"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Stripe Secret</FormLabel>
              <div className="w-full col-span-3">
                <Input type="password" placeholder="Stripe Secret" {...field} />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableRazorPay"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Enable RazorPay</FormLabel>
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
          name="razorPayId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Razor PayId</FormLabel>
              <div className="w-full col-span-3">
                <Input type="password" placeholder="Razor PayId" {...field} />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="razorPaySecret"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Razor PaySecret</FormLabel>
              <div className="w-full col-span-3">
                <Input
                  type="password"
                  placeholder="Razor PaySecret"
                  {...field}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableTawkChat"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Enable Tawk Chat</FormLabel>
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
          name="tawkChatPropertyId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">tawkChatPropertyId</FormLabel>
              <div className="w-full col-span-3">
                <Input
                  type="password"
                  placeholder="Tawk Chat Property Id"
                  {...field}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="tawkChatWidgetId"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Tawk Chat Widget Id</FormLabel>
              <div className="w-full col-span-3">
                <Input
                  type="password"
                  placeholder="Tawk Chat Widget Id"
                  {...field}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="enableGoogleAnalytics"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap gap-6  place-items-center">
              <FormLabel className="w-full">Enable Google Analytics</FormLabel>
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
          name="googleAnalyticKey"
          render={({ field }) => (
            <FormItem className="grid grid-cols-1 md:grid-cols-4  text-nowrap text-start gap-6  place-items-center ">
              <FormLabel className="w-full">Google Analytic Key</FormLabel>
              <div className="w-full col-span-3">
                <Input
                  type="password"
                  placeholder="Google Analytic Key"
                  {...field}
                />
                <FormMessage />
              </div>
            </FormItem>
          )}
        />

        <ButtonLoading
          name={t("Save Configuration")}
          loading={form.formState.isSubmitting}
        />
      </form>
    </Form>
  );
}
