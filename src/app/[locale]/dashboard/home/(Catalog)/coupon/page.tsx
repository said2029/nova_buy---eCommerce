"use client";
import { Coupon_Create, Coupon_Update } from "@/Actions/quires";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import Coupon_Table from "@/components/dashboard/tables/Coupon_Table";
import Upload_Image from "@/components/dashboard/utils/Upload_Image";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { addCoupon, updateCoupon } from "@/Redux/Actions/Coupon";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import * as zod from "zod";

const CouponSchema = zod.object({
  name: zod.string(),
  code: zod.string(),
  discount: zod.string(),
  time_validate: zod.string(),
  MaxUse: zod.string(),
  Image: zod.string(),
  _id: zod.string().optional(),
});

export default function page({params:{locale}}:{params:{locale:string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Coupon");
  const [filter, set_filter] = useState<{ search: string }>({ search: "" });
  const { toast } = useToast();
  const ref_SheetButton = useRef<HTMLButtonElement>(null);
  const [ModeForm, setMode] = useState<"create" | "update">("create");
  const dispatch = useDispatch();
  const form = useForm<zod.infer<typeof CouponSchema>>({
    resolver: zodResolver(CouponSchema),
  });

  const Create_Coupon = async (value: any) => {
    try {
      const data = await Coupon_Create(value);
      dispatch(addCoupon(data));
      toast({
        title: t("Coupon Created"),
        description: t("Coupon_Message_Success"),
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: "Error Creating Coupon",
        description: error?.message,
        duration: 2000,
      });
    }
  };

  const Update_Coupon = async (value: any) => {
    try {
      const data = await Coupon_Update(value._id, value);
      dispatch(updateCoupon(data));
      toast({
        title: "Successfully",
        description: t("Coupon_Message_Success"),
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: "Error updating coupon",
        description: error?.message,
        variant: "destructive",
      });
    }
  };
  const submit = async (value: zod.infer<typeof CouponSchema>) => {
    if (ModeForm == "create") {
      console.log("ddddd");
      await Create_Coupon(value);
      ref_SheetButton.current?.click();
    } else {
      // Update Coupon
      await Update_Coupon(value);
      ref_SheetButton.current?.click();
    }
  };
  return (
    <MainProviderPerants name={t("Coupon")}>
      <section className="bg-gray-400/10 flex-wrap sm:flex-nowrap rounded-md w-full py-5 px-3 flex gap-2">
        <Input
          onChange={(value) => {
            set_filter({ ...filter, search: value.currentTarget.value });
          }}
          placeholder="Search...."
        />
        <SheetControlle
          onClick={() => {
            setMode("create");
            form.reset();
          }}
          SheetTriggerRef={ref_SheetButton}
          buttonName={t("Add Coupon")}
          tital={ModeForm == "create" ? t("Add Coupon") : t("Update Coupon")}
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="Image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Upload_Image
                        name="Image_Coupon"
                        onChange={field.onChange}
                        value={field.value}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("Coupon Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("Coupon Code")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="discount"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("Coupon discount")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="time_validate"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="date"
                        placeholder={t("Coupon Time End")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="MaxUse"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder={t("Coupon Max Using")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading
                className="static w-full"
                name={
                  ModeForm == "create" ? t("Add Coupon") : t("Update Coupon")
                }
                loading={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </SheetControlle>
        <Button
          onClick={() => {
            set_filter({ search: "" });
          }}
          className="h-12"
        >
          {t("Restart")}
        </Button>
      </section>
      <section className="mt-5 rounded-md p-2 bg-gray-400/10 ">
        <Coupon_Table
          filter={filter}
          openEdit={(value: any) => {
            ref_SheetButton.current?.click();
            setMode("update");
            form.setValue("name", value.name || "");
            form.setValue("code", value.code || "");
            form.setValue("discount", value.discount.toString() || "");
            form.setValue("time_validate", value.time_validate || "");
            form.setValue("MaxUse", value.MaxUse.toString() || "");
            form.setValue("Image", value.Image || "");
            form.setValue("_id", value._id || "");
          }}
        />
      </section>
    </MainProviderPerants>
  );
}
