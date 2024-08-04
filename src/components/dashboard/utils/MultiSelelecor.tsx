import {
  Calculator,
  Calendar,
  Check,
  CreditCard,
  Settings,
  Smile,
  User,
  X,
} from "lucide-react";

import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { use, useState } from "react";
import clsx from "clsx";

export function MultiSelectTest({
  name,
  valueSelect = [],
  onChange,
  options = [],
  tryAgane,
}: {
  name?: string;
  valueSelect: Array<{ name: string; value: string }> | undefined;
  onChange: (value: Array<{ name: string; value: string }>) => void;
  options: Array<{ name: string; value: string }>;
  tryAgane?: () => void;
}) {
  const [tags, setTags] =
    useState<Array<{ name: string; value: string }>>(valueSelect);

  const Select = (item: any) => {
    if (tags.some((i) => i.name == item.name)) {
      tags.splice(
        tags.findIndex((i) => i.name == item.name),
        1
      );
    } else {
      tags.push(item);
    }
    setTags(tags);
    onChange(tags);
  };
  return (
    <Popover>
      <PopoverTrigger className="w-full">
        <div className="bg-background border w-full min-h-10 flex gap-1 py-3 px-2 flex-wrap justify-center items-center rounded-md">
          {tags && tags.length >= 1
            ? tags.map((item, i) => {
                return <Badge key={i}>{item.name}</Badge>;
              })
            : `Select`}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command className="rounded-lg border shadow-md relative">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList aria-disabled={false}>
            <CommandEmpty className="flex flex-col gap-4 items-center justify-center">
              No results found.
              {tryAgane && <Button onClick={tryAgane}>Try Agane?</Button>}
            </CommandEmpty>
            <CommandGroup>
              {options.map((item, i) => {
                const Incloud = tags.some((tg) => tg.value == item.value);
                return (
                  <CommandItem
                    key={i}
                    className="!pointer-events-auto  !data-[disabled]:pointer-events-auto ![disabled]:opacity-100"
                  >
                    <Button
                      className={clsx("w-full flex items-center", {
                        "justify-between": Incloud,
                        "bg-teal-400": Incloud,
                        "hover:bg-teal-300": Incloud,
                      })}
                      onClick={() => Select(item)}
                    >
                      {Incloud && <Check strokeWidth={1} />}
                      {item.name}
                    </Button>
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
