import { createSlice } from "@reduxjs/toolkit";

const ourStaff = createSlice({
  name: "ourStaff",
  initialState: {
    Staff: Array(),
  },
  reducers: {
    addNewStaff: (state, action) => {
      state.Staff = action.payload;
    },
    addStaff: (state, action) => {
      state.Staff.push(action.payload);
    },
    removeStaff: (state, action) => {
      state.Staff = state.Staff.filter(
        (staff: any) => staff._id !== action.payload
      );
    },
    updateStaff: (state, action) => {
      console.log(action.payload);
      state.Staff[
        state.Staff.findIndex((item) => item._id == action.payload._id)
      ] = action.payload;
    },
  },
});

export const { addStaff, removeStaff, updateStaff, addNewStaff } =
  ourStaff.actions;
export default ourStaff.reducer;
