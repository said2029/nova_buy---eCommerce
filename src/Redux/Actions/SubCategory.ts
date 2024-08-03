import { Subcategories_Get_all } from "@/Actions/quires";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const Get_SubCategories = createAsyncThunk(
  "subCategurySlice/Get_SubCategories",
  async () => {
    return await Subcategories_Get_all({ search: "", page: 0 });
  }
);
const subCategury = createSlice({
  name: "subCategurySlice",
  initialState: {
    subCateguries: Array(),
    limit: 10,
    count: 0,
  },
  reducers: {
    setSubCateguries: (state, action) => {
      state.subCateguries = action.payload.body;
      state.limit = action.payload.limit;
      state.count = action.payload.count;
    },
    addSubCateguries: (state, action) => {
      state.subCateguries.push(action.payload);
      state.count += 1;
    },
    updateSubCateguries: (state, action) => {
      const index = state.subCateguries.findIndex(
        (subCategury) => subCategury._id === action.payload._id
      );
      if (index !== -1) {
        state.subCateguries[index] = {
          ...state.subCateguries[index],
          ...action.payload,
        };
      }
    },
    removeSubCateguries: (state, action) => {
      state.subCateguries = state.subCateguries.filter(
        (subCategury) => subCategury._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Get_SubCategories.fulfilled, (state, action) => {
      state.subCateguries = action.payload.body;
      state.limit = action.payload.limit;
      state.count = action.payload.count;
    });
  },
});

export const {
  setSubCateguries,
  addSubCateguries,
  updateSubCateguries,
  removeSubCateguries,
} = subCategury.actions;


export default subCategury.reducer;
