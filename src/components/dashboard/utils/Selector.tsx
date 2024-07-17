import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger } from "@/components/ui/select";

export default function Selector({ options,defaultName='select',name='',classNane }: { options: [string],defaultName?:string,name?:string,classNane?:string}) {
  return (
    <Select  name={name}>
      <SelectTrigger className={classNane}>{defaultName}</SelectTrigger>
      <SelectContent >
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
