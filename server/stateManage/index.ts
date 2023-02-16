import { createSlice } from '@reduxjs/toolkit';

const usersSlice = createSlice({
  name: 'users',
  initialState: {
    first_Name: null,
    email: null,
    password: null
  },
  reducers: {
    setFirst_Name: (state, action) => {
      state.first_Name = action.payload.first_Name;
    },
    setIsEmail: (state, action) => {
      state.email = action.payload.email;
    },
    setPassword: (state, action) => {
      state.password = action.payload.password;
    },
    saveUser: (state) => {
      // Call API to save user details
      // Set isUserSaved to true if successful, otherwise set error
    }
  }
});

export const { setFirst_Name, setIsEmail, setPassword, saveUser } = usersSlice.actions;
export default usersSlice.reducer;


