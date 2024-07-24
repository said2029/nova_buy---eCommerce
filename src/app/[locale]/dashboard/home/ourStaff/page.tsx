"use client";
import { SheetControlle } from "@/components/dashboard/SheetProvider";
import OurStaff_Table from "@/components/dashboard/tables/Table_Staff";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import Selector from "@/components/dashboard/utils/Selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import Upload_Image from "@/components/dashboard/utils/Upload_Image";
import { useRef } from "react";

const formSchema = z.object({
  image: z.string().min(0).default("image"),
  name: z.string().min(2),
  email: z.string().min(2),
  role: z.string(),
  phone: z.string().min(2),
  password: z.string().min(2),
});

export default function page() {
  const formAddStaff = useForm<z.infer<typeof formSchema>>({
    mode: "onChange",
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      role: "Admin",
      phone: "",
      password: "",
      image: "",
    },
  });


  const submit = (value: z.infer<typeof formSchema>) => {
    console.log("sdfdsfdsfdsf");
    console.log(value);
    formAddStaff.reset();
  };

  return (
    <MainProviderPerants name="Our staff">
      <section className="bg-gray-500/10 p-3 flex-wrap sm:flex-nowrap rounded-md flex gap-3 z-0">
        <Input className="h-12" placeholder="Search...." />
        <Selector className="h-12" options={["ddfsd"]} defaultName="role" />
        <SheetControlle
          icon={<Plus />}
          buttonName="Add Staff"
          tital="Add Staff"
        >
          <Form  {...formAddStaff}>
            <form
              onSubmit={formAddStaff.handleSubmit(submit)}
              className="space-y-3"
            >
              <FormField
                control={formAddStaff.control}
                name="image"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Upload_Image name="image_staff" multiImages={false} value={field.value} onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAddStaff.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input placeholder="Name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAddStaff.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input type="email" placeholder="email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAddStaff.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="password"
                        placeholder="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAddStaff.control}
                name="role"
                defaultValue="Admin"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Select value={field.value} onValueChange={field.onChange}>
                        <SelectTrigger>{field.value}</SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Admin">
                            <p>Admin</p>
                          </SelectItem>
                          <SelectItem value="CEO">
                            <p>CEO</p>
                          </SelectItem>
                          <SelectItem value="Manager">
                            <p>Manager</p>
                          </SelectItem>
                          <SelectItem value="Accountant">
                            <p>Accountant</p>
                          </SelectItem>
                          <SelectItem value="Driver">
                            <p>Driver</p>
                          </SelectItem>
                          <SelectItem value="Security Guard">
                            <p>Security Guard</p>
                          </SelectItem>
                          <SelectItem value="Delivery Person">
                            <p>Delivery Person</p>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </FormControl>
                      <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={formAddStaff.control}
                name="phone"
                render={({ field }) => (
                  <FormItem>
                    <FormControl>
                      <Input
                        type="text"
                        placeholder="Contact Number"
                        {...field}
                      />
                    </FormControl>
                      <FormMessage />
                  </FormItem>
                )}
              />
              <Button className="w-full">Add Staff</Button>
            </form>
          </Form>
        </SheetControlle>
        <Button className="w-28 h-12">Filter</Button>
        <Button type="button" className="w-28 h-12">
          Restat
        </Button>
      </section>
      <section className="bg-gray-500/10 p-3 rounded-md mt-10">
        <OurStaff_Table />
      </section>
    </MainProviderPerants>
  );
}
