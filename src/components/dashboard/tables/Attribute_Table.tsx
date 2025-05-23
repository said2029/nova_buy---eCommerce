"use client";
import {
  Attribute_all,
  Attribute_Delete,
  Attribute_Update,
} from "@/Actions/quires";
import { Button } from "@/components/ui/button";
import Loadiner from "@/components/ui/Loadiner";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { removeAttribute, setAttributes } from "@/Redux/Actions/Attribute";
import { ReduxSelector } from "@/Redux/store";
import clsx from "clsx";
import { FilePenLine, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Attribute_Table({
  openEdit,
  filterQueris,
}: {
  openEdit: (item: {}) => void;
  filterQueris: any;
}) {
  const t = useTranslations("table");
  const t_Attributes = useTranslations("Attributes");
  const dispatch = useDispatch();
  const AttributeData = useSelector(ReduxSelector).Attribute;
  const [isLoading, setLoading] = useState(true);
  const { toast } = useToast();

  const Get_Data = async () => {
    try {
      setLoading(true);
      const data = await Attribute_all({ search: filterQueris.search });
      dispatch(setAttributes(data));
      setLoading(false);
    } catch (error: any) {
      toast({
        title: "Error loading attributes",
        description: error?.message,
        duration: 3000,
      });
      setLoading(false);
    }
  };
  const Delete = async (id: string) => {
    try {
      if (confirm("Are you sure you want to delete this attribute?")) {
        setLoading(true);
        await Attribute_Delete(id);
        setLoading(false);
        dispatch(removeAttribute(id));
        toast({
          title: "Succsess",
          description: "Attribute Deleted!",
          duration: 3000,
        });
      }
    } catch (error) {
      setLoading(false);
      toast({
        title: "Error",
        description: "Attribute Failed Deleted!",
        duration: 3000,
        variant: "destructive",
      });
    }
  };

  useEffect(() => {
    const set = setTimeout(() => {
      Get_Data();
    }, 1000);
    return () => clearTimeout(set);
  }, [filterQueris.search]);

  return (
    <div className="relative w-full">
      <Table
        className={clsx(
          "rounded-xl overflow-hidden w-full text-center border-2 border-teal-600",
          {
            "opacity-60": isLoading,
            "pointer-events-none": isLoading,
          }
        )}
      >
        <TableHeader className="bg-gray-500/10">
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>{t("NAME")}</TableHead>
            <TableHead> {t("Option")}</TableHead>
            <TableHead>{t("PUBLISHED")}</TableHead>
            <TableHead>{t("ACTIONS")}</TableHead>
          </TableRow>
        </TableHeader>
        {AttributeData.attributes && (
          <TableBody className="border-2 border-teal-600">
            {AttributeData.attributes.map((item: any) => {
              return (
                <TableRow key={item._id} className="border-0 border-teal-600">
                  <TableCell>#{item._id.slice(-5)}</TableCell>
                  <TableCell>{item.name}</TableCell>
                  <TableCell>{item.option}</TableCell>
                  <TableCell>
                    <Switch
                      defaultChecked={item.published}
                      onCheckedChange={async (value) => {
                        try {
                          setLoading(true);
                          await Attribute_Update(item._id, {
                            published: value,
                          });
                          setLoading(false);
                          toast({
                            title: "success",
                            description: t_Attributes(
                              "Success_Message_updated"
                            ),
                            duration: 3000,
                          });
                        } catch (error: any) {
                          toast({
                            title: t_Attributes("Error_updating"),
                            description: error.message,
                            variant: "destructive",
                            duration: 3000,
                          });
                          setLoading(false);
                        }
                      }}
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
                      onClick={() => Delete(item._id)}
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
        )}
      </Table>
      {isLoading && <Loadiner />}
    </div>
  );
}
