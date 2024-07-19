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
}: {
  name?: string;
  valueSelect: Array<String>;
  onChange: (value: Array<String>) => void;
  options: Array<String>;
}) {
  const [tags, setTags] = useState<Array<String>>(valueSelect);

  const slelect = (name: String) => {
    if (tags.includes(name)) {
      tags.splice(tags.indexOf(name), 1);
    } else {
      tags.push(name);
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
                return <Badge key={i}>{item}</Badge>;
              })
            : `Select ${name}`}
        </div>
      </PopoverTrigger>
      <PopoverContent>
        <Command className="rounded-lg border shadow-md relative">
          <CommandInput placeholder="Type a command or search..." />
          <CommandList aria-disabled={false}>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((item, i) => {
                return (
                  <CommandItem
                    key={i}
                    className="!pointer-events-auto  !data-[disabled]:pointer-events-auto ![disabled]:opacity-100"
                  >
                    <Button
                      className={clsx("w-full flex items-center", {
                        "justify-between": tags.includes(item),
                        "bg-teal-400": tags.includes(item),
                        "hover:bg-teal-300": tags.includes(item),
                      })}
                      onClick={() => slelect(item)}
                    >
                      {tags.includes(item) && <Check strokeWidth={1} />}
                      {item}
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


