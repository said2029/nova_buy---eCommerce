import { createSlice } from "@reduxjs/toolkit";

const UserSlice = createSlice({
  name: "User",
  initialState: {
    Body: {
      users: Array(),
      limit: 0,
      totalUser: 10,
    },
  },
  reducers: {
    setUsers: (state, action) => {
        state.Body = action.payload;
    },
    addUser: (state, action) => {
      state.Body.users.push(action.payload);
    },
    removeUser: (state, action) => {
      const index = state.Body.users.findIndex(
        (item: any) => item._id == action.payload._id
      );
      state.Body.users.splice(index, 1);
    },
    UpdateUser: (state, action) => {
      const index = state.Body.users.findIndex(
        (item: any) => item._id == action.payload._id
      );
      if (index > -1) {
        state.Body.users[index] = {
          ...state.Body.users[index],
          ...action.payload,
        };
      }
    },
  },
});

export const { setUsers, addUser, removeUser, UpdateUser } = UserSlice.actions;
export default UserSlice.reducer;
