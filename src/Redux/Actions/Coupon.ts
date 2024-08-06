import { Coupon_Get_All } from "@/Actions/quires";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetch_get_coupons = createAsyncThunk(
  "fetch_get_coupons/Coupon_Slice",
  async () => {
    return await Coupon_Get_All({ search: "", page: 0 });
  }
);

const Coupon_Slice = createSlice({
  name: "coupon",
  initialState: {
    coupon: Array(),
    count: 0,
    limit: 10,
  },
  reducers: {
    setCoupon: (state, action) => {
      state.coupon = action.payload.coupons;
      state.count = action.payload.count;
      state.limit = action.payload.limit;
    },
    addCoupon: (state, action) => {
      state.coupon.push(action.payload);
    },
    removeCoupon: (state, action) => {
      state.coupon = state.coupon.filter(
        (coupon) => coupon._id !== action.payload
      );
    },
    updateCoupon: (state, action) => {
      const index = state.coupon.findIndex(
        (coupon) => coupon._id === action.payload._id
      );
      if (index > -1)
        state.coupon[index] = { ...state.coupon[index], ...action.payload };
    },
  },
  extraReducers(builder) {
    builder.addCase(fetch_get_coupons.fulfilled, (state, action) => {
      state.coupon = action.payload.coupons;
      state.count = action.payload.count;
      state.limit = action.payload.limit;
    });
  },
});

export const { setCoupon, addCoupon, removeCoupon, updateCoupon } =
  Coupon_Slice.actions;
export default Coupon_Slice.reducer;
