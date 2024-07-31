import { createSlice } from "@reduxjs/toolkit";

const OrdersSlice = createSlice({
  name: "Orders",
  initialState: {
    orders:{
        totalOrder: 0,
        limit: 10,
        orders: Array()
    },
  },
  reducers: {
    addOrder: (state, action) => {
      state.orders.orders.push(action.payload);
    },
    addDataOrder: (state, action) => {
      state.orders = action.payload;
    },
    removeOrder: (state, action) => {
      state.orders.orders = state.orders.orders.filter(
        (order) => order._id !== action.payload._id
      );
    },
    updateOrder: (state, action) => {
      const index = state.orders.orders.findIndex(
        (order) => order._id === action.payload._id
      );
      if (index !== -1) {
        state.orders.orders[index] = {...state.orders.orders[index],...action.payload };
      }
    },
  },
});

export const { addOrder, addDataOrder, removeOrder, updateOrder } =
  OrdersSlice.actions;
export default OrdersSlice.reducer;
