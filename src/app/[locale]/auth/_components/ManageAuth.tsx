"use client";
import Forget_password from "@/components/dashboard/auth/forget_password";
import RestartPassword from "@/components/dashboard/auth/RestartPassword";
import Sign_in_dashboard from "@/components/dashboard/auth/sign_in_dashboard";
import Sign_up_dashboard from "@/components/dashboard/auth/Sign_up_dashboard";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useEffect, useState } from "react";

import { hasCookie } from "cookies-next";

type AuthMode_schema = "sign_in" | "sign_up" | "forget" | "reset";

export default function ManageAuth() {
  const [mode, setMode] = useState<AuthMode_schema>("sign_in");
  const PathParams = useSearchParams();
  const router = useRouter();

  if (hasCookie("auth")) {
    router.replace("/dashboard/home");
  }
  const handleMode = (mode: AuthMode_schema) => {
    router.push(`/auth?mode=${mode}`);
  };

  useEffect(() => {
    if (PathParams.get("mode")) {
      setMode(PathParams.get("mode") as AuthMode_schema);
    }
  }, [PathParams.get("mode")]);

  return (
    <>
      {mode === "sign_in" && <Sign_in_dashboard setMode={handleMode} />}
      {mode === "sign_up" && <Sign_up_dashboard setMode={handleMode} />}
      {mode === "forget" && <Forget_password setMode={handleMode} />}
      <Suspense>
        {mode === "reset" && <RestartPassword setMode={handleMode} />}
      </Suspense>
    </>
  );
}

export { type AuthMode_schema };
