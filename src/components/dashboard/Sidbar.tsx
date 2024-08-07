import React, { useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  Box,
  CircleX,
  FolderKanban,
  JapaneseYenIcon,
  Settings,
  Settings2,
  Table,
  UserCog,
  Users,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "../ui/button";
import { useTranslations } from "next-intl";

export default function Sidbar({
  isOpen,
  toggelSidbat,
}: {
  isOpen: Boolean;
  toggelSidbat: () => void;
}) {
  const animationControlle = useAnimation();
  const li_class =
    "cursor-pointer hover:text-teal-300 duration-500 flex gap-2 py-[2px]";
  const li_class_border =
    " border-s-2 duration-500 active:border-s-8  hover:border-s-8 border-teal-600 ps-7";

  useEffect(() => {
    animationControlle.start(isOpen ? "open" : "closed");
  }, [isOpen]);
  const t = useTranslations("navBar");
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
      <div className="h-32 w-full bg-teal-600 p-14 flex justify-center items-center relative">
        {/* logo */}
        <Image
          alt="logo"
          width={160}
          height={160}
          src={"/images/logo2.png"}
        />
        <Button
          onClick={toggelSidbat}
          size="icon"
          variant="ghost"
          className="absolute top-2 right-2 text-white"
        >
          <CircleX strokeWidth={1} />
        </Button>
      </div>

      <div className="mt-9 ">
        <ul className="space-y-7 opacity-75">
          <li>
            <Link className={li_class + li_class_border} href={"/dashboard/home"}>
              <Table strokeWidth={1} /> {t("Dashboard")}
            </Link>
          </li>
          <li className={li_class_border}>
            <Collapsible>
              <CollapsibleTrigger className={li_class}>
                <FolderKanban strokeWidth={1} />
                {t("Catalog")}
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-slate-50/10 rounded-md p-1">
                <ul className="px-6 flex flex-col gap-2 my-2">
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href={"/dashboard/home/products"}>{t("Products")}</Link>
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href={"/dashboard/home/categories"}>{t("Category")}</Link>
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href={"/dashboard/home/subCategory"}>{t("SubCategory")}</Link>
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href={"/dashboard/home/attribute"}>{t("Attribute")}</Link>
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href={"/dashboard/home/coupon"}>{t("Coupon")}</Link>
                  </li>
                </ul>
              </CollapsibleContent>
            </Collapsible>
          </li>
          <li>
            <Link
              className={li_class + li_class_border}
              href={"/dashboard/home/users"}
            >
              <Users strokeWidth={1} /> {t("Users")}
            </Link>
          </li>
          <li>
            <Link
              className={li_class + li_class_border}
              href={"/dashboard/home/orders"}
            >
              <Box strokeWidth={1} /> {t("Orders")}
            </Link>
          </li>
          <li>
            <Link
              className={li_class + li_class_border}
              href={"/dashboard/home/ourStaff"}
            >
              <UserCog strokeWidth={1} /> {t("Our Staff")}
            </Link>
          </li>
          <li>
            <Link
              className={li_class + li_class_border}
              href={"/dashboard/home/setting"}
            >
              <Settings strokeWidth={1} /> {t("Settings")}
            </Link>
          </li>
          <li className={li_class_border}>
            <Collapsible>
              <CollapsibleTrigger className={li_class}>
                <Settings2 />
                {t("Store Setting")}
              </CollapsibleTrigger>
              <CollapsibleContent className="bg-slate-50/10 rounded-md p-1">
                <ul className="px-6 flex flex-col gap-2 my-2">
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    {t("View Store")}
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href={"/dashboard/home/storeCustomizations"}>{t("Store Customizations")}</Link>
                  </li>
                  <li className="hover:opacity-55 duration-300 cursor-pointer">
                    <Link href="/dashboard/home/storeSetting">{t("Store Setting")}</Link>
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
