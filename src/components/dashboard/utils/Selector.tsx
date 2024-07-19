import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";

export default function Selector({
  options,
  defaultName = "select",
  name = "select",
  classNane,
  onChange,
  value,
}: {
  options: Array<string>;
  defaultName?: string;
  name?: string;
  classNane?: string;
  onChange?: (value: string) => void;
  value?: string;
}) {
  return (
    <Select onValueChange={onChange} name={name}>
      <SelectTrigger className={classNane}>
        {value ? value : defaultName}
      </SelectTrigger>
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
