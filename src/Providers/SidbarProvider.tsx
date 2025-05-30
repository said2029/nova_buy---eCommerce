"use client";
import NabBar from "@/components/dashboard/NabBar";
import Sidbar from "@/components/dashboard/Sidbar";
import { motion } from "framer-motion";
import { ReactNode, useEffect, useRef, useState } from "react";
export default function SidbarProvider({
  children,
}: {
  children: ReactNode;
}) {
  const [sidbarOpen, setSidbarOpen] = useState(false);
  const toggleSidbar = () => {
    setSidbarOpen(!sidbarOpen);
  };
  let mql = useRef<boolean>();
  useEffect(() => {
    if (window) {
      mql.current = window?.matchMedia("(max-width: 1024px)").matches;
    }
  }, []);

  return (
    <div className="flex relative">
      <Sidbar toggelSidbat={toggleSidbar} isOpen={sidbarOpen} />
      <motion.div
        className="w-full"
        variants={{
          open: {
            marginLeft: "20rem",
          },
          closed: {
            marginLeft: "0rem",
          },
        }}
        initial="closed"
        animate={mql.current == false && sidbarOpen ? "open" : "closed"}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <NabBar sidbarOpen={sidbarOpen} toggelSidbat={toggleSidbar} />
        <div className="z-0 mt-[4rem]">{children}</div>
      </motion.div>
    </div>
  );
}
