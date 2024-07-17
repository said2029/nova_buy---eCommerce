import React from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Archive, CircleX, LogOut, Menu, UserPen } from "lucide-react";
import { ModeToggle } from "./SelectTheme";
import { Button } from "../ui/button";
import clsx from "clsx";

export default function NabBar({
  toggelSidbat,
  sidbarOpen,
}: {
  toggelSidbat: () => void;
  sidbarOpen: boolean;
}) {
  return (
    <header className="w-full max-w-full h-16 px-5 py-2 bg-background flex dark:bg-slate-800 justify-between fixed top-0 left-0 z-10 ">
      <>
        <nav
          className={clsx("flex gap-3 items-center", {
            "ml-[20rem]": sidbarOpen,
          })}
        >
          <Button onClick={toggelSidbat} variant="ghost">
            {sidbarOpen ? (
              <CircleX strokeWidth={1} />
            ) : (
              <Menu strokeWidth={1} />
            )}
          </Button>
        </nav>
        <ul className="flex gap-3">
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger className="h-10">En</DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem>English</DropdownMenuItem>
                <DropdownMenuItem>Arabic</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
          <li>
            <ModeToggle />
          </li>
          <li>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar>
                  <AvatarImage
                    src="https://github.com/shadcn.png"
                    alt="@shadcn"
                  />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent className=" py-1 mt-2 rounded-lg text-end w-36 mx-3">
                <DropdownMenuItem className="flex gap-2 cursor-pointer font-medium">
                  <Archive strokeWidth={1} size={20} />
                  Dashboard
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2 cursor-pointer font-medium">
                  <UserPen size={20} strokeWidth={1} />
                  Edit Profile
                </DropdownMenuItem>
                <DropdownMenuItem className="flex gap-2  cursor-pointer font-medium">
                  <LogOut size={20} strokeWidth={1} />
                  Log Out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </li>
        </ul>
      </>
    </header>
  );
}
