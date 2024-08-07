import React, { ReactNode } from "react";

export default function MainProviderPerants({
  children,
  name,
}: {
  children: ReactNode;
  name: string;
}) {
  return (
    <div className="p-2 sm:p-10 py-5">
      <h1 className="font-bold text-2xl border-s-4 border-teal-600 ps-4">
        {name}
      </h1>
      <div className="mt-10">{children}</div>
    </div>
  );
}
