import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FilePenLine, Trash, ZoomIn } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { useTranslations } from "next-intl";
import { use, useEffect, useMemo, useState } from "react";
import {
  OurStaff_Delete,
  OurStaff_Get_all,
  OurStaff_Update,
} from "@/Actions/quires";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";
import Loadiner from "@/components/ui/Loadiner";
import { useDispatch } from "react-redux";
import { addNewStaff } from "@/Redux/Actions/OurStaff";
import { useSelector } from "react-redux";
import { ReduxSelector } from "@/Redux/store";
import moment from "moment";

export default function OurStaff_Table({
  openEdit,
  quiresFilter,
}: {
  openEdit: (id: {}) => void;
  quiresFilter?: {
    search?: string | null;
    role?: string | null;
  };
}) {
  const { toast } = useToast();
  const dataStaff = useSelector(ReduxSelector).OurStaff.Staff;
  const [isLoading, setisLoading] = useState(true);
  const t = useTranslations("table");
  const dispatch = useDispatch();

  const getAllStaff = async () => {
    try {
      setisLoading(true);
      const data = await OurStaff_Get_all(quiresFilter);
      setisLoading(false);
      dispatch(addNewStaff(data));
    } catch (error) {
      setisLoading(false);
    }
  };
  useEffect(() => {
    const set = setTimeout(() => {
      getAllStaff();
    }, 1000);
    return () => clearTimeout(set);
  }, [quiresFilter]);

  const deleteStaff = async (id: string) => {
    if (confirm("are you sure to delet this staff")) {
      try {
        await OurStaff_Delete(id);
        toast({
          title: "success",
          description: "Staff deleted successfully",
        });
        const coby_data = [...dataStaff];
        coby_data.splice(
          dataStaff.findIndex((item: any) => item._id == id),
          1
        );
        dispatch(addNewStaff(coby_data));
      } catch (error: any) {
        toast({
          title: "error",
          description: error.message,
          variant: "destructive",
        });
      }
    }
  };

  return (
    <div className="relative">
      <Table className="rounded-xl overflow-hidden border-2 border-teal-600 text-center text-nowrap relative">
        <TableHeader className="bg-gray-500/10 ">
          <TableRow>
            <TableHead className="text-center">{t("NAME")}</TableHead>
            <TableHead className="text-center">{t("EMAIL")}</TableHead>
            <TableHead className="text-center">{t("CONTACT")}</TableHead>
            <TableHead className="text-center">{t("JOINING DATE")}</TableHead>
            <TableHead className="text-center">{t("ROLE")}</TableHead>
            <TableHead className="text-center"> {t("STATUS")}</TableHead>
            <TableHead className="text-center"> {t("PUBLISHED")}</TableHead>
            <TableHead className="text-center">{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        {dataStaff && (
          <TableBody className="border-2 border-teal-600">
            {dataStaff.map((item: any, index: number) => {
              return (
                <TableRow key={item._id} className="border-0 border-teal-600">
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.email}</TableCell>
                  <TableCell>{item.phone}</TableCell>
                  <TableCell>
                    {moment(item.createdAt).format("MMMM Do YYYY")}
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell>
                    <Badge
                      className={cn(
                        `${
                          item.is_activait ? "bg-teal-600/90" : "bg-red-600/90"
                        } text-white font-semibold`
                      )}
                    >
                      {item.is_activait ? "activat" : "unActivat"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Switch
                      onCheckedChange={async (value) => {
                        try {
                          setisLoading(true);
                          await OurStaff_Update({
                            _id: item._id,
                            is_activait: value,
                          });
                          setisLoading(false);
                          toast({
                            title: "success",
                            description: "Staff updated successfully",
                            duration: 2000,
                          });
                          const newStaff: any = [...dataStaff];
                          newStaff[index].is_activait = value;
                          dispatch(addNewStaff(newStaff));
                        } catch (error) {
                          setisLoading(true);
                          toast({
                            title: "error",
                            description: "Error updating staff",
                            duration: 2000,
                          });
                          console.log("Error updating staff", error);
                        }
                      }}
                      defaultChecked={item.is_activait}
                      className="border-2 peer border-teal-600 peer-checked:border-teal-400"
                    />
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
                      onClick={() => deleteStaff(item._id)}
                      size={"icon"}
                      variant={"ghost"}
                    >
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
        )}
        {/* <TableFooter className="bg-gray-500/10 w-full">
          <TableRow>
            <TableCell
              colSpan={6}
              className="text-gray-600/80 dark:text-gray-200/80 text-start"
            >
              {t("SHOWING")} 1-8 OF 171
            </TableCell>
            <TableCell colSpan={6}>
              <PaginationComponent />
            </TableCell>
          </TableRow>
        </TableFooter> */}
      </Table>
      {isLoading && (
        <div className="w-full h-full bg-black/40 absolute top-0">
          <Loadiner />
        </div>
      )}
    </div>
  );
}
