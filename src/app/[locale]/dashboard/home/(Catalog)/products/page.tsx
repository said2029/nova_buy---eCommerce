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
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import { Product_Create } from "@/Actions/quires";
import { useDispatch } from "react-redux";
import { addProduct } from "@/Redux/Actions/Products";
import { useToast } from "@/components/ui/use-toast";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import { Textarea } from "@/components/ui/textarea";

const fromshcema = zod.object({
  titel: zod.string(),
  discription: zod.string(),
  salePrice: zod.string(),
  category: zod.string(),
  subCategory: zod.array(
    zod.object({
      name: zod.string(),
      value: zod.string(),
    })
  ),
  stock: zod.string(),
  images: zod.array(zod.string()).min(1),
  colors: zod.array(zod.string()).default([]),
  size: zod.array(zod.string()).default([]),
  price: zod.string(),
  _id: zod.string().optional(),
});

export default function page() {
  const t = useTranslations("productPage");
  const [ModeForm, setModeForm] = useState<"create" | "update">("create");
  const { subCategury, Category } = useSelector(ReduxSelector);
  const dispatch = useDispatch();
  const { toast } = useToast();
  const [filter, set_filter] = useState<{
    search?: string;
    isActive?: string;
    PriceSort?: number;
    category?: string;
  }>({ PriceSort: 1, search: "", isActive: undefined, category: undefined });
  const form = useForm<zod.infer<typeof fromshcema>>({
    resolver: zodResolver(fromshcema),
  });
  const [singlCategorySelect, setSinglCategorySelect] = useState<any>({});
  const ref_SheetButton = useRef<HTMLButtonElement>(null);
  const CategoryOptions = Category.categories.map((item: any) => {
    return { name: item.name, value: item._id };
  });

  const Create = async (value: any) => {
    try {
      const sub = value.subCategory.map((item: any) => {
        return item.value;
      });
      const data = await Product_Create({ ...value, subCategory: sub });
      data.subCategory = value.subCategory;
      dispatch(addProduct(data));
      toast({
        title: t("Success"),
        description: t("Product_Created_Success"),
        duration: 3000,
      });
      ref_SheetButton.current?.click();
    } catch (error: any) {
      toast({
        title: t("Error"),
        description: error?.message,
        duration: 3000,
      });
    }
  };

  const submit = async (value: zod.infer<typeof fromshcema>) => {
    if (ModeForm === "create") {
      await Create(value);
    } else {
      // // Update Product
      // await Product_Update(value);
      // ref_SheetButton.current?.click();
    }
  };

  const endDrag = (res: any) => {
    const to_Index = res.destination.index;
    const From_Index = res.source.index;
    const temp = [...form.getValues("images")]
      .toSpliced(From_Index, 1)
      .toSpliced(to_Index, 0, form.getValues("images")[From_Index]);

    form.setValue("images", temp);
  };

  const SetCategorySelect = () => {
    setSinglCategorySelect(
      Category.categories.find(
        (item: any) => item._id == form.getValues("category")
      )
    );
  };

  return (
    <MainProviderPerants name="Products">
      <section>
        <div className="bg-gray-400/10 w-full py-5 px-4 flex-wrap sm:flex-nowrap rounded-md flex gap-5">
          <Input
            onChange={(value) =>
              set_filter({ ...filter, search: value.currentTarget.value })
            }
            className="flex-grow"
            type="text"
            placeholder={t("Search")}
          />
          <Selector
            onChange={(value) => {
              set_filter({
                ...filter,
                category: CategoryOptions.find(
                  (item: any) => item.value == value
                ).name,
              });
            }}
            defaultName="Categoy"
            className="flex-grow "
            name="Category"
            options={CategoryOptions}
          />
          <Selector
            onChange={(value) => {
              console.log("   filter  ");
              if (value == "true" || value == "false") {
                set_filter({ ...filter, isActive: value });
              } else {
                set_filter({ ...filter, PriceSort: +value });
              }
            }}
            defaultName={"Price"}
            className="flex-grow"
            name="Price"
            options={[
              { name: "Low To High", value: "1" },
              { name: "High To Low", value: "-1" },
              { name: "Published", value: "true" },
              { name: "UnPublished", value: "false" },
            ]}
          />
          <span className="flex-grow hidden md:block"></span>
          <SheetControlle
            onClick={() => {
              setModeForm("create");
              form.reset();
              SetCategorySelect();
            }}
            SheetTriggerRef={ref_SheetButton}
            tital={
              ModeForm === "create" ? t("Add Product") : t("Update Product")
            }
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
                        <Textarea placeholder={t("Discription")} {...field} />
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
                          placeholder={t("stock")}
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
                          options={CategoryOptions}
                          value={field.value}
                          onChange={(value) => {
                            field.onChange(value);
                            SetCategorySelect();
                          }}
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
                          options={singlCategorySelect?.all_sub_Categories?.map(
                            (item: any) => {
                              return { name: item.name, value: item._id };
                            }
                          )}
                          name="SubCategory"
                          valueSelect={field.value}
                          onChange={field.onChange}
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
                    ModeForm === "create"
                      ? t("Add Product")
                      : t("Update Product")
                  }
                />
              </form>
            </Form>
          </SheetControlle>
          <Button
            onClick={() => {
              set_filter({
                search: "",
                category: undefined,
                isActive: undefined,
                PriceSort: 1,
              });
            }}
            className="h-12"
          >
            {t("Restar")}{" "}
          </Button>
        </div>
        <div className="mt-8 p-4 bg-gray-400/10 rounded-md">
          <Products_Table
            filter={filter}
            openEdit={(item:any) => {
              ref_SheetButton.current?.click();
              setModeForm("update");
              form.setValue("discription", item.discription);
              form.setValue("_id", item._id);
              form.setValue("titel", item.titel);
              form.setValue("price", item.price);
              form.setValue("salePrice", item.salePrice.$numberDecimal);
              form.setValue("stock", item.stock);
              form.setValue("images", item.images);
              form.setValue("category", item.category[0]._id);
              console.log(item.salePrice);
              SetCategorySelect();
              const sub = item.sub_categories.map((item:any)=>{
                return {name:item.name,value:item._id}
              })
              form.setValue("subCategory", sub);

            }}
          />
        </div>
      </section>
    </MainProviderPerants>
  );
}
