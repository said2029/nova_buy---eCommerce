"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import SubCategory_Table from "@/components/dashboard/tables/SubCategory_Table";
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { Subcategories_Create, Subcategories_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";
import {
  addSubCateguries,
  updateSubCateguries,
} from "@/Redux/Actions/SubCategory";
import { useDispatch } from "react-redux";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import { unstable_setRequestLocale } from "next-intl/server";

const schema = zod.object({
  name: zod.string().min(2),
  description: zod.string().min(2),
  _id: zod.string().optional(),
});

export default function page({params:{locale}}:{params:{locale:string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("SubCategory");
  const [filter, setFilter] = useState<{ search: string }>({ search: "" });
  const [ModeForm, setModeForm] = useState<"create" | "update">("create");
  const { toast } = useToast();
  const dispatch = useDispatch();

  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  const ref_SheetButton = useRef<HTMLButtonElement>(null);

  const Create = async (value: any) => {
    try {
      const data = await Subcategories_Create(value);
      dispatch(addSubCateguries(data));
      toast({
        title: t("Success"),
        description: t("Success_Message"),
      });
      ref_SheetButton.current?.click();
      form.reset();
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Error",
        description: error?.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  const Update = async (value: any) => {
    try {
      const data = await Subcategories_Update(value._id, value);
      dispatch(updateSubCateguries(data));
      toast({
        title: t("Success"),
        description: t("Success_Message"),
      });
      ref_SheetButton.current?.click();
    } catch (error:any) {
      toast({
        title: "Error",
        description: error?.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  };

  const submit = async (value: zod.infer<typeof schema>) => {
    if (ModeForm == "create") {
      await Create(value);
    } else {
      await Update(value);
    }
  };
  return (
    <MainProviderPerants name={t("subCategory")}>
      <section className="bg-gray-400/10 flex-wrap sm:flex-nowrap rounded-md w-full py-5 px-3 flex gap-2">
        <Input
          onChange={(value) =>
            setFilter({ ...filter, search: value.currentTarget.value })
          }
          placeholder="Search...."
        />
        <SheetControlle
          SheetTriggerRef={ref_SheetButton}
          buttonName={t("Add subCategory")}
          tital={
            ModeForm == "create"
              ? t("Add subCategory")
              : t("Update_subCategory")
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("subCategory Title")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder={t("Display Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading
                className="static w-full"
                name={
                  ModeForm == "create"
                    ? t("Add subCategory")
                    : t("Update_subCategory")
                }
                loading={form.formState.isSubmitting}
              />
            </form>
          </Form>
        </SheetControlle>
        <Button onClick={() => setFilter({ search: "" })} className="h-12">
          {t("Restart")}
        </Button>
      </section>
      <section className="bg-gray-400/10 p-2 mt-5 rounded-md">
        <SubCategory_Table
          filter={filter}
          openEdit={(item: any) => {
            ref_SheetButton.current?.click();
            setModeForm("update");
            form.setValue("description", item.description);
            form.setValue("_id", item._id);
            form.setValue("name", item.name);
            // dispatch(editProduct(id));
          }}
        />
      </section>
    </MainProviderPerants>
  );
}
