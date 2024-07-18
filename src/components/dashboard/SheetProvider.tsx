import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { ReactNode } from "react";

export function DialogControlle({
  children,
  buttonName,
  tital,
  icon,
}: {
  children: ReactNode;
  buttonName: string;
  tital: string;
  icon: ReactNode;
}) {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button className="h-12" variant="default">
          {icon}
          {buttonName}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px]">
        <SheetHeader>
          <SheetTitle>{tital}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
