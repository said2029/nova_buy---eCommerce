"use client";
import Order_Table from "@/components/dashboard/tables/Order_Table";
import MainProviderPerants from "@/components/dashboard/MainProviderPerants";
import Selector from "@/components/dashboard/utils/Selector";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useTranslations } from "next-intl";
import { useState } from "react";

export default function page() {
  const t = useTranslations("OrderPage");
  const [FilterData, setFilterData] = useState<{
    search: string ;
    paymentMethod: string;
    status: string;
    startDate: string;
    endDate: string;
  }>({
    search: "",
    paymentMethod: "",
    status: "",
    startDate: "",
    endDate: "",
  });


  return (
    <MainProviderPerants name="Orders">
      <section className="h-fit bg-gray-500/10 p-6 rounded-md filterInput_Perant">
        <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
          <Input
            onChange={(value) => {
              setFilterData({
                ...FilterData,
                search: value.currentTarget.value,
              });
            }}
            name="search"
            placeholder={t("search by product Name")}
          />
          <Selector
            onChange={(value) => {
              setFilterData({ ...FilterData, paymentMethod: value });
            }}
            defaultName={FilterData.paymentMethod || "Method"}
            name="Method"
            options={["Cash", "Card"]}
          />
          <Selector
            onChange={(value) => {
              setFilterData({ ...FilterData, status: value });
            }}
            defaultName={FilterData.status || "Status"}
            name="Status"
            options={["Cancel", "Processing", "Pending", "Delivered"]}
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-5 gap-2 mt-3 place-content-center place-items-center">
          <Label className="col-span-2 w-full" htmlFor="">
            {t("Start Date")}

            <Input
              onChange={(value) => {
                setFilterData({
                  ...FilterData,
                  startDate: value.target.value,
                });
              }}
              className="w-full"
              type="date"
            />
          </Label>
          <Label className="col-span-2  w-full" htmlFor="">
            {t("End Date")}

            <Input
              onChange={(value) => {
                setFilterData({
                  ...FilterData,
                  endDate: value.target.value,
                });
              }}
              className="w-full"
              type="date"
            />
          </Label>
          <Button
            onClick={() => {
              setFilterData({
                search: "",
                paymentMethod: "",
                status: "",
                startDate: "",
                endDate: "",
              });
            }}
            className="w-full"
          >
            {t("Restart")}
          </Button>
        </div>
      </section>
      <section className="mt-10 bg-gray-500/10 rounded-md p-6">
        <Order_Table FilterData={FilterData} />
      </section>
    </MainProviderPerants>
  );
}
