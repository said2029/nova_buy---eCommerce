import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";

import React from "react";

export default function Selector({ options,defaultName='select',name='' }: { options: [string],defaultName?:string,name?:string}) {
  return (
    <Select name={name}>
      <SelectTrigger>{defaultName}</SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {options.map((item, i) => {
            return (
              <SelectItem key={i} value={item}>
                {item}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
