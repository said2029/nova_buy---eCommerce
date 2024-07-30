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
import { useTranslations } from "next-intl";
import { useRef, useState } from "react";
import { OurStaff_Create, OurStaff_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";
import ButtonLoading from "@/components/dashboard/buttons/ButtonLoading";

const formSchema = z.object({
  image: z.string().min(0),
  name: z.string().min(2),
  email: z.string().min(2),
  role: z.string().default("Manager"),
  phone: z.string().min(2),
  password: z.string().min(2),
  _id: z.string().optional(),
});

export default function page() {
  const { toast } = useToast();
  const [ModeForm, setModeForm] = useState<"create" | "update">("create");
  const t = useTranslations("Our staff");
  const ref_SheetButton = useRef<HTMLButtonElement>(null);

  const [filterData, setfilterData] = useState<{
    search: string;
    role: string;
  }>({ role: "", search: "" });

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

  const submit = async (value: z.infer<typeof formSchema>) => {
    if (ModeForm == "create") {
      try {
        await OurStaff_Create(value);
        toast({
          title: "Success",
          description: "Staff Added Successfully",
          duration: 2000,
        });
        formAddStaff.reset();
        ref_SheetButton.current?.click();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error?.message,
          duration: 2000,
          variant: "destructive",
        });
      }
    } else {
      try {
        await OurStaff_Update(value);
        toast({
          title: "Success",
          description: "Staff Updated Successfully",
          duration: 2000,
        });
        formAddStaff.reset();
        ref_SheetButton.current?.click();
      } catch (error: any) {
        toast({
          title: "Error",
          description: error?.message,
          duration: 2000,
          variant: "destructive",
        });
      }
    }
  };

  const OpenUpdateStaff = (staff: z.infer<typeof formSchema> | any) => {
    // code for update staff
    formAddStaff.setValue("email", staff?.email);
    formAddStaff.setValue("image", staff.image);
    formAddStaff.setValue("name", staff.name);
    formAddStaff.setValue("phone", staff.phone);
    formAddStaff.setValue("password", staff.password);
    formAddStaff.setValue("role", staff.role);
    formAddStaff.setValue("_id", staff._id);
    ref_SheetButton.current?.click();
    setModeForm("update");
  };

  return (
    <MainProviderPerants name={t("Our staff")}>
      <section className="bg-gray-500/10 p-3 flex-wrap sm:flex-nowrap rounded-md flex gap-3 z-0">
        <Input
          className="h-12"
          type="text"
          onChange={(value) => {
            setfilterData({ ...filterData, search: value.currentTarget.value });
          }}
          placeholder={t("Search")}
        />
        <Selector
          onChange={(value) => {
            console.log(value);
            setfilterData({ ...filterData, role: value });
          }}
          className="h-12"
          options={[
            "Admin",
            "Delivery Person",
            "Security Guard",
            "Driver",
            "Accountant",
            "Manager",
            "CEO",
          ]}
          defaultName={filterData.role == "" ? "All" : filterData.role}
        />
        <SheetControlle
          onClick={() => {
            setModeForm("create");
          }}
          icon={<Plus />}
          buttonName={t("Add Staff")}
          tital={ModeForm == "create" ? t("Add Staff") : t("Update Staff")}
          SheetTriggerRef={ref_SheetButton}
        >
          <Form {...formAddStaff}>
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
                      <Upload_Image
                        name="image_staff"
                        multiImages={false}
                        value={field.value}
                        onChange={field.onChange}
                      />
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
                      <Input placeholder={t("Name")} {...field} />
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
                      <Input
                        disabled={ModeForm == "update"}
                        type="email"
                        placeholder={t("email")}
                        {...field}
                      />
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
                        placeholder={t("password")}
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
                      <Select
                        value={field.value}
                        onValueChange={field.onChange}
                      >
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
                        placeholder={t("Contact Number")}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <ButtonLoading
                className="static w-full"
                name={ModeForm == "create" ? t("Add Staff") : t("Update Staff")}
                loading={formAddStaff.formState.isSubmitting}
              />
            </form>
          </Form>
        </SheetControlle>
        <Button
          onClick={() => {
            setfilterData({ role: "", search: "" });
          }}
          type="button"
          className="w-28 h-12"
        >
          {t("Restart")}
        </Button>
      </section>
      <section className="bg-gray-500/10 p-3 rounded-md mt-10">
        <OurStaff_Table quiresFilter={filterData} openEdit={OpenUpdateStaff} />
      </section>
    </MainProviderPerants>
  );
}
