import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { useState } from "react";

export default function Selector({
  options,
  defaultName = "select",
  name = "select",
  className,
  onChange,
  value,
}: {
  options: Array<string> | Array<{ value: any; name: string }>;
  defaultName?: string;
  name?: string;
  className?: string;
  onChange: (value: string) => void;
  value?: string;
}) {

  return (
    
    <Select
      onValueChange={(value) => {
        let value2: any = value;
        value2 = options?.find((item: any) => item.value == value) || value;
        onChange(value2?.value || value);
      }}
      name={name}
      defaultValue={value}
    >
      <SelectTrigger className={className}>{defaultName}</SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item: any, i) => {
            return (
              <SelectItem key={i} value={item?.value ? item.value : item}>
                {item.name || item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
