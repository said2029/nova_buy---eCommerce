import { configureStore, createSelector } from "@reduxjs/toolkit";
import OurStaff from "./Actions/OurStaff";

const store = configureStore({
  reducer: {
    OurStaff,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: true,
      serializableCheck: true,
    }),
});

const ReduxSelector = createSelector(
  (state: any) => state,
  ({ OurStaff }) => {
    return { OurStaff };
  }
);
export { ReduxSelector };

export default store;
