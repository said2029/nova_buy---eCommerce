import { MultiSelectTest } from "@/components/dashboard/utils/MultiSelelecor";
import { ReduxSelector } from "@/Redux/store";
import { useCallback, useEffect } from "react";
import { useFieldArray, UseFormReturn } from "react-hook-form";
import { useSelector } from "react-redux";
import { fromShcema_Product } from "@/Types";
import * as zod from "zod";
import { FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";

export default function Add_Attribute_Form({
  AttributeSelect,
  setAttributeSelect,
  form,
}: {
  AttributeSelect: Array<any>;
  setAttributeSelect: any;
  form?: UseFormReturn<zod.infer<typeof fromShcema_Product>>;
}) {
  const { Attribute } = useSelector(ReduxSelector);
  const { fields, remove } = useFieldArray({
    name: "attribute",
    control: form?.control,
  });

  // useEffect(() => {
  // }, []);

  const Change = () => {
    const body = AttributeSelect.map((item: any) => {
      const attri = Attribute.attributes.find(
        (item1: any) => item1._id == item.attribute.value
      );
      return {
        attribute_id: item.attribute.value,
        values: item?.values?.map((i: any) => {
          return {
            name: i.name,
          };
        }),
      };
    });
    form?.setValue("attribute", body);
  };

  return (
    <>
      <section className="flex flex-col gap-4 w-full">
        <MultiSelectTest
          valueSelect={AttributeSelect.map((item: any) => item.attribute)}
          onChange={(value) => {
            setAttributeSelect(
              value.map((item, index) => {
                return {
                  attribute: item,
                  ...(AttributeSelect[index]?.values && {
                    values: AttributeSelect[index]?.values,
                  }),
                };
              })
            );
          }}
          options={Attribute?.attributes.map((item: any) => {
            return { value: item._id, name: item.name };
          })}
        />
        {AttributeSelect.length >= 1 && (
          <>
            <hr />
          </>
        )}

        {AttributeSelect?.map((item: any, index: number) => {
          return (
            <MultiSelectTest
              key={item.attribute.value}
              onChange={(value) => {
                const newAttri = [...AttributeSelect];
                newAttri[index] = {
                  ...newAttri[index],
                  values: value,
                };
                setAttributeSelect(newAttri);
                Change();
              }}
              options={Attribute.attributes
                .find((item1: any) => item1._id == item.attribute.value)
                .values.map((i: any) => {
                  return { value: i._id, name: i.name };
                })}
              valueSelect={AttributeSelect[index]?.values}
            />
          );
        })}
        <Table className="mt-10 bg-gray-500/40 rounded-md">
          <TableHeader>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Sale Price</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Stock</TableCell>
              <TableCell>Action</TableCell>
            </TableRow>
          </TableHeader>
          <TableBody>
            {fields?.map((item2, index1: number) => {
              return item2?.values?.map((item: any, index2: number) => {
                return (
                  <TableRow key={item.name}>
                    <TableCell>{item.name}</TableCell>
                    <TableCell>
                      <FormField
                        control={form?.control}
                        name={`attribute.${index1}.values.${index2}.salePrice`}
                        render={({ field }) => {
                          return (
                            <Input
                              type="number"
                              {...field}
                              placeholder="Sale Price"
                            />
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form?.control}
                        name={`attribute.${index1}.values.${index2}.price`}
                        render={({ field }) => {
                          return (
                            <Input
                              type="number"
                              {...field}
                              placeholder="Price"
                            />
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <FormField
                        control={form?.control}
                        name={`attribute.${index1}.values.${index2}.stock`}
                        render={({ field }) => {
                          return (
                            <Input
                              type="number"
                              {...field}
                              placeholder="stock"
                            />
                          );
                        }}
                      />
                    </TableCell>
                    <TableCell>
                      <Button
                        onClick={() => {
                          remove(index1);
                          const new1 = [...AttributeSelect];
                          new1.splice(index1, 1);
                          setAttributeSelect(new1);
                        }}
                        size="icon"
                      >
                        <Trash2 className="text-red-500" strokeWidth={1} />
                      </Button>
                    </TableCell>
                  </TableRow>
                );
              });
            })}
          </TableBody>
        </Table>
      </section>
    </>
  );
}
