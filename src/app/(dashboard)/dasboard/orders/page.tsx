import Order_Table from "@/components/dashboard/tables/Order_Table";
import MainProviderPerants from "@/components/dashboard/utils/MainProviderPerants";
import Selector from "@/components/dashboard/utils/Selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React from "react";

export default function page() {
  return (
    <MainProviderPerants name="Orders">
      <section className="h-fit bg-gray-500/10 p-6 rounded-md filterInput_Perant">
        <form action="">
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-4">
            <Input name="search" placeholder="Search.." />
            <Selector name="Status" options={["sdfsdfs"]} />
            <Selector name="Order limits" options={["sdfsdfs"]} />
            <Selector name="Method" options={["sdfsdfs"]} />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3 place-content-center place-items-center">
            <Label className="col-span-2 w-full" htmlFor="">
              Start Date
              <Input className="w-full" type="date" />
            </Label>
            <Label className="col-span-2  w-full" htmlFor="">
              End Date
              <Input className="w-full" type="date" />
            </Label>
            <Button className="w-full">Filter</Button>
          </div>
        </form>
      </section>
      <section className="mt-10 bg-gray-500/10 rounded-md p-6">
        <Order_Table />
      </section>
    </MainProviderPerants>
  );
}
