import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setAttributes, addAttribute, removeAttribute, updateAttribute } =
  AttributeSlice.actions;

export default AttributeSlice.reducer;

// Usage
