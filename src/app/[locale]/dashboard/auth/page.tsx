"use client";
import Forget_password from "@/components/dashboard/auth/forget_password";
import RestartPassword from "@/components/dashboard/auth/RestartPassword";
import Sign_in_dashboard from "@/components/dashboard/auth/sign_in_dashboard";
import Sign_up_dashboard from "@/components/dashboard/auth/Sign_up_dashboard";
import { redirect, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
 
import {hasCookie} from "cookies-next";

type AuthMode_schema = "sign_in" | "sign_up" | "forget" | "reset";

export default function page() {
  const [mode, setMode] = useState<AuthMode_schema>("sign_in");
  const PathParams = useSearchParams();
  const router = useRouter();
  if(hasCookie("auth")){
    router.replace("/dashboard/home");
  }
  const handleMode = (mode: AuthMode_schema) => {
    router.push(`/dashboard/auth?mode=${mode}`);
  };

  useEffect(() => {
    if (PathParams.get("mode")) {
      setMode(PathParams.get("mode") as AuthMode_schema);
    }
  }, [PathParams.get("mode")]);



  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <section className="w-[400px] py-9 h-fit max-h-fit bg-background/70 backdrop-blur-md rounded-md">
        {mode === "sign_in" && <Sign_in_dashboard setMode={handleMode} />}
        {mode === "sign_up" && <Sign_up_dashboard setMode={handleMode} />}
        {mode === "forget" && <Forget_password setMode={handleMode} />}
        {mode === "reset" && <RestartPassword setMode={handleMode} />}
      </section>
    </div>
  );
}
export { type AuthMode_schema };
