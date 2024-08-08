"use client";
import { Order_Get_ById } from "@/Actions/quires";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Loadiner from "@/components/ui/Loadiner";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { ReduxSelector } from "@/Redux/store";
import clsx from "clsx";
import moment from "moment";
import { useTranslations } from "next-intl";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";

import { useReactToPrint } from "react-to-print";
export default function page({
  params: { order_id },
}: {
  params: { order_id: string };
}) {
  const t = useTranslations("invoicePage");
  const [order, setOrder] = useState<any>();
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();
  const refPrint = useRef(null);
  const { dashSetting } = useSelector(ReduxSelector);

  const handlePrint = useReactToPrint({
    content: () => refPrint.current,
  });
  const fetchOrder = async () => {
    try {
      setLoading(true);
      const response = await Order_Get_ById(order_id);
      setOrder(response);
      toast({
        title: "Success",
        description: "Order fetched successfully",
        duration: 3000,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error fetching order",
        description: error?.message,
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    fetchOrder();
  }, []);

  return (
    <div className={"p-16 relative min-h-56"}>
      {!loading ? (
        <>
          <div
            ref={refPrint}
            className="w-full dark:bg-gray-800 rounded-md py-3 px-7"
          >
            <section className="flex justify-between items-center">
              <section className="flex items-center">
                <Image
                  width={120}
                  height={120}
                  alt="logo"
                  src="/images/logo.png"
                />
                <div className="flex flex-col">
                  <h1 className="uppercase text-2xl font-bold">
                    {t("Invoice")}
                  </h1>
                  <section className="mt-2 text-gray-600 flex gap-2 items-center">
                    {t("STATUS")}
                    {"  "}
                    <Badge
                      className={clsx("bg-orange-400 text-white", {
                        "bg-orange-700": order?.status == "Pending",
                        "bg-teal-600": order?.status == "Delivered",
                        "bg-sky-700": order?.status == "Processing",
                        "bg-red-700": order?.status == "Cancel",
                      })}
                    >
                      {order?.status}
                    </Badge>
                  </section>
                </div>
              </section>
              <section className="flex flex-col justify-end text-end text-[14px] text-gray-400 opacity-80">
                <p>{dashSetting.setting.companyName}</p>
                <p>{dashSetting.setting.address}</p>
                <p>{dashSetting.setting.vatNumber}</p>
                <p>{dashSetting.setting.contactEmail}</p>
                <p>{dashSetting.setting.website}</p>
              </section>
            </section>

            <hr className="my-6 border-gray-600" />
            <section className="flex justify-between  opacity-75">
              <div className="text-[13px]">
                <h1 className="font-bold text-xl text-gray-500">
                  {t("INVOICE TO")}
                </h1>
                <p>{order?.userDetals[0]?.fullName}</p>
                <p>{order?.userDetals[0]?.phoneNumber}</p>
                <p>{order?.userDetals[0]?.email}</p>
                <p>
                  {order?.deliveryAddress?.country +
                    " / " +
                    order?.deliveryAddress?.city}
                </p>
                <p>
                  {order?.deliveryAddress?.street}, {"   "}{" "}
                  {order?.deliveryAddress?.zipCode}
                </p>
              </div>
              <div className="text-[13px]">
                <h1 className="font-bold text-xl text-gray-500">
                  {t("INVOICE NO")}
                </h1>
                <p>#{order?._id?.slice(-5)}</p>
              </div>
              <div className="text-[13px]">
                <h1 className="font-bold text-xl text-gray-500">{t("DATE")}</h1>
                <p>
                  {moment(order?.createdAt).format(
                    dashSetting?.setting?.defaultDateFormat
                  )}
                </p>
              </div>
            </section>
            <hr className="my-6 border-gray-600" />
            <Table className="border border-gray-600">
              <TableHeader className="rounded-md">
                <TableRow className="border border-gray-600 text-center">
                  <TableCell>{t("PRODUCT NAME")}</TableCell>
                  <TableCell>{t("QUANTITY")}</TableCell>
                  <TableCell>{t("PRICE")}</TableCell>
                  <TableCell>{t("AMOUNT")}</TableCell>
                </TableRow>
              </TableHeader>
              <TableBody>
                {order?.products?.map((item: any, index: number) => {
                  return (
                    <TableRow className="border border-gray-600 text-center">
                      <TableCell>{item?.titel}</TableCell>
                      <TableCell>{order?.items[index]?.quantity}</TableCell>
                      <TableCell>${item?.salePrice}</TableCell>
                      <TableCell>
                        ${+item?.salePrice * +order?.items[index]?.quantity}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <hr className="my-6 border-gray-600" />
            <section className="bg-slate-900 text-white print:text-gray-600 print:bg-white print:border print:border-dashed print:border-primary/60 flex justify-between p-10 rounded-md">
              <div>
                <p className="text-gray-500 text-lg font-bold">
                  {t("PAYMENT METHOD")}
                </p>
                <p>{order?.paymentMethod}</p>
              </div>
              <div>
                <p className="text-gray-500 text-lg font-bold">
                  {t("SHIPPING COST")}
                </p>
                <p>{order?.shoppingCost}$</p>
              </div>
              <div>
                <p className="text-gray-500 text-lg font-bold">
                  {t("DISCOUNT")}
                </p>
                <p>{order?.discount}$</p>
              </div>
              <div>
                <p className="text-gray-500 text-lg font-bold">
                  {t("TOTAL AMOUN")}
                </p>
                <p className="text-2xl text-red-400 print:text-red-400 font-bold">
                  {order?.totalAmount}
                </p>
              </div>
            </section>
          </div>
          <Button className="mt-8" onClick={handlePrint}>
            {t("Print Invoice")}
          </Button>
        </>
      ) : (
        <Loadiner />
      )}
    </div>
  );
}
