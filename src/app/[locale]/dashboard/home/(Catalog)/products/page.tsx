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
import { useRef, useState } from "react";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import {
  Product_Create,
  Product_Update,
  Subcategories_Get_all,
} from "@/Actions/quires";
import { useDispatch } from "react-redux";
import { addProduct, updateProduct } from "@/Redux/Actions/Products";
import { useToast } from "@/components/ui/use-toast";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import Add_Attribute_Form from "./_components/add_attribute_form";
import { fromShcema_Product as fromshcema } from "@/Types";
import clsx from "clsx";

export default function page() {
  const t = useTranslations("productPage");
  const [ModeForm, setModeForm] = useState<"create" | "update">("create");
  const [Combination, setCombination] = useState<boolean>(false);
  const { Category } = useSelector(ReduxSelector);
  const [singlCategorySelect, setSinglCategorySelect] = useState<any>({});
  const ref_SheetButton = useRef<HTMLButtonElement>(null);

  const dispatch = useDispatch();
  const { toast } = useToast();

  const [filter, set_filter] = useState<{
    search?: string;
    isActive?: string;
    PriceSort?: number;
    category?: string;
  }>({ PriceSort: 1, search: "", isActive: undefined, category: undefined });
  const [AttributeSelect, setAttributeSelect] = useState<
    Array<{
      attribute: { name: string; value: string };
      values?: Array<{ name: string; value: string }>;
    }>
  >([]);

  const form = useForm<zod.infer<typeof fromshcema>>({
    resolver: zodResolver(fromshcema),
  });
  const CategoryOptions = Category.categories.map((item: any) => {
    return { name: item?.name, value: item?._id };
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
  const Update = async (value: any) => {
    try {
      const sub = value.subCategory.map((item: any) => {
        return item.value;
      });
      const Attri = value.attribute.map((attr: any) => {
        return { name: attr?.name };
      });
      const data = await Product_Update(value!._id, {
        ...value,
        subCategory: sub,
        Attrubute: Attri,
      });
      data.subCategory = value.subCategory;
      dispatch(updateProduct(data));
      ref_SheetButton.current?.click();
      toast({
        title: t("Success"),
        description: t("Product_Message_Update"),
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: t("Error"),
        description: error?.message,
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const submit = async (value: zod.infer<typeof fromshcema>) => {
    if (ModeForm === "create") {
      await Create(value);
    } else {
      await Update(value);
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
                )?.name,
              });
            }}
            defaultName="Categoy"
            className="flex-grow "
            name="Category"
            options={CategoryOptions}
          />
          <Selector
            onChange={(value) => {
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
              setAttributeSelect([]);
              setCombination(false);
            }}
            SheetTriggerRef={ref_SheetButton}
            tital={
              ModeForm === "create" ? t("Add Product") : t("Update Product")
            }
            buttonName={t("Add Product")}
          >
            <section className="flex justify-end items-center mb-6 gap-3">
              <p>Combination</p>
              <Switch
                defaultChecked={Combination}
                onCheckedChange={(value) => {
                  setCombination(value);
                }}
              />
            </section>
            <Tabs defaultChecked defaultValue="1">
              <TabsList>
                <TabsTrigger
                  defaultChecked
                  className="px-9 py-2 rounded-md"
                  value="1"
                >
                  {t("Product_Info")}
                </TabsTrigger>
                {Combination && (
                  <TabsTrigger className="px-9 py-2 rounded-md " value="2">
                    {t("Combination")}
                  </TabsTrigger>
                )}
              </TabsList>
              <TabsContent value="1">
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(submit)}
                    className="space-y-4"
                  >
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
                                <Droppable
                                  direction="horizontal"
                                  droppableId="1"
                                >
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
                                                        (_, index) =>
                                                          index !== i
                                                      )
                                                    );
                                                  }}
                                                  type="button"
                                                  size={"sm"}
                                                  className="absolute top-1 right-1 bg-teal-600"
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
                            <Textarea
                              placeholder={t("Discription")}
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div
                      className={clsx("flex gap-2", {
                        "opacity-60": Combination,
                        "pointer-events-none": Combination,
                      })}
                    >
                      <FormField
                        control={form.control}
                        name="salePrice"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Input
                                className="min-w-full"
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
                              disabled={Combination}
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
                                  return { name: item?.name, value: item?._id };
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
              </TabsContent>
              {Combination && (
                <TabsContent className="flex gap-5" value="2">
                  <Add_Attribute_Form
                    form={form}
                    AttributeSelect={AttributeSelect}
                    setAttributeSelect={setAttributeSelect}
                  />
                </TabsContent>
              )}
            </Tabs>
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
            openEdit={(item: any) => {
              ref_SheetButton.current?.click();
              setModeForm("update");
              setAttributeSelect([]);
              form.setValue("discription", item.discription);
              form.setValue("_id", item?._id);
              form.setValue("titel", item?.titel);
              form.setValue("price", item?.price);
              form.setValue("salePrice", item?.salePrice);
              form.setValue("stock", item?.stock);
              form.setValue("images", item?.images);
              form.setValue("category", item?.category[0]?._id);
              SetCategorySelect();

              const sub = item?.sub_categories?.map((item: any) => {
                return { name: item?.name, value: item._id };
              });
              form.setValue("subCategory", sub);

              const Attribute = item?.attribute?.map(
                (attri: any, index: number) => {
                  return {
                    attribute_id: attri?.attribute_id,
                    attribute: {
                      name: item?.Attrubute[index]?.name,
                      value: attri?.attribute_id,
                    },
                    values: attri?.values?.map((v: any) => {
                      return {
                        name: v?.name,
                        value: v?._id,
                        salePrice: v?.salePrice,
                        price: v?.price,
                        stock: v?.stock,
                      };
                    }),
                  };
                }
              );
              form.setValue("attribute", Attribute);
              setAttributeSelect(Attribute);
              console.log("AttributeSelect  ", AttributeSelect);
              setCombination(Attribute.length >= 1);
            }}
          />
        </div>
      </section>
    </MainProviderPerants>
  );
}
