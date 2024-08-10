"use client";
import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { deleteCookie } from "cookies-next";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Archive, BellRing, LogOut, Menu, UserPen } from "lucide-react";
import { ModeToggle } from "./SelectTheme";
import { Button } from "../ui/button";
import clsx from "clsx";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useTranslations } from "next-intl";

export default function NabBar({
  toggelSidbat,
  sidbarOpen,
}: {
  toggelSidbat: () => void;
  sidbarOpen: boolean;
}) {
  const t = useTranslations("navBar");
  const router = useRouter();

  const Pathname = usePathname();

  const HandleLang = (lg: string) => {
    router.replace(`/${lg}/dashboard`);
  };

  return (
    <header className="w-full max-w-full h-16 px-5 py-2 backdrop-blur-xl flex dark:bg-slate-800 justify-between fixed top-0 left-0 z-10 ">
      <>
        <nav className={clsx("flex gap-3 items-center")}>
          <Button onClick={toggelSidbat} variant="ghost">
            <Menu strokeWidth={1} />
          </Button>
        </nav>
        <ul className="flex justify-center items-center gap-3">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10 uppercase  opacity-90">
                {Pathname.split("/")[1]}
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem onClick={() => HandleLang("en")}>
                  {t("English")}
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => HandleLang("ar")}>
                  {t("Arabic")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li className="relative flex items-center">
            <DropdownMenu>
              <DropdownMenuTrigger>
                {/* <span className="absolute -top-1 -right-1 bg-teal-600 text-[12px] px-1 rounded-full">
                  1
                </span> */}
                <BellRing size={20} strokeWidth={1.5} />
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>Coming Soon😀!</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>

          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src={
                      (localStorage && localStorage?.getItem("userImage")) ||
                      "https://github.com/shadcn.png"
                    }
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" py-1 mt-2 text-nowrap rounded-lg text-end w-36 mx-3">
                <DropdownMenuItem>
                  <Link
                    className="flex gap-2 cursor-pointer font-medium"
                    href="/dashboard/home"
                  >
                    <Archive strokeWidth={1} size={20} />
                    {t("Dashboard")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link
                    className="flex gap-2 cursor-pointer font-medium"
                    href="/dashboard/home/ourStaff"
                  >
                    <UserPen size={20} strokeWidth={1} />
                    {t("Edit Profile")}
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    deleteCookie("auth");
                    localStorage.removeItem("userId");
                    router.refresh();
                  }}
                  className="flex gap-2 cursor-pointer font-medium"
                >
                  <LogOut size={20} strokeWidth={1} />
                  {t("Log Out")}
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </>
    </header>
  );
}
