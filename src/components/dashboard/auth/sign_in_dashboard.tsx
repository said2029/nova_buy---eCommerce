import { sign_in_Dashboard } from "@/Actions/quires";
import { AuthMode_schema } from "@/app/[locale]/auth/_components/ManageAuth";
import {setCookie} from "cookies-next"
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonLoading from "../buttons/ButtonLoading";
import { redirect, useRouter } from "next/navigation";
const form_schema_signIn = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(20),
});
export default function Sign_in_dashboard({
  setMode,
}: {
  setMode: (name: AuthMode_schema) => void;
}) {
  const route = useRouter();
  const { toast } = useToast();
  const form = useForm<z.infer<typeof form_schema_signIn>>({
    resolver: zodResolver(form_schema_signIn),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submit = async (value: z.infer<typeof form_schema_signIn>) => {
    try {
      const body = await sign_in_Dashboard(value);
      setCookie("auth", body.token);
      localStorage?.setItem("userId", body.user._id)
      localStorage?.setItem("userImage", body.user.image)
      toast({
        title: "Logged In",
        description: "You have successfully logged in.",
        duration: 2000,
      });
      route.refresh();
      
    } catch (error: any) {
      console.log(error.message);
      toast({
        title: "Error Logging In",
        description: "Invalid email or password",
        duration: 2000,
        variant: "destructive",
      });
    }
  };
  return (
    <div className="flex flex-col h-full justify-evenly items-center w-full px-3 space-y-9">
      <h1 className="font-semibold  justify-self-start text-3xl">Sign In</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(submit)}
          className="flex flex-col w-full justify-center items-center gap-4"
          action=""
        >
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
          <span
            onClick={() => {
              setMode("forget");
            }}
            className="w-full text-sm cursor-pointer"
          >
            Forget Password?
          </span>
          <ButtonLoading
            className="static w-full"
            name="Sign In"
            loading={form.formState.isSubmitting}
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
