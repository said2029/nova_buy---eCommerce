import User_Table from "@/components/dashboard/tables/Table_Users";
import MainProviderPerants from "@/components/dashboard/utils/MainProviderPerants";
import Selector from "@/components/dashboard/utils/Selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Plus } from "lucide-react";
import React from "react";

export default function page() {
  return (
    <MainProviderPerants name="Our staff">
      <section className="bg-gray-500/10 p-3 rounded-md">
        <form className=" flex gap-3" action="">
          <Input className="h-12" placeholder="Search...." />
          <Selector classNane="h-12" options={["ddfsd"]} defaultName="role"/>
          <Button type="button" className="w-28 h-12 bg-teal-500 text-white"><Plus strokeWidth={1}/> Add Staff</Button>
          <Button className="w-28 h-12">Filter</Button>
          <Button type="button" className="w-28 h-12">Restat</Button>
        </form>
      </section>
      <section className="bg-gray-500/10 p-3 rounded-md mt-10">
        <User_Table />
      </section>
    </MainProviderPerants>
  );
}
