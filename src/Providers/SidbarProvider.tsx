"use client";
import NabBar from "@/components/dashboard/NabBar";
import Sidbar from "@/components/dashboard/Sidbar";
import clsx from "clsx";
import {motion} from 'framer-motion'
import { ReactNode, useState } from "react";
export default function SidbarProvider({ children }: { children: ReactNode }) {
  const [sidbarOpen, setSidbarOpen] = useState(false);
  const toggleSidbar = () => {
    setSidbarOpen(!sidbarOpen);
  };
  return (
    <div className="flex relative">
      <Sidbar isOpen={sidbarOpen} />
      <motion.div
      className="w-full"
      variants={{
        open: {
          marginLeft:"20rem"
        },
        closed: {
          marginLeft:"0rem"
        },
      }}
      initial="closed"
      animate={sidbarOpen? "open":"closed"}
      transition={{duration:0.3,delay:0.2}}
      >
        <NabBar sidbarOpen={sidbarOpen} toggelSidbat={toggleSidbar} />
        <div className="z-0 mt-[4rem]">{children}</div>
      </motion.div>
    </div>
  );
}
