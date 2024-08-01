import { configureStore, createSelector } from "@reduxjs/toolkit";
import OurStaff from "./Actions/OurStaff";
import OrdersSlice from "./Actions/Orders";
import User from "./Actions/User";
import Attribute from "./Actions/Attribute";

const store = configureStore({
  reducer: {
    OurStaff,
    OrdersSlice,
    User,
    Attribute,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
});

const ReduxSelector = createSelector(
  (state: any) => state,
  ({ OurStaff, OrdersSlice, User, Attribute }) => {
    return { OurStaff, OrdersSlice, User, Attribute };
  }
);
export { ReduxSelector };

export default store;
