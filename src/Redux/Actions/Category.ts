import { Categorys_Get_all } from "@/Actions/quires";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const Get_Categories_Redux = createAsyncThunk(
  "Get_Categories_Redux/Category",
  async () => {
    return await Categorys_Get_all({page:0,search:""});
  }
);

const Category = createSlice({
  name: "Category",
  initialState: {
    categories: Array(),
    count: 0,
    limit: 10,
  },
  reducers: {
    setCategories: (state, action) => {
      state.categories = action.payload.body;
      state.count = action.payload.count;
      state.limit = action.payload.limit;
    },
    addCategory: (state, action) => {
      state.categories.push(action.payload);
    },
    updateCategory: (state, action) => {
      const index = state.categories.findIndex(
        (category) => category._id === action.payload._id
      );
      if (index !== -1) {
        state.categories[index] = {
          ...state.categories[index],
          ...action.payload,
        };
      }
    },
    removeCategory: (state, action) => {
      state.categories = state.categories.filter(
        (category) => category._id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Get_Categories_Redux.fulfilled, (state, action) => {
      state.categories = action.payload.body;
      state.count = action.payload.count;
      state.limit = action.payload.limit;
    });
  }
});

export const { setCategories, addCategory, updateCategory, removeCategory } =
  Category.actions;

export default Category.reducer;
