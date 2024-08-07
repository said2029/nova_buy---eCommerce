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
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash, ZoomIn } from "lucide-react";
import Avater_Image from "../utils/Avater_Image";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import { useDispatch } from "react-redux";
import { removeCoupon, setCoupon, updateCoupon } from "@/Redux/Actions/Coupon";
import { Coupon_Delete, Coupon_Get_All, Coupon_Update } from "@/Actions/quires";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import moment from "moment";
import clsx from "clsx";
import Loadiner from "@/components/ui/Loadiner";

export default function Coupon_Table({
  openEdit,
  filter,
}: {
  openEdit: (value: any) => void;
  filter: any;
}) {
  const t = useTranslations("table");
  const t_conpon = useTranslations("Coupon");
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast();
  const dispatch = useDispatch();
  const Coupon_Data = useSelector(ReduxSelector).Coupon;
  const [page, setPage] = useState(0);

  const Get_Coupons = async () => {
    try {
      setLoading(true);
      const data = await Coupon_Get_All({ ...filter, page });
      dispatch(setCoupon(data));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error loading coupons",
        description: error?.message,
        variant: "destructive",
      });
    }
  };

  const Update_Coupon = async (id: string, value: any) => {
    try {
      setLoading(true);
      const data = await Coupon_Update(id, value);
      dispatch(updateCoupon(data));
      toast({
        title: "Successfully",
        description: t_conpon("Coupon_Message_Success"),
        duration: 2000,
      });
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error updating coupon",
        description: error?.message,
        variant: "destructive",
      });
      setLoading(false);
    }
  };

  const Delete_Coupon = async (id: string) => {
    if (confirm(t_conpon("Coupon_Message_ConfermDelete"))) {
      try {
        setLoading(true);
        const data = await Coupon_Delete(id);
        dispatch(removeCoupon(id));
        toast({
          title: "Successfully",
          description: t_conpon("Coupon_Message_Success"),
          duration: 2000,
        });
        setLoading(false);
      } catch (error: any) {
        toast({
          title: "Error deleting coupon",
          description: error?.message,
          variant: "destructive",
        });
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    Get_Coupons();
  }, [page]);

  useEffect(() => {
    const set = setTimeout(() => {
      setPage(0);
      Get_Coupons();
    }, 1000);
    return () => clearTimeout(set);
  }, [filter]);

  return (
    <div className="relative">
      <Table
        className={clsx(
          "rounded-xl overflow-hidden text-center border-2 border-teal-600",
          {
            "opacity-60": isLoading,
            "pointer-events-none": isLoading,
          }
        )}
      >
        <TableHeader className="bg-gray-500/10 text-nowrap">
          <TableRow>
            <TableHead>{t("ICON")}</TableHead>
            <TableHead>{t("NAME")}</TableHead>
            <TableHead>{t("CODE")}</TableHead>
            <TableHead>{t("DISCOUNT")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("End Time")}</TableHead>
            <TableHead>{t("STATUS")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-teal-600">
          {Coupon_Data.coupon &&
            Coupon_Data.coupon.map((item: any, index: number) => {
              return (
                <TableRow
                  key={item._id}
                  className="border-0 border-teal-600 text-nowrap"
                >
                  <TableCell className="flex !justify-center">
                    <Avater_Image image={item.Image} />
                  </TableCell>
                  <TableCell>
                    <span>{item.name}</span>
                  </TableCell>
                  <TableCell>{item.code}</TableCell>
                  <TableCell>{item.discount}$</TableCell>
                  <TableCell>
                    <Switch
                      onCheckedChange={(value) => {
                        Update_Coupon(item._id, { is_active: value });
                      }}
                      defaultChecked={item.is_active}
                    />
                  </TableCell>
                  <TableCell>
                    {moment(item.time_validate).format("MMMM Do YYYY")}
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={clsx("text-white", {
                        "bg-green-500": item.is_active,
                        "bg-red-500": !item.is_active,
                      })}
                    >
                      {item.is_active ? "Active" : "Not Active"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button size={"icon"} variant={"ghost"}>
                      <FilePenLine
                        onClick={() => openEdit(item)}
                        strokeWidth={1}
                      />
                    </Button>
                    <Button
                      onClick={() => {
                        Delete_Coupon(item._id);
                      }}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <Trash className="text-red-500" strokeWidth={1} />
                    </Button>
                  </TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        <TableFooter className="bg-gray-500/10">
          <TableRow>
            <TableCell
              colSpan={4}
              className="text-gray-600/80 text-start dark:text-gray-200/80"
            >
              SHOWING {page + 1}-{Coupon_Data.limit} OF{" "}
              {Math.ceil(Coupon_Data.count / Coupon_Data.limit)}
            </TableCell>
            <TableCell colSpan={4}>
              <PaginationComponent
                numberOfPage={page}
                maxPage={Coupon_Data.count}
                limit={Coupon_Data.limit}
                onChangePage={(value) => {
                  setPage(value);
                }}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {isLoading && <Loadiner />}
    </div>
  );
}
