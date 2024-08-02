import { configureStore, createSelector } from "@reduxjs/toolkit";
import OurStaff from "./Actions/OurStaff";
import OrdersSlice from "./Actions/Orders";
import User from "./Actions/User";
import Attribute from "./Actions/Attribute";
import Coupon from "./Actions/Coupon";
import subCategury from "./Actions/SubCategory";

const store = configureStore({
  reducer: {
    OurStaff,
    OrdersSlice,
    User,
    Attribute,
    Coupon,
    subCategury,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
});

const ReduxSelector = createSelector(
  (state: any) => state,
  ({ OurStaff, OrdersSlice, User, Attribute, Coupon, subCategury }) => {
    return { OurStaff, OrdersSlice, User, Attribute, Coupon, subCategury };
  }
);
export { ReduxSelector };

export default store;
