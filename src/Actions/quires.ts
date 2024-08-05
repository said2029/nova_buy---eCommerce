"use server";

import Fetch from "@/lib/axios/AxiosClient";
import { threadId } from "worker_threads";

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

//  users
const User_Get_All = async (quiers: { page: number; search: string }) => {
  try {
    const data = await Fetch.get(
      `/user?page=${quiers.page}&search=${quiers.search}`
    );
    return data;
  } catch (error: any) {
    throw error;
  }
};

const User_Update = async (id: string, value: any) => {
  const data = await Fetch.put(`/user/update/${id}`, {
    body: JSON.stringify(value),
  });
  return data;
};

const User_Delete = async (id: string) => {
  try {
    await Fetch.delete(`/user/delete/${id}`);
  } catch (error) {
    throw error;
  }
};

// Attribute
const Attribute_all = async (quires: { search: string }) => {
  try {
    const data = await Fetch.get(`/attribute/?search=${quires.search}`);
    return data;
  } catch (error) {
    throw error;
  }
};

const Attribute_Create = async (value: any) => {
  try {
    const data = await Fetch.post("/attribute/create", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Attribute_Update = async (id: string, value: any) => {
  try {
    const data = await Fetch.put(`/attribute/update/${id}`, {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Attribute_Delete = async (id: string) => {
  try {
    await Fetch.delete(`/attribute/${id}`);
  } catch (error) {
    throw error;
  }
};

const Attribute_ById = async (id: string) => {
  try {
    const data = await Fetch.get(`/attribute/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};
// coupons
const Coupon_Get_All = async (queris: { search: ""; page: number }) => {
  try {
    const data = await Fetch.get(
      `/coupon?search=${queris.search}&page=${queris.page}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const Coupon_Create = async (value: any) => {
  try {
    const data = await Fetch.post("/coupon/create", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Coupon_Update = async (id: string, value: any) => {
  try {
    const data = await Fetch.put(`/coupon/update/${id}`, {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Coupon_Delete = async (id: string) => {
  try {
    const data = await Fetch.delete(`/coupon/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// subCategories

const Subcategories_Get_all = async (queris: {
  search: string;
  page: number;
}) => {
  try {
    const data = await Fetch.get(
      `/sub_category?search=${queris.search}&page=${queris.page}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const Subcategories_Create = async (value: any) => {
  try {
    const data = await Fetch.post("/sub_category/create", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Subcategories_Update = async (id: string, value: any) => {
  try {
    const data = await Fetch.put(`/sub_category/${id}`, {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Subcategories_Delete = async (id: string) => {
  try {
    const data = await Fetch.delete(`/sub_category/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// categorys

const Categorys_Get_all = async (queris: { search: String; page: number }) => {
  try {
    const data = await Fetch.get(
      `/category?search=${queris.search}&page=${queris.page}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};

const Categorys_Create = async (value: any) => {
  try {
    const data = await Fetch.post("/category/create", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Categorys_Update = async (id: string, value: any) => {
  try {
    const data = await Fetch.put(`/category/${id}`, {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Categorys_Delete = async (id: string) => {
  try {
    const data = await Fetch.delete(`/category/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
};

// product
const Product_Get_All = async (queris: {
  search?: string;
  isActive?: string;
  PriceSort?: number;
  page?: number;
  category?:string
}) => {
  try {
    const data = await Fetch.get(
      `/product?search=${queris?.search}&isActive=${queris?.isActive}&PriceSort=${queris?.PriceSort}&page=${queris?.page}&category=${queris.category}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
const Product_Create = async (value: any) => {
  try {
    const data = await Fetch.post("/product/create", {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
};

const Product_Update = async (id: string, value: any) => {
  try {
    const data = await Fetch.put(`/product/${id}`, {
      body: JSON.stringify(value),
    });
    return data;
  } catch (error) {
    throw error;
  }
}

const Product_Delete = async (id: string) => {
  try {
    const data = await Fetch.delete(`/product/${id}`);
    return data;
  } catch (error) {
    throw error;
  }
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
  User_Get_All,
  User_Update,
  User_Delete,
  Attribute_Create,
  Attribute_Update,
  Attribute_Delete,
  Attribute_ById,
Attribute_all,
  Coupon_Get_All,
  Coupon_Create,
  Coupon_Update,
  Coupon_Delete,
  Subcategories_Get_all,
  Subcategories_Create,
  Subcategories_Update,
  Subcategories_Delete,
  Categorys_Get_all,
  Categorys_Create,
  Categorys_Update,
  Categorys_Delete,
  Product_Get_All,
  Product_Create,
  Product_Update,
  Product_Delete
};
