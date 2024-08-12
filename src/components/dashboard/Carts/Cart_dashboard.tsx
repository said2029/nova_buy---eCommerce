import { cn } from "@/lib/utils";
import clsx from "clsx";
import Image from "next/image";
import { ReactNode } from "react";

type Prop = {
  titel: string;
  currency: string;
  image?: string;
  Icon?: ReactNode;
  shadowColor?: string;
};

export default function Cart_dashboard({
  titel,
  currency,
  image,
  shadowColor,
  Icon,
}: Prop) {
  return (
    <article
      className={cn(
        `p-3 h-28 bg-white border border-gray-800 border-dashed dark:bg-gray-500/20 duration-300 cursor-pointer rounded-md flex gap-2 justify-between items-center`
      )}
    >
      <div
        className={clsx("w-20 h-full flex justify-center items-center", {
          "w-24": !Icon,
        })}
      >
        {Icon ? (
          Icon
        ) : (
          <Image
            className="object-fill"
            src={image || ""}
            width={400}
            height={400}
            alt={titel}
          />
        )}
      </div>
      <div className="space-y-3 text-end">
        <h1 className="opacity-75 text-lg text-primary/80 font-semibold">
          {titel}
        </h1>
        <p className="text-2xl font-bold text-primary/80 opacity-80">
          {currency}
        </p>
      </div>
    </article>
  );
}
