"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import PaginationComponent from "../Pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Printer, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Order_Update, Orders_Get_All } from "@/Actions/quires";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import { addDataOrder, updateOrder } from "@/Redux/Actions/Orders";
import clsx from "clsx";
import Loadiner from "@/components/ui/Loadiner";
import moment from "moment";
import Link from "next/link";

export default function Order_Table({ FilterData }: { FilterData: any }) {
  const { toast } = useToast();
  const [isLoading, setisLoading] = useState(true);
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const Orders = useSelector(ReduxSelector).OrdersSlice.orders;
  const t = useTranslations("table");

  const FetchData = async () => {
    try {
      setisLoading(true);
      const respons = await Orders_Get_All({ ...FilterData, page: page });
      dispatch(addDataOrder(respons));
      setPage(0);
      setisLoading(false);
    } catch (error: any) {
      toast({
        title: "Error loading orders",
        description: error?.message,
        duration: 3000,
      });
      setisLoading(false);
    }
  };
  useEffect(() => {
    FetchData();
  }, [page]);

  useEffect(() => {
    const set = setTimeout(() => {
      setPage(0);
      FetchData();
    }, 1000);
    return () => clearTimeout(set);
  }, [FilterData]);

  const UpdateStatus = async (id: string, body: any) => {
    try {
      const data = await Order_Update(id, body);
      toast({
        title: t("Success"),
        description: t("Status updated successfully"),
        duration: 3000,
      });
      dispatch(updateOrder(data));
    } catch (error: any) {
      toast({
        title: t("Error updating status"),
        description: error?.message,
        variant: "destructive",
        duration: 3000,
      });
    }
  };

  return (
    <section
      className={clsx("relative", {
        "opacity-35": isLoading,
      })}
    >
      <Table className="rounded-xl overflow-hidden border-2 border-teal-600">
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>{t("INVOICE NO")}</TableHead>
            <TableHead>{t("ORDER TIME")}</TableHead>
            <TableHead>{t("CUSTOMER NAME")}</TableHead>
            <TableHead>{t("METHOD")}</TableHead>
            <TableHead>{t("AMOUNT")}</TableHead>
            <TableHead>{t("STATUS")}</TableHead>
            <TableHead>{t("ACTION")}</TableHead>
            <TableHead>{t("INVOICE")}</TableHead>
          </TableRow>
        </TableHeader>
        {!isLoading && (
          <>
            <TableBody className="border-2 text-center border-teal-600 text-nowrap">
              {Orders?.orders.length >= 1 &&
                Orders.orders.map((item: any, index: number) => {
                  return (
                    <TableRow
                      key={item._id}
                      className="border-0 border-teal-600"
                    >
                      <TableCell>{item.InvocId}</TableCell>
                      <TableCell>
                        {moment(item.createdAt).format("MMMM Do YYYY")}
                      </TableCell>
                      <TableCell>{item?.userDetals[0]?.fullName}</TableCell>
                      <TableCell>{item.paymentMethod}</TableCell>
                      <TableCell>${item.totalAmount}</TableCell>
                      <TableCell>
                        <Badge
                          className={clsx("bg-orange-400 text-white", {
                            "bg-orange-700": item.status == "Pending",
                            "bg-teal-600": item.status == "Delivered",
                            "bg-sky-700": item.status == "Processing",
                            "bg-red-700": item.status == "Cancel",
                          })}
                        >
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Select
                          onValueChange={(value) => {
                            UpdateStatus(item._id, { status: value });
                          }}
                        >
                          <SelectTrigger>{item.status}</SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Pending">
                              <p>Pending</p>
                            </SelectItem>
                            <SelectItem value="Delivered">
                              <p>Delivered</p>
                            </SelectItem>
                            <SelectItem value="Processing">
                              <p>Processing</p>
                            </SelectItem>
                            <SelectItem value="Cancel">
                              <p>Cancel</p>
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </TableCell>
                      <TableCell className="flex justify-center items-center">
                        <Link href={`/dashboard/home/orders/${item._id}`}>
                          <Printer strokeWidth={1} />
                        </Link>
                      </TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
            <TableFooter className="bg-gray-500/10">
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-gray-600/80 dark:text-gray-200/80"
                >
                  {t("SHOWING")} {page + 1} OF{" "}
                  {Math.ceil(Orders.totalOrder / Orders.limit)}
                </TableCell>
                <TableCell colSpan={6}>
                  <PaginationComponent
                    onChangePage={(value) => {
                      setPage(value);
                    }}
                    limit={Orders.limit}
                    numberOfPage={page}
                    maxPage={Orders.totalOrder}
                  />
                </TableCell>
              </TableRow>
            </TableFooter>
          </>
        )}
      </Table>
      {isLoading && <Loadiner />}
    </section>
  );
}
