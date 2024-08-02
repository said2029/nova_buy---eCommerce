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
import { Edit2Icon, Trash } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import {
  Subcategories_Delete,
  Subcategories_Get_all,
  Subcategories_Update,
} from "@/Actions/quires";
import { useEffect, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import {
  removeSubCateguries,
  setSubCateguries,
  updateSubCateguries,
} from "@/Redux/Actions/SubCategory";
import Loadiner from "@/components/ui/Loadiner";
import clsx from "clsx";

export default function SubCategory_Table({
  openEdit,
  filter = { search: "" },
}: {
  openEdit: (item: any) => void;
  filter: {
    search: string;
  };
}) {
  const t = useTranslations("table");
  const { toast } = useToast();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const Data = useSelector(ReduxSelector).subCategury;
  const [isLoading, setLoading] = useState(true);

  const Get_data = async () => {
    try {
      setLoading(true);
      const data = await Subcategories_Get_all({ ...filter, page });
      dispatch(setSubCateguries(data));
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error loading subcategories",
        description: error?.message,
        duration: 5000,
      });
      setLoading(false);
    }
  };

  const Update = async (id: string, value: any) => {
    try {
      const data = await Subcategories_Update(id, value);
      dispatch(updateSubCateguries(data));
      toast({
        title: "Success",
        description: "Subcategory updated successfully",
        duration: 3000,
      });
    } catch (error: any) {
      toast({
        title: "Error updating subcategory",
        description: error?.message,
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  const Delete = async (id: string) => {
    if (confirm(t("Coupon_Message_ConfermDelete"))) {
      try {
        setLoading(true);
        const data = await Subcategories_Delete(id);
        dispatch(removeSubCateguries(id));
        toast({
          title: "Success",
          description: "Subcategory deleted successfully",
          duration: 3000,
        });
        setLoading(false);
      } catch (error: any) {
        setLoading(false);
        toast({
          title: "Error deleting subcategory",
          description: error?.message,
          duration: 3000,
          variant: "destructive",
        });
      }
    }
  };

  useEffect(() => {
    Get_data();
  }, [page]);

  useEffect(() => {
    const set = setTimeout(() => {
      setPage(0);
      Get_data();
    }, 1000);
    return () => clearTimeout(set);
  }, [filter]);
  return (
    <div className="relative">
      <Table
        className={clsx(
          "rounded-xl overflow-hidden text-center border-2 border-red-400",
          {
            "opacity-50": isLoading,
            "pointer-events-none": isLoading,
          }
        )}
      >
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{t("NAME")}</TableHead>
            <TableHead>{t("DISPLAY NAME")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody className="border-2 border-red-400">
          {Data?.subCateguries?.length >= 1 &&
            Data.subCateguries.map((item: any) => {
              return (
                <TableRow key={item._id} className="border-0 border-red-400">
                  <TableCell>#{item?._id?.slice(-5)}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.description}</TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={item.is_active}
                      onCheckedChange={(value) => {
                        Update(item._id, { is_active: value });
                      }}
                    />
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => openEdit(item)}
                      size={"icon"}
                      variant={"ghost"}
                    >
                      <Edit2Icon strokeWidth={1} />
                    </Button>
                    <Button
                      onClick={() => {
                        Delete(item._id);
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
              {t("SHOWING")} {page + 1}-{Data?.subCateguries?.length} OF{" "}
              {Math.ceil(Data.count / Data.limit)}
            </TableCell>
            <TableCell colSpan={4}>
              <PaginationComponent
                onChangePage={(value) => {
                  setPage(value);
                }}
                numberOfPage={page}
                limit={Data.limit}
                maxPage={Data.count}
              />
            </TableCell>
          </TableRow>
        </TableFooter>
      </Table>

      {isLoading && <Loadiner />}
    </div>
  );
}
