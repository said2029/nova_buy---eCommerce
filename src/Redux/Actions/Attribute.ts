import { Attribute_all } from "@/Actions/quires";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const Get_Attribute = createAsyncThunk(
  "Get_Attribute/AttributeSlice",
  async () => {
    return await Attribute_all({ search: "" });
  }
);

const AttributeSlice = createSlice({
  name: "attributes",
  initialState: {
    attributes: Array(),
  },
  reducers: {
    setAttributes: (state, action) => {
      state.attributes = action.payload;
    },
    addAttribute: (state, action) => {
      state.attributes.push(action.payload);
    },
    removeAttribute: (state, action) => {
      state.attributes = state.attributes.filter(
        (attribute) => attribute._id !== action.payload
      );
    },
    updateAttribute: (state, action) => {
      const index = state.attributes.findIndex(
        (attribute) => attribute._id === action.payload._id
      );
      if (index !== -1) {
        state.attributes[index] = {
          ...state.attributes[index],
          ...action.payload,
        };
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(Get_Attribute.fulfilled, (state, action) => {
      state.attributes = action.payload;
    });
  }
});

export const { setAttributes, addAttribute, removeAttribute, updateAttribute } =
  AttributeSlice.actions;

export default AttributeSlice.reducer;

// Usage
