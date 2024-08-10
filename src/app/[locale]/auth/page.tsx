import { Suspense } from "react";
import ManageAuth from "./_components/ManageAuth";

export const dynamic = "force-dynamic";
export default function page() {
  return (
    <div className="flex justify-center items-center w-full min-h-screen">
      <section className="w-[400px] py-9 h-fit max-h-fit bg-background/70 backdrop-blur-md rounded-md">
        <Suspense>
          <ManageAuth />
        </Suspense>
      </section>
    </div>
  );
}
