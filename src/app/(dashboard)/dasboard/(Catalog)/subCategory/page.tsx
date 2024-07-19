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

const schema = zod.object({
  name: zod.string().min(2),
  description: zod.string().min(2),
});

export default function page() {
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
  });
  return (
    <MainProviderPerants name="subCategory">
      <section className="bg-gray-400/10 rounded-md w-full py-5 px-3 flex gap-2">
        <Input placeholder="Search...." />
        <SheetControlle buttonName="Add subCategory" tital="Add subCategory">
          <Form {...form}>
            <form className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="subCategory Title" {...field} />
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
                      <Input placeholder="Display Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" className="w-full">
                Add subCategory
              </Button>
            </form>
          </Form>
        </SheetControlle>
        <Button className="h-12">Filter</Button>
        <Button className="h-12">Restart</Button>
      </section>
      <section className="bg-gray-400/10 p-2 mt-5 rounded-md">
        <SubCategory_Table />
      </section>
    </MainProviderPerants>
  );
}
