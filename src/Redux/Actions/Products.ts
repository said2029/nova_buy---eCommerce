import { createSlice } from "@reduxjs/toolkit";

const product = createSlice({
  name: "product",
  initialState: {
    products: Array(),
    count: 0,
    limit: 10,
  },
  reducers: {
    setProducts: (state, action) => {
      state.products = action.payload.body;
      state.count = action.payload.count;
      state.limit = action.payload.limit;
    },
    addProduct: (state, action) => {
      state.products.push(action.payload);
    },
    updateProduct: (state, action) => {
      const index = state.products.findIndex(
        (product) => product._id === action.payload._id
      );
      if (index !== -1) {
        state.products[index] = { ...state.products[index], ...action.payload };
      }
    },
    removeProduct: (state, action) => {
      state.products = state.products.filter(
        (product) => product._id !== action.payload
      );
    },
  },
});

export const { setProducts, addProduct, updateProduct, removeProduct } = product.actions;

export default product.reducer;
