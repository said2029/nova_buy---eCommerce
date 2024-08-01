"use client";
import User_Table from "@/components/dashboard/tables/Table_Users";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useTranslations } from "next-intl";



export default function page() {
  const t = useTranslations("UserPage");
  const [filter,setFilter]=useState({search:""})

  return (
    <MainProviderPerants name={t("Users")}>
      <section className="bg-gray-500/10 p-3 flex-wrap sm:flex-nowrap rounded-md flex gap-3">
        <Input onChange={(value)=>{
          setFilter({...filter,search:value.currentTarget.value })
        }} className="h-12" placeholder={t("Search")} />
        <Button onClick={()=>setFilter({search:""})} className="w-28 h-12">{t("Restart")}</Button>
      </section>
      <section className="bg-gray-500/10 p-3 rounded-md mt-10">
        <User_Table searchFilter={filter.search}/>
      </section>
    </MainProviderPerants>
  );
}
