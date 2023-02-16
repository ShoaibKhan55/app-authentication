import { configureStore } from "@reduxjs/toolkit";
import usersSlice from "../stateManage/index";

const store = configureStore({
  reducer: {
    users: usersSlice.reducer,
  },
});

export default store;