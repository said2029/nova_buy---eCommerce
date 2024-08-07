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
import { useTranslations } from "next-intl";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import { useEffect, useState } from "react";
import { Categorys_Delete, Categorys_Get_all, Categorys_Update } from "@/Actions/quires";
import { useDispatch } from "react-redux";
import { removeCategory, setCategories } from "@/Redux/Actions/Category";
import { useToast } from "@/components/ui/use-toast";
import clsx from "clsx";
import Loadiner from "@/components/ui/Loadiner";

export default function Category_Table({
  openEdit,
  filter,
}: {
  openEdit: (item: any) => void;
  filter: { search: String };
}) {
  const t = useTranslations("table");
  const Data = useSelector(ReduxSelector).Category;
  const dispatch = useDispatch();
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast();
  const [page, setPage] = useState(0);

  const Get = async () => {
    try {
      setLoading(true);
      const data = await Categorys_Get_all({ ...filter, page });
      dispatch(setCategories(data));
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: t("ERROR"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleUpdate =async (id:string,body:any) => {
    try {
      setLoading(true);
      await Categorys_Update(id, body);
      toast({
        title: t("UPDATE"),
        description: t("Category updated successfully"),
        duration: 3000,
      });
      setLoading(false);
    } catch (error: any) {
      setLoading(false);
      toast({
        title: t("ERROR"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (id: string) => {
    try {
      if (confirm(t("Coupon_Message_ConfermDelete"))) {
        setLoading(true);
        await Categorys_Delete(id);
        toast({
          title: "DELETE",
          description: t("Category deleted successfully"),
          duration: 3000,
        });
        dispatch(removeCategory(id));
        setLoading(false);
      }
    } catch (error: any) {
      setLoading(false);

      toast({
        title: t("ERROR"),
        description: error.message,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    Get();
  }, [page]);
  useEffect(() => {
    const sit = setTimeout(() => {
      setPage(0);
      Get();
    }, 1000);
    return () => clearTimeout(sit);
  }, [filter]);

  return (
    <div className="relative">
      <Table
        className={clsx(
          "rounded-xl overflow-hidden text-center border-2 border-teal-600",
          {
            "opacity-50": isLoading,
            "pointer-events-none": isLoading,
          }
        )}
      >
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{t("ICON")}</TableHead>
            <TableHead>{t("NAME")}</TableHead>
            <TableHead> {t("DESCRIPTION")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-teal-600">
          {Data?.categories?.length >= 1 &&
            Data?.categories.map((item: any) => {
              return (
                <TableRow key={item._id} className="border-0 border-teal-600">
                  <TableCell>#{item?._id?.slice(-5)}</TableCell>
                  <TableCell className="flex justify-center">
                    <Avater_Image image={item.image} />
                  </TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Switch onCheckedChange={(value)=>handleUpdate(item._id,{is_active:value})} defaultChecked={item.is_active} />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openEdit(item)}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <FilePenLine strokeWidth={1} />
                    </Button>
                    <Button
                      onClick={() => {
                        handleDelete(item._id);
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
              colSpan={2}
              className="text-gray-600/80 text-start dark:text-gray-200/80"
            >
              {t("SHOWING")} {page + 1}-{Data.categories.length} OF{" "}
              {Math.ceil(Data.count / Data.limit)}
            </TableCell>
            <TableCell colSpan={4}>
              <PaginationComponent
                numberOfPage={page}
                limit={Data.limit}
                maxPage={Data.count}
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
