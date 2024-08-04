"use client";
import { Get_Attribute } from "@/Redux/Actions/Attribute";
import { Get_Categories_Redux } from "@/Redux/Actions/Category";
import { Get_SubCategories } from "@/Redux/Actions/SubCategory";
import React, { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function FetchApitProvider({
  children,
}: {
  children: ReactNode;
}) {
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(Get_SubCategories());
    dispatch(Get_Categories_Redux());
    dispatch(Get_Attribute());
  }, []);

  return <div>{children}</div>;
}
