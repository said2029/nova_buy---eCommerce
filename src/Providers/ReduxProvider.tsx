"use client";
import store from "@/Redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

export default function ReduxProvider({ children }: { children: ReactNode }) {
  return <Provider store={store}>{children}</Provider>;
}
