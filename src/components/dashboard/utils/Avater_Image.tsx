import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import React from "react";

export default function Avater_Image({image}:{image?:string}) {
  return (
    <Avatar>
      <AvatarImage src={image} alt={image} />
      <AvatarFallback>CN</AvatarFallback>
    </Avatar>
  );
}
