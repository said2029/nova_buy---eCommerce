import User_Table from "@/components/dashboard/tables/Table_Users";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function page() {
  return (
    <MainProviderPerants name="Users">
      <section className="bg-gray-500/10 p-3 rounded-md flex gap-3">
        <Input className="h-12" placeholder="Search...." />
        <Button className="w-28 h-12">Filter</Button>
        <Button className="w-28 h-12">Restat</Button>
      </section>
      <section className="bg-gray-500/10 p-3 rounded-md mt-10">
        <User_Table />
      </section>
    </MainProviderPerants>
  );
}
