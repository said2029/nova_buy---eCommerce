import { GetByEmail, send_Email } from "@/Actions/quires";
import { AuthMode_schema } from "@/app/[locale]/auth/_components/ManageAuth";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import ButtonLoading from "../buttons/ButtonLoading";
import { usePathname } from "next/navigation";

const form_schema_signIn = z.object({
  email: z.string().email().min(10),
});
export default function Forget_password({
  setMode,
}: {
  setMode: (name: AuthMode_schema) => void;
}) {
  const path = usePathname();
  const form = useForm<z.infer<typeof form_schema_signIn>>({
    resolver: zodResolver(form_schema_signIn),
    defaultValues: {
      email: "",
    },
  });
  const { toast } = useToast();
  const submit = async (value: z.infer<typeof form_schema_signIn>) => {
    try {
      const user = await GetByEmail(value.email);
      if (!user || user.length <= 0) {
        throw new Error("User not found");
      }

      await send_Email({
        to: value.email,
        html: `<p><a href="${window?.location?.origin}/en/auth?mode=reset&i=${user._id}">Restart</a></p>`,
        subject: "Restart Password",
      });
      toast({
        title: "Email Sent",
        description:
          "We have sent a password reset link to your email address.",
        duration: 2000,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error?.message,
        duration: 2000,
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
            name="Send"
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
