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
    return error;
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

// our staff
const OurStaff_Create = async (value: any) => {
  const data = await AxiosClient.post("/staff/create", value);
  return data.data;
};

const OurStaff_Delete = async (id: string) => {
  const data = await AxiosClient.delete(`/staff/${id}`);
  return data.data;
};

const OurStaff_Update = async (value: any) => {
  const data = await AxiosClient.put(`/staff/${value._id}`, value);
  return data.data;
};

const OurStaff_Get_all = async (quires?: {
  search?: string | null;
  role?: string | null;
}) => {
  const data = await AxiosClient.get(
    `/staff?search=${quires?.search || ""}&role=${quires?.role || ""}`
  );
  return data.data;
};
// const OurStaff_Get_all = async (id?: string) => {
//   const data = await AxiosClient.get(`/staff${id? `/${id}` : ""}`);
//   return data.data;
// };

export {
  Setting_Store_Update,
  Store_customiza_Update,
  Setting_Store_Get,
  Global_Setting_Update,
  Global_Setting_Get,
  OurStaff_Create,
  OurStaff_Get_all,
  OurStaff_Update,
  OurStaff_Delete,
};
