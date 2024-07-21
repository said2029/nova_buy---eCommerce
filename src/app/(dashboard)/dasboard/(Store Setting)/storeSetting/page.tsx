"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

const StoreSettingsSchema = z.object({
  enableCashOnDelivery: z.string(),
  enableStripePayment: z.string(),
  stripeKey: z.string(),
  stripeSecret: z.string(),
  enableRazorPay: z.string(),
  razorPayId: z.string(),
  razorPaySecret: z.string(),
  enableGoogleLogin: z.string(),
  googleClientId: z.string(),
  googleSecretKey: z.string(),
  enableGoogleAnalytics: z.string(),
  googleAnalyticKey: z.string(),
  enableTawkChat: z.string(),
  tawkChatPropertyId: z.string(),
  tawkChatWidgetId: z.string(),
});
export default function page() {
  const form = useForm<z.infer<typeof StoreSettingsSchema>>({
    resolver: zodResolver(StoreSettingsSchema),
  });
  return (
    <MainProviderPerants name="Store Setting">
      <section className="px-40 py-9 bg-gray-400/10 rounded-md">
        <Form {...form}>
          <form>
            <FormField
              control={form.control}
              name="enableCashOnDelivery"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Enable Cash OnDelivery</FormLabel>
                  <div className="w-full col-span-3">
                    <Switch {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableGoogleLogin"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Enable Google Login</FormLabel>
                  <div className="w-full col-span-3">
                    <Switch {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleClientId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Google Client Id</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="password"  placeholder="Google ClientId" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleSecretKey"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Google Secret Key</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="password" placeholder="Google Secret Key" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableStripePayment"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Enable Stripe Payment</FormLabel>
                  <div className="w-full col-span-3">
                    <Switch {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="stripeKey"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
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
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
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
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Enable RazorPay</FormLabel>
                  <div className="w-full col-span-3">
                    <Switch {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="razorPayId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
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
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Razor PaySecret</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="password" placeholder="Razor PaySecret" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableTawkChat"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Enable Tawk Chat</FormLabel>
                  <div className="w-full col-span-3">
                    <Switch {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tawkChatPropertyId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">tawkChatPropertyId</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="password" placeholder="Tawk Chat Property Id" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="tawkChatWidgetId"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Tawk Chat Widget Id</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="password" placeholder="Tawk Chat Widget Id" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enableGoogleAnalytics"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap gap-6  place-items-center">
                  <FormLabel className="w-full">Enable Google Analytics</FormLabel>
                  <div className="w-full col-span-3">
                    <Switch {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="googleAnalyticKey"
              render={({ field }) => (
                <FormItem className="grid grid-cols-4 text-nowrap text-start gap-6  place-items-center ">
                  <FormLabel className="w-full">Google Analytic Key</FormLabel>
                  <div className="w-full col-span-3">
                    <Input type="password" placeholder="Google Analytic Key" {...field} />
                    <FormMessage />
                  </div>
                </FormItem>
              )}
            />

            <Button className="fixed bottom-2 right-2">Save Configuration</Button>
          </form>
        </Form>
      </section>
    </MainProviderPerants>
  );
}
