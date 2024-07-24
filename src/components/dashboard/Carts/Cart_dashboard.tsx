import { cn } from "@/lib/utils";
import Image from "next/image";
import { ReactNode } from "react";

type Prop = {
  titel: string,
  currency: string,
  image?: string,
  Icon?:ReactNode
  shadowColor?: string,
};

export default function Cart_dashboard({
  titel,
  currency,
  image,
  shadowColor,
  Icon
}:  Prop) {
  return (
    <article className={cn(`p-3 h-28 bg-gray-100c dark:bg-slate-900/25 duration-300 cursor-pointer  ${shadowColor} shadow-[0_3px] hover:shadow-[0_0px] rounded-md flex gap-2 justify-between items-center`)}>
      <div className="w-20 h-full flex justify-center items-center">
        {Icon?Icon: <Image className="object-fill" src={image || ""} width={300} height={300} alt="dsfs"/>}
       
      </div>
      <div className="space-y-3 text-end">
        <h1 className="opacity-75 text-lg font-semibold">{titel}</h1>
        <p className="text-2xl font-bold opacity-80">${currency}</p>
      </div>
    </article>
  );
}

