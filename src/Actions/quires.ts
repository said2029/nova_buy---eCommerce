"use server";

import AxiosClient from "@/lib/axios/AxiosClient";

//  setting store

const Setting_Store_Update = async (value: any) => {
  // create store in database
  try {
    const data = await AxiosClient.put("/store_setting/update", value);
    return data.data;
  } catch (error: any) {
    return error?.message;
  }
};

const Setting_Store_Get = async () => {
  try {
    const data = await AxiosClient.get("/store_setting");
    return data.data;
  } catch (error) {
    return error
  }
};

const Store_customiza_Update = async (value: any) => {
  try {
    const data = await AxiosClient.put("/store_customiza/update", value);
    return data.data;
  } catch (error: any) {
    return error?.message;
  }
};

const Global_Setting_Update = async (value: any) => {
  try {
    const data = await AxiosClient.put("/setting/update", value);
    return data.data;
  } catch (error: any) {
    return error?.message;
  }
};
const Global_Setting_Get = async () => {
  try {
    const data = await AxiosClient.get("/setting");
    return data.data;
  } catch (error: any) {
    return error?.message;
  }
};

export {
  Setting_Store_Update,
  Store_customiza_Update,
  Setting_Store_Get,
  Global_Setting_Update,
  Global_Setting_Get,
};
