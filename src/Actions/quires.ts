"use server";

import Fetch from "@/lib/axios/AxiosClient";

//  setting store

const Setting_Store_Update = async (value: any) => {
  // create store in database
  try {
    const data = await Fetch.put("/store_setting/update", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error: any) {
    return error?.message;
  }
};

const Setting_Store_Get = async () => {
  try {
    const data = await Fetch.get("/store_setting");
    return data;
  } catch (error) {
    return error;
  }
};

const Store_customiza_Update = async (value: any) => {
  try {
    const data = await Fetch.put("/store_customiza/update", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error: any) {
    return error?.message;
  }
};

const Global_Setting_Update = async (value: any) => {
  try {
    const data = await Fetch.put("/setting/update", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error: any) {
    return error?.message;
  }
};
const Global_Setting_Get = async () => {
  try {
    const data = await Fetch.get("/setting");
    return data;
  } catch (error: any) {
    return error?.message;
  }
};

// our staff
const OurStaff_Create = async (value: any) => {
  const data = await Fetch.post("/staff/create", {
    body: JSON.stringify(value),
  });
  return data;
};

const OurStaff_Delete = async (id: string) => {
  try {
    await Fetch.delete(`/staff/${id}`, { next: { tags: ["get-OurStaff"] } });
  } catch (error) {
    throw error;
  }
};

const OurStaff_Update = async (value: any) => {
  const data = await Fetch.put(`/staff/${value._id}`, {
    body: JSON.stringify(value),
  });
  return data;
};

const OurStaff_Get_all = async (quires?: {
  search?: string | null;
  role?: string | null;
}) => {
  const data = await Fetch.get(
    `/staff?search=${quires?.search || ""}&role=${quires?.role || ""}`
  );
  return data;
};

//  Orders
const Orders_Get_All = async (quires: {
  search: string;
  paymentMethod: string;
  status: string;
  startDate: string;
  endDate: string;
  page: number;
}) => {
  try {
    const data = await Fetch.get(
      `/order?search=${quires.search}&status=${quires.status}&paymentMethod=${quires.paymentMethod}&startDate=${quires.startDate}&endDate=${quires.endDate}&page=${quires.page}`
    );
    return data;
  } catch (error) {
    return error;
  }
};

const Order_Update = (id: string, body: any) => {
  const data = Fetch.put(`/order/update/${id}`, { body: JSON.stringify(body) });
  return data;
};
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
  Orders_Get_All,
  Order_Update,
};
