import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { ReactNode } from "react";

export function SheetControlle({
  children,
  buttonName,
  tital,
  icon,
}: {
  children: ReactNode;
  buttonName?: string;
  tital?: string;
  icon?: ReactNode;
}) {
  return (
    <Sheet >
      <SheetTrigger asChild>
        <Button className="h-12" variant="default">
          {icon ? icon : <Plus />}
          {buttonName}
        </Button>
      </SheetTrigger>
      <SheetContent  className="sm:max-w-[425px] overflow-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>{tital}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
