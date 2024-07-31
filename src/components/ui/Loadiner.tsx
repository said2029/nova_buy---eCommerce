import { Loader } from "lucide-react";

export default function Loadiner() {
  return (
    <div className="h-9 w-9 absolute top-1/2 bottom-1/2 left-0 right-0 mx-auto">
      <span className="animate-spin">
        <Loader/>
      </span>
    </div>
  );
}
