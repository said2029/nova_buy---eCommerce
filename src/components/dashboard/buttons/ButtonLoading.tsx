import { Button } from "@/components/ui/button";
import { Loader } from "lucide-react";
import React from "react";

export default function ButtonLoading({
  loading,
  name = "botton",
}: {
  loading?: boolean;
  name?: string;
}) {
  return (
    <Button
      disabled={loading}
      className="fixed flex gap-2 justify-center items-center bottom-2 right-2"
    >
      {loading && (
        <span className="animate-spin">
          <Loader />
        </span>
      )}

      {name}
    </Button>
  );
}
