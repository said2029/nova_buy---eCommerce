"use client";
import NabBar from "@/components/dashboard/NabBar";
import Sidbar from "@/components/dashboard/Sidbar";
import clsx from "clsx";
import { ReactNode, useState } from "react";
export default function SidbarProvider({ children }: { children: ReactNode }) {
  const [sidbarOpen, setSidbarOpen] = useState(true);
  const toggleSidbar = () => {
    setSidbarOpen(!sidbarOpen);
  };
  return (
    <div className="flex relative">
      <Sidbar isOpen={sidbarOpen} toggelSidbat={toggleSidbar} />
      <div
        className={clsx("w-full", {
          "ml-[20rem]": sidbarOpen,
        })}
      >
        <NabBar sidbarOpen={sidbarOpen} toggelSidbat={toggleSidbar} />
        <div className="z-0 mt-[4rem]">{children}</div>
      </div>
    </div>
  );
}
