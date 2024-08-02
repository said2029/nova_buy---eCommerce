import { configureStore, createSelector } from "@reduxjs/toolkit";
import OurStaff from "./Actions/OurStaff";
import OrdersSlice from "./Actions/Orders";
import User from "./Actions/User";
import Attribute from "./Actions/Attribute";
import Coupon from "./Actions/Coupon";
import subCategury from "./Actions/SubCategory";
import Category from "./Actions/Category";

const store = configureStore({
  reducer: {
    OurStaff,
    OrdersSlice,
    User,
    Attribute,
    Coupon,
    subCategury,
    Category,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
});

const ReduxSelector = createSelector(
  (state: any) => state,
  ({
    OurStaff,
    OrdersSlice,
    User,
    Attribute,
    Coupon,
    subCategury,
    Category,
  }) => {
    return {
      OurStaff,
      OrdersSlice,
      User,
      Attribute,
      Coupon,
      subCategury,
      Category,
    };
  }
);
export { ReduxSelector };

export default store;
