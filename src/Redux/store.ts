import { configureStore, createSelector } from "@reduxjs/toolkit";
import OurStaff from "./Actions/OurStaff";
import OrdersSlice from "./Actions/Orders";

const store = configureStore({
  reducer: {
    OurStaff,
    OrdersSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
});

const ReduxSelector = createSelector(
  (state: any) => state,
  ({ OurStaff, OrdersSlice }) => {
    return { OurStaff, OrdersSlice };
  }
);
export { ReduxSelector };

export default store;
