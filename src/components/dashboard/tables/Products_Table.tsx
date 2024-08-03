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
import { FilePenLine, Printer, Trash, View, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useTranslations } from "next-intl";
import { useSelector, useDispatch } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { Product_Get_All } from "@/Actions/quires";
import { setProducts } from "@/Redux/Actions/Products";
import clsx from "clsx";
import { Switch } from "@/components/ui/switch";
import Avater_Image from "../utils/Avater_Image";
import Loadiner from "@/components/ui/Loadiner";

export default function Products_Table({
  filter,
  openEdit,
}: {
  filter?: {
    search?: string;
    isActive?: string;
    PriceSort?: number;
    category?: string;
  };
  openEdit: (item:any) => void;
}) {
  const t = useTranslations("table");
  const dispatch = useDispatch();
  const Data = useSelector(ReduxSelector).product;
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast();
  const [page, setPage] = useState(0);

  const Get_Data = async () => {
    try {
      setLoading(true);
      const data = await Product_Get_All({ ...filter, page });
      dispatch(setProducts(data));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: "Error loading products",
        description: error?.message,
        variant: "destructive",
      });
    }
  };
  useEffect(() => {
    Get_Data();
  }, [page]);

  useEffect(() => {
    const set = setTimeout(() => {
      setPage(0);
      Get_Data();
    }, 1000);
    return () => clearTimeout(set);
  }, [filter?.search, filter?.isActive, filter?.PriceSort, filter?.category]);

  return (
    <div className="relative">
      <Table className={clsx("rounded-xl overflow-hidden border-2 border-red-400",{
        "opacity-60": isLoading,
        "pointer-events-none": isLoading,
      })}>
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>{t("ICON")}</TableHead>
            <TableHead>{t("PRODUCT NAME")}</TableHead>
            <TableHead>{t("CATEGORY")}</TableHead>
            <TableHead>{t("PRICE")}</TableHead>
            <TableHead>{t("SALE PRICE")}</TableHead>
            <TableHead>{t("STOCK")}</TableHead>
            <TableHead>{t("STATUS")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400  text-center">
          {Data?.products?.length >= 1 &&
            Data?.products.map((item: any) => {
              return (
                <TableRow
                  key={item._id}
                  className="border-0 border-red-400 text-nowrap"
                >
                  <TableCell>
                    <Avater_Image image={item.images[0]} />
                  </TableCell>
                  <TableCell>{item.titel}</TableCell>
                  <TableCell>{item.category[0].name}</TableCell>
                  <TableCell> ${item.price}</TableCell>
                  <TableCell> ${item.salePrice.$numberDecimal}</TableCell>
                  <TableCell>{item.stock}</TableCell>
                  <TableCell>
                    <Badge
                      className={clsx("text-white", {
                        "bg-green-500": item.stock > 5,
                        "bg-red-500": item.stock <= 5,
                      })}
                    >
                      {item.stock > 5 ? "inStock" : "outStock"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch defaultChecked={item.isActive} />
                  </TableCell>
                  <TableCell className="flex flex-nowrap">
                    <Button size={"icon"} variant={"ghost"}>
                      <FilePenLine onClick={()=>openEdit(item)} strokeWidth={1} />
                    </Button>
                    <Button size={"icon"} variant={"ghost"}>
                      <Trash className="text-red-500" strokeWidth={1} />
                    </Button>
                    <Button size={"icon"} variant={"ghost"}>
                      <ZoomIn strokeWidth={1} />
                    </Button>
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
              {t("SHOWING")} {page + 1}-{Data.products.length} OF{" "}
              {Math.ceil(Data.count / Data.limit)}
            </TableCell>
            <TableCell colSpan={6}>
              <PaginationComponent
                limit={Data.limit}
                maxPage={Data.count}
                onChangePage={(value) => {
                  setPage(value);
                }}
                numberOfPage={page}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>
      {isLoading && <Loadiner />}
    </div>
  );
}
