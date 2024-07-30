import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Plus } from "lucide-react";
import { LegacyRef, ReactNode } from "react";

export function SheetControlle({
  children,
  buttonName,
  tital,
  icon,
  size,
  variant,
  onOpenChange,
  onClick,
  SheetTriggerRef,
}: {
  children: ReactNode;
  buttonName?: string;
  tital?: string;
  SheetTriggerRef?: LegacyRef<HTMLButtonElement> | undefined;
  icon?: ReactNode;
  size?: "icon" | "default" | "sm" | "lg" | null | undefined;
  onOpenChange?: (open: boolean) => void;
  onClick?: () => void;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
}) {
  return (
    <Sheet onOpenChange={onOpenChange}>
      <SheetTrigger ref={SheetTriggerRef} asChild>
        <Button onClick={onClick} size={size} className="h-12" variant={variant}>
          {icon ? icon : <Plus />}
          {buttonName}
        </Button>
      </SheetTrigger>
      <SheetContent className="sm:max-w-[425px] overflow-auto">
        <SheetHeader className="mb-5">
          <SheetTitle>{tital}</SheetTitle>
        </SheetHeader>
        {children}
      </SheetContent>
    </Sheet>
  );
}
