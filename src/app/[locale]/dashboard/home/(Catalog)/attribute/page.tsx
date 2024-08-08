"use client";
import { Attribute_Create, Attribute_Update } from "@/Actions/quires";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import Attribute_Table from "@/components/dashboard/tables/Attribute_Table";
import Selector from "@/components/dashboard/utils/Selector";
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
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { addAttribute, updateAttribute } from "@/Redux/Actions/Attribute";
import { zodResolver } from "@hookform/resolvers/zod";
import { Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import React, { useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { z } from "zod";

const AttributeSchema = z.object({
  name: z.string(),
  option: z.enum(["dropdown", "checkbox", "radio"]).default("dropdown"),
  values: z.array(
    z.object({
      name: z.string(),
      publiched: z.boolean().default(false),
    })
  ),
  _id: z.string().optional(),
});

export default function page() {
  const { toast } = useToast();
  const t = useTranslations("Attributes");
  const [filterQuerys, setFilterQueris] = useState<{ search: string }>({
    search: "",
  });
  const [ModeForm, setModeForm] = useState<"create" | "update">("create");
  const SheetController = useRef<any>(null);

  const form = useForm<z.infer<typeof AttributeSchema>>({
    resolver: zodResolver(AttributeSchema),
  });
  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "values",
  });

  const dispatch = useDispatch();

  const CreateAttribute = async (value: z.infer<typeof AttributeSchema>) => {
    try {
      const data = await Attribute_Create(value);
      toast({
        title: t("Success"),
        description: t("Success_Message"),
      });
      dispatch(addAttribute(data));
      SheetController?.current?.click();
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: "Error",
        description: t("Error_Message"),
        variant: "destructive",
      });
    }
  };
  const UpdateAttribute = async (value: z.infer<typeof AttributeSchema>) => {
    try {
      const data = await Attribute_Update(value._id || "", value);
      toast({
        title: t("Success"),
        description: t("Success_Message_updated"),
      });
      dispatch(updateAttribute(data));
      SheetController?.current?.click();
    } catch (error: any) {
      console.log(error?.message);
      toast({
        title: t("Error_updating"),
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdateOpen = (item: z.infer<typeof AttributeSchema> | any) => {
    SheetController.current.click();
    setModeForm("update");
    form.setValue("name", item.name);
    form.setValue("_id", item._id);
    form.setValue("option", item.option);
    item.values.map((item: any) => {
      append({ name: item.name, publiched: item.publiched });
    });
  };

  const submit = async (value: z.infer<typeof AttributeSchema>) => {
    if (ModeForm == "create") {
      await CreateAttribute(value);
    } else {
      await UpdateAttribute(value);
    }
  };

  return (
    <MainProviderPerants name="Attributes">
      <section className="bg-gray-400/10 flex-wrap sm:flex-nowrap rounded-md w-full py-5 px-3 flex gap-2">
        <Input
          onChange={(value) =>
            setFilterQueris({
              ...filterQuerys,
              search: value.currentTarget.value,
            })
          }
          placeholder={t("Search")}
        />
        <SheetControlle
          onClick={() => {
            setModeForm("create");
            form.reset();
          }}
          SheetTriggerRef={SheetController}
          buttonName={t("Add Attribute")}
          tital={
            ModeForm == "create" ? t("Add Attribute") : t("Update Attribute")
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
                      <Input placeholder={t("Attribute Name")} {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="option"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Selector
                        value={field.value}
                        defaultName={field.value}
                        options={["dropdown", "checkbox", "radio"]}
                        onChange={field.onChange}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="py-2 text-center w-full font-semibold">
                {t("Option Attribute")} ({fields.length})
              </div>

              {fields.map((item, index) => {
                return (
                  <>
                    <FormField
                      key={Math.random() * index}
                      control={form.control}
                      name={`values.${index}.name`}
                      render={({ field }) => (
                        <FormItem className="flex gap-2 items-center">
                          <Input placeholder={t("Option Name")} {...field} />
                          <Button
                            size="icon"
                            type="button"
                            className="text-red-400"
                            onClick={() => {
                              remove(index);
                            }}
                          >
                            <Trash />
                          </Button>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name={`values.${index}.publiched`}
                      render={({ field }) => (
                        <FormItem className="flex gap-3 items-center">
                          <FormLabel>{t("Published")}</FormLabel>
                          <Switch
                            defaultChecked={field.value}
                            onCheckedChange={(value) => {
                              field.onChange(value);
                            }}
                          />
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </>
                );
              })}
              <Button
                onClick={() => {
                  append({ name: "", publiched: true });
                }}
                type="button"
                className="w-full"
              >
                {t("Add Option")}
              </Button>

              <ButtonLoading
                loading={form.formState.isSubmitting}
                className="static w-full"
                name={
                  ModeForm == "create"
                    ? t("Add Attribute")
                    : t("Update Attribute")
                }
              />
            </form>
          </Form>
        </SheetControlle>
        <Button className="h-12">{t("Restart")}</Button>
      </section>
      <section className="bg-gray-400/10 flex-wrap mt-5 sm:flex-nowrap rounded-md w-full py-5 px-3 flex gap-2">
        <Attribute_Table filterQueris={filterQuerys} openEdit={handleUpdateOpen} />
      </section>
    </MainProviderPerants>
  );
}
