"use client";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import Products_Table from "@/components/dashboard/tables/Products_Table";
import { MultiSelectTest } from "@/components/dashboard/utils/MultiSelelecor";
import Selector from "@/components/dashboard/utils/Selector";
import Upload_Image from "@/components/dashboard/utils/Upload_Image";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import Image from "next/image";
import { X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useRef } from "react";

const fromshcema = zod.object({
  titel: zod.string(),
  discription: zod.string(),
  salePrice: zod.string(),
  category: zod.string(),
  subCategory: zod.array(zod.string()),
  stock: zod.string(),
  images: zod.array(zod.string()).min(1),
  colors: zod.array(zod.string()).default([]),
  size: zod.array(zod.string()).default([]),
  price: zod.string(),
});

export default function page() {
  const t = useTranslations("productPage");
  const form = useForm<zod.infer<typeof fromshcema>>({
    resolver: zodResolver(fromshcema),
  });

  const submit = (value: zod.infer<typeof fromshcema>) => {
    console.log(value);
    form.reset();
  };

  const endDrag = (res: any) => {
    const to_Index = res.destination.index;
    const From_Index = res.source.index;
    const temp = [...form.getValues("images")]
      .toSpliced(From_Index, 1)
      .toSpliced(to_Index, 0, form.getValues("images")[From_Index]);

    form.setValue("images", temp);
  };

  const ref_SheetButton = useRef<HTMLButtonElement>(null);

  return (
    <MainProviderPerants name="Products">
      <section>
        <div className="bg-gray-400/10 w-full py-5 px-4 rounded-md flex flex-wrap gap-5">
          <Input
            className="flex-grow sm:max-w-72 xl:max-w-[50%]"
            type="text"
            placeholder={t("Search")}
          />
          <Selector
            defaultName="Categoy"
            className="flex-grow sm:max-w-28"
            name="Category"
            options={["1", "dsf"]}
          />
          <Selector
            defaultName="Price"
            className="flex-grow sm:max-w-28"
            name="Price"
            options={["Low To High", "High To Low", "Published", "UnPublished"]}
          />
          <span className="flex-grow hidden md:block"></span>
          <SheetControlle
            SheetTriggerRef={ref_SheetButton}
            tital={t("Add Product")}
            buttonName={t("Add Product")}
          >
            <Form {...form}>
              <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
                <FormField
                  control={form.control}
                  name="images"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <>
                          <Upload_Image
                            name={Math.random().toString()}
                            multiImages={true}
                            value={field.value}
                            onChange={field.onChange}
                          />
                          <DragDropContext onDragEnd={endDrag}>
                            <Droppable direction="horizontal" droppableId="1">
                              {(provided) => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.droppableProps}
                                  className="flex gap-1 flex-wrap  justify-around items-center"
                                >
                                  {field?.value?.map((item, i) => {
                                    return (
                                      <Draggable
                                        key={i}
                                        draggableId={i.toString()}
                                        index={i}
                                      >
                                        {(provided2) => (
                                          <span
                                            className="w-24 h-25 border relative border-dashed border-gray-400"
                                            {...provided2.dragHandleProps}
                                            {...provided2.draggableProps}
                                            ref={provided2.innerRef}
                                          >
                                            <Button
                                              onClick={() => {
                                                form.setValue(
                                                  "images",
                                                  field.value.filter(
                                                    (_, index) => index !== i
                                                  )
                                                );
                                              }}
                                              type="button"
                                              size={"sm"}
                                              className="absolute top-1 right-1 bg-red-400"
                                            >
                                              <X size={16} />
                                            </Button>
                                            <Image
                                              src={item}
                                              width={512}
                                              height={512}
                                              alt={item}
                                            />
                                          </span>
                                        )}
                                      </Draggable>
                                    );
                                  })}
                                  {provided.placeholder}
                                </div>
                              )}
                            </Droppable>
                          </DragDropContext>
                        </>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="titel"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t("Title")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="discription"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input placeholder={t("Discription")} {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div className="flex gap-2">
                  <FormField
                    control={form.control}
                    name="salePrice"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            step={0.1}
                            type="number"
                            placeholder={t("Sale Price")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="price"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input
                            step={0.1}
                            type="number"
                            placeholder={t("Price")}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormField
                  control={form.control}
                  name="stock"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder={t("Price")}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="category"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <Selector
                          defaultName="Category"
                          options={["1", "dsf"]}
                          value={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="subCategory"
                  render={({ field }) => (
                    <FormItem>
                      <FormControl>
                        <MultiSelectTest
                          options={["1", "dsf"]}
                          name="SubCategory"
                          valueSelect={field.value}
                          onChange={field.onChange}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" className="w-full">
                  {t("Add Product")}
                </Button>
              </form>
            </Form>
          </SheetControlle>
          <Button className="h-12">{t("Filter")} </Button>
          <Button className="h-12">{t("Filter")} </Button>
        </div>
        <div className="mt-8 p-4 bg-gray-400/10 rounded-md">
          <Products_Table
            openEdit={() => {
              console.log("click button");
              ref_SheetButton.current?.click();
            }}
          />
        </div>
      </section>
    </MainProviderPerants>
  );
}
