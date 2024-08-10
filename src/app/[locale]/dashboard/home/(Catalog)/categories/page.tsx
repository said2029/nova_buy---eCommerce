"use client";
import {
  Categorys_Create,
  Categorys_Update,
  Subcategories_Get_all,
} from "@/Actions/quires";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import Category_Table from "@/components/dashboard/tables/Category_Table";
import { MultiSelectTest } from "@/components/dashboard/utils/MultiSelelecor";
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
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/components/ui/use-toast";
import { addCategory, updateCategory } from "@/Redux/Actions/Category";
import { ReduxSelector } from "@/Redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";
import { unstable_setRequestLocale } from "next-intl/server";
import { useEffect, useMemo, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import * as zod from "zod";

const CategorySchema = zod.object({
  name: zod.string().min(3).max(255),
  image: zod.string().url(),
  description: zod.string(),
  subcategories: zod.array(
    zod.object({
      name: zod.string(),
      value: zod.string(),
    })
  ),
  _id: zod.string().optional(),
});

export default function page({params:{locale}}:{params:{locale:string}}) {
  unstable_setRequestLocale(locale);
  const t = useTranslations("Category");
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [ModeForm, setModeForm] = useState<"create" | "update">("create");
  const [filter, set_filter] = useState<{ search: String }>({ search: "" });
  const form = useForm<zod.infer<typeof CategorySchema>>({
    resolver: zodResolver(CategorySchema),
  });
  const ref_SheetButton = useRef<HTMLButtonElement>(null);
  const SubCategories = useSelector(ReduxSelector).subCategury.subCateguries;

  const Create = async (value: any) => {
    try {
      const sub = value.subcategories.map((item: any) => {
        return item.value;
      });
      const data = await Categorys_Create({ ...value, subcategories: sub });
      data.all_sub_Categories = value.subcategories;

      dispatch(addCategory(data));
      toast({
        title: t("Success"),
        description: t("Category_Message_create"),
        duration: 2000,
      });
      ref_SheetButton.current?.click();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const update = async (value: any) => {
    try {
      const sub = value.subcategories.map((item: any) => {
        return item.value;
      });
      const data = await Categorys_Update(value._id, {
        ...value,
        subcategories: sub,
      });
      data.all_sub_Categories = value.subcategories;

      dispatch(updateCategory(data));
      toast({
        title: t("Success"),
        description: t("Category_Message_Update"),
        duration: 2000,
      });
      ref_SheetButton.current?.click();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        variant: "destructive",
      });
    }
  };
  const submit = async (value: zod.infer<typeof CategorySchema>) => {
    if (ModeForm == "create") {
      await Create(value);
    } else {
      await update(value);
    }
  };
  return (
    <MainProviderPerants name="Category">
      <section className="bg-gray-400/10 rounded-md w-full flex-wrap sm:flex-nowrap py-5 px-3 flex gap-2">
        <Input
          onChange={(value) =>
            set_filter({
              ...filter,
              search: value.currentTarget.value,
            })
          }
          className="flex-grow"
          placeholder="Search...."
        />
        <SheetControlle
          onClick={() => {
            setModeForm("create");
            form.reset();
          }}
          SheetTriggerRef={ref_SheetButton}
          buttonName={t("Add Category")}
          tital={
            ModeForm == "create" ? t("Add Category") : t("Update_Category")
          }
        >
          <Form {...form}>
            <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
              <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Upload_Image
                        name="image_gategory"
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
                      <Input placeholder={t("Category Name")} {...field} />
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
                      <Textarea
                        placeholder={t("Category Description")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="subcategories"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <MultiSelectTest
                        name="SubCategories"
                        valueSelect={field.value}
                        onChange={field.onChange}
                        options={SubCategories.map((item:any)=>{
                          return { value: item._id, name: item.name };
                        })}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading
                className="static w-full"
                loading={form.formState.isSubmitting}
                name={
                  ModeForm == "create"
                    ? t("Add Category")
                    : t("Update_Category")
                }
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
          {t("Restar")}
        </Button>
      </section>
      <section className="bg-gray-400/10 rounded-md p-2 mt-5">
        <Category_Table
          filter={filter}
          openEdit={(value: any) => {
            ref_SheetButton.current?.click();
            setModeForm("update");
            form.setValue("name", value.name);
            form.setValue("image", value.image);
            form.setValue("description", value.description);
            const valueCategories = value.all_sub_Categories.map(
              (item: any) => {
                return { value: item._id, name: item.name };
              }
            );
            form.setValue("subcategories", valueCategories);
            form.setValue("_id", value._id);
          }}
        />
      </section>
    </MainProviderPerants>
  );
}
