"use client";
import { Attribute_all, Attribute_Update } from "@/Actions/quires";
import { Button } from "@/components/ui/button";
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
import { setAttributes } from "@/Redux/Actions/Attribute";
import { ReduxSelector } from "@/Redux/store";
import { Edit2Icon, Trash } from "lucide-react";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

export default function Attribute_Table({
  openEdit,
}: {
  openEdit: (item: {}) => void;
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
      const data = await Attribute_all({ search: "" });
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

  useEffect(() => {
    Get_Data();
  }, []);

  return (
    <Table className="rounded-xl overflow-hidden w-full text-center border-2 border-red-400">
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
        <TableBody className="border-2 border-red-400">
          {AttributeData.attributes.map((item: any) => {
            return (
              <TableRow key={item._id} className="border-0 border-red-400">
                <TableCell>#{item._id.slice(-5)}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.option}</TableCell>
                <TableCell>
                  <Switch
                    defaultChecked={item.published}
                    onCheckedChange={async (value) => {
                      try {
                        setLoading(true);
                        await Attribute_Update(item._id, { published: value });
                        setLoading(false);
                        toast({
                          title: "success",
                          description: t_Attributes("Success_Message_updated"),
                          duration: 3000,
                        });
                      } catch (error:any) {
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
                    <Edit2Icon strokeWidth={1} />
                  </Button>
                  <Button size={"icon"} variant={"ghost"}>
                    <Trash className="text-red-500" strokeWidth={1} />
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      )}
    </Table>
  );
}
