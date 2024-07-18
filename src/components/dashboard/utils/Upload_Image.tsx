import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import Loadiner from "@/components/ui/Loadiner";
import UplaodImage from "@/lib/Cloudinary";
import clsx from "clsx";
import { Upload } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

export default function Upload_Image({
  onChange,
  value,
  multiImages = false,
}: {
  onChange: any;
  value?: any;
  multiImages?: boolean;
}) {
  const [isUplading, setUploading] = useState(false);

  const onChangeInputImage = async (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const imgData = event.target.files;
    if (!imgData || imgData.length <= 0) return;
    setUploading(true);
    const list = Array.from(imgData);

    let Urls: any = [];

    await Promise.all(
      list.map(async (item) => {
        await UplaodImage(item).then((res) => {
          Urls.push(res.data.secure_url);
        });
      })
    );
    if (Urls) onChange(Urls[0]);
    setUploading(false);
  };
  return (
    <div className="h-44 w-full relative">
      <Label
        htmlFor="file_upload_Input"
        className={clsx(
          "bg-gray-900 rounded-md h-full border-2 overflow-hidden border-dashed flex flex-col justify-center items-center",
          {
            "opacity-20": isUplading,
          }
        )}
      >
        {value && !multiImages ? (
          <Image
            className="aspect-auto"
            width={130}
            height={130}
            alt="Image"
            src={value}
          />
        ) : (
          <>
            <Upload size={50} strokeWidth={1} />
            <h1 className="text-lg">Drag your images here</h1>
            <p className="opacity-65 text-[12px]">
              (Only *.jpeg, *.webp and *.png images will be accepted)
            </p>
          </>
        )}
      </Label>
      {isUplading && <Loadiner />}
      <Input
        multiple={multiImages}
        onChange={onChangeInputImage}
        id="file_upload_Input"
        type="file"
        className="hidden"
      />
    </div>
  );
}
