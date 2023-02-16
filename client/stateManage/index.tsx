import { createSlice } from "@reduxjs/toolkit";

const usersSlice = createSlice({
  name: "users",
  initialState: {
    first_Name: null,
    email: null,
    password: null,
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = usersSlice.actions;
console.log(usersSlice.actions);

export default usersSlice;
