import { configureStore, createSelector } from "@reduxjs/toolkit";
import OurStaff from "./Actions/OurStaff";
import OrdersSlice from "./Actions/Orders";
import User from "./Actions/User"

const store = configureStore({
  reducer: {
    OurStaff,
    OrdersSlice,
    User

  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
});

const ReduxSelector = createSelector(
  (state: any) => state,
  ({ OurStaff, OrdersSlice,User }) => {
    return { OurStaff, OrdersSlice,User };
  }
);
export { ReduxSelector };

export default store;
