import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Box,
  FolderKanban,
  JapaneseYenIcon,
  Settings,
  Settings2,
  Table,
  UserCog,
  Users,
} from "lucide-react";
import Image from "next/image";

export default function Sidbar({ isOpen }: { isOpen: Boolean }) {
  const animationControlle = useAnimation();
  const li_class =
    "cursor-pointer hover:text-red-300 duration-500 flex gap-2 py-[2px]";
  const li_class_border =
    " border-s-2 duration-500 active:border-s-8  hover:border-s-8 border-red-400 ps-7";

  useEffect(() => {
    animationControlle.start(isOpen ? "open" : "closed");
  }, [isOpen]);
  return (
    <motion.aside
      variants={{
        open: {
          x: 0,
          visibility: "visible",
        },
        closed: {
          x: -600,
          visibility: "hidden",
        },
      }}
      initial="closed"
      animate={animationControlle}
      transition={{ type: "tween", duration: 0.6 }}
      className="w-80 h-screen bg-white shadow-xl shadow-gray-300 dark:shadow-gray-950 dark:bg-gray-900 fixed z-20 overflow-y-auto pb-48"
    >
      <div className="h-32 w-full bg-red-400 p-14 flex justify-center items-center ">
        {/* logo */}
        <Image className="opacity-85" alt="logo" width={512} height={512} src={"/images/logo2.png"} />
      </div>

      <div className="mt-9 ">
        <ul className="space-y-7 opacity-75">
          <li className={li_class + li_class_border}>
            <Table strokeWidth={1} /> Dashboard
          </li>
          <li className={li_class_border}>
            <Collapsible>
              <CollapsibleTrigger className={li_class}>
                <FolderKanban strokeWidth={1} />
                Catalog
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-slate-50/10 rounded-md p-1">
                <ul className="px-6 flex flex-col gap-2 my-2">
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    Products
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    Category
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    Attributes
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    Coupon
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
          <li className={li_class + li_class_border}>
            <Users strokeWidth={1} /> Users
          </li>
          <li className={li_class + li_class_border}>
            <Box strokeWidth={1} /> Orders
          </li>
          <li className={li_class + li_class_border}>
            <UserCog strokeWidth={1} /> Our Staff
          </li>
          <li className={li_class + li_class_border}>
            <Settings strokeWidth={1} /> Settings
          </li>
          <li className={li_class_border}>
            <Collapsible>
              <CollapsibleTrigger className={li_class}>
                <Settings2 />
                Store Setting
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-slate-50/10 rounded-md p-1">
                <ul className="px-6 flex flex-col gap-2 my-2">
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    View Store
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    Store Customizations
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    Store Setting
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
        </ul>
      </div>
    </motion.aside>
  );
}
