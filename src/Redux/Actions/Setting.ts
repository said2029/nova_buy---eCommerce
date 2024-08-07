import { Global_Setting_Get } from "@/Actions/quires";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const fetch_Setting = createAsyncThunk(
  "fetch_Setting/Setting",
  async () => {
    return await Global_Setting_Get();
  }
);

const Setting = createSlice({
  name: "setting",
  initialState: {
    setting: {},
  },
  reducers: {
    setSetting: (state, action) => {
      state.setting = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder.addCase(fetch_Setting.fulfilled, (state, action) => {
      state.setting = action.payload;
    });
  },
});

export default Setting.reducer;
