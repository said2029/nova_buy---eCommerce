import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loadier from "@/components/ui/Loadiner";
import UplaodImage from "@/lib/Cloudinary";
import clsx from "clsx";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Upload_Image({
  onChange,
  value,
  multiImages = false,
  name,
}: {
  onChange: any;
  value?: any;
  multiImages?: boolean;
  name: string;
}) {
  const [isUplading, setIsloading] = useState(false);

  const onChangeInputImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imgData = event.target.files;
    if (!imgData || imgData.length <= 0) return;

    const list = Array.from(imgData);
    setIsloading(true);

    let Urls: Array<string> = value
      ? Array.isArray(value)
        ? value
        : [value]
      : [];
    Urls = multiImages ? Urls : [];
    await Promise.all(
      list.map(async (item) => {
        await UplaodImage(item).then((res) => {
          Urls.push(res.data.secure_url);
        });
      })
    ).then(() => {
      setIsloading(false);
    });
    if (multiImages) {
      if (Urls) onChange(Urls);
    } else {
      if (Urls) onChange(Urls[0]);
    }
    setIsloading(false);
  };

  return (
    <div className="h-44 w-full relative">
      <Label
        htmlFor={name}
        className={clsx(
          "bg-background/70 rounded-md h-full border-2 overflow-hidden border-dashed flex flex-col justify-center items-center",
          {
            "opacity-20": isUplading,
            "pointer-events-none": isUplading,
          }
        )}
      >
        {value && !multiImages ? (
          <Image
            className="aspect-auto"
            width={230}
            height={230}
            alt="Image"
            src={value}
          />
        ) : (
          <>
            <Upload size={50} strokeWidth={1} />
            <h1 className="text-lg">Select your images</h1>
            <p className="opacity-65 text-[12px]">
              (Only *.jpeg, *.webp and *.png images will be accepted)
            </p>
          </>
        )}
      </Label>
      {isUplading && <Loadier />}
      <Input
        accept=".jpeg,.web,.png,"
        multiple={multiImages}
        id={name}
        type="file"
        className="hidden"
        onChange={onChangeInputImage}
      />
    </div>
  );
}
