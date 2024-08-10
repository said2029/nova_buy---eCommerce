import { OurStaff_Create } from "@/Actions/quires";
import { AuthMode_schema } from "@/app/[locale]/auth/_components/ManageAuth";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonLoading from "../buttons/ButtonLoading";
const form_schema_signIn = z.object({
  name: z.string().min(10),
  email: z.string().email(),
  password: z.string().min(8).max(20),
  role: z.string(),
});
export default function Sign_up_dashboard({
  setMode,
}: {
  setMode: (name: AuthMode_schema) => void;
}) {
  const form = useForm<z.infer<typeof form_schema_signIn>>({
    resolver: zodResolver(form_schema_signIn),
  });
  const { toast } = useToast();
  const submit = async (value: z.infer<typeof form_schema_signIn>) => {
    try {
      const body = await OurStaff_Create(value);
      toast({
        title: "Success",
        description: "Your account has been created successfully",
        duration: 2000,
      });
      setMode("sign_in");
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col h-full justify-evenly items-center w-full px-3 space-y-9">
      <h1 className="font-semibold  justify-self-start text-3xl">Sign Up</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col w-full justify-center items-center gap-4"
          action=""
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input {...field} type="text" placeholder="full Name" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input {...field} type="email" placeholder="Email" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input {...field} type="password" placeholder="password" />
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-full">
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
                <FormMessage />
              </FormItem>
            )}
          />

          <p className="w-full text-sm flex gap-1 items-center text-nowrap">
            <input placeholder="dsf" type="checkbox" />I agree to the{" "}
            <span className="w-full text-sm cursor-pointer opacity-85 underline">
              privacy policy
            </span>
          </p>
          <ButtonLoading
            className="static w-full"
            name="Sign Up"
            loading={form.formState.isSubmitting}
          />
        </form>
      </Form>

      <h2>
        Already have an account?{" "}
        <span
          onClick={() => {
            setMode("sign_in");
          }}
          className="text-blue-400 cursor-pointer"
        >
          Sign In
        </span>
      </h2>
    </div>
  );
}
