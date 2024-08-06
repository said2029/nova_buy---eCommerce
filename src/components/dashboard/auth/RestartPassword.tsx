import { OurStaff_Update } from "@/Actions/quires";
import { AuthMode_schema } from "@/app/[locale]/dashboard/auth/page";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonLoading from "../buttons/ButtonLoading";
import { useSearchParams } from "next/navigation";
// restart password schema
const form_schema_signIn = z.object({
  password: z.string().min(7),
  confirmPassword: z.string().min(7),
});

export default function RestartPassword({
  setMode,
}: {
  setMode: (mode: AuthMode_schema) => void;
}) {
  const form = useForm<z.infer<typeof form_schema_signIn>>({
    resolver: zodResolver(form_schema_signIn),
  });
  const params = useSearchParams();
  const { toast } = useToast();
  const submit = async (value: z.infer<typeof form_schema_signIn>) => {
    if (value.confirmPassword !== value.password) {
      toast({
        title: "Passwords do not match",
        description: "Please make sure both passwords match.",
        duration: 2000,
        variant: "destructive",
      });
      return;
    }

    try {
      await OurStaff_Update({ password: value.password, _id: params.get("i") });
      toast({
        title: "Password changed successfully",
        description: "You can now login with your new password.",
        duration: 2000,
      });

      setMode("sign_in");
    } catch (error: any) {
      toast({
        title: "Error changing password",
        description: error?.message,
        duration: 2000,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col h-full justify-evenly items-center w-full px-3 space-y-9">
      <h1 className="font-semibold  justify-self-start text-3xl">
        Forget Password
      </h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col w-full justify-center items-center gap-4"
        >
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
            name="confirmPassword"
            render={({ field }) => (
              <FormItem className="w-full">
                <Input
                  {...field}
                  type="password"
                  placeholder="Confirm Password"
                />
                <FormMessage />
              </FormItem>
            )}
          />
          <span
            onClick={() => {
              setMode("sign_in");
            }}
            className="w-full text-sm cursor-pointer"
          >
            Back to Sign In
          </span>
          <ButtonLoading
            className="static w-full"
            loading={form.formState.isSubmitting}
            name="Reset Password"
          />
        </form>
      </Form>

      <h2>
        Don't have an account?{" "}
        <span
          onClick={() => {
            setMode("sign_up");
          }}
          className="text-blue-400 cursor-pointer"
        >
          Sign Up
        </span>
      </h2>
    </div>
  );
}
