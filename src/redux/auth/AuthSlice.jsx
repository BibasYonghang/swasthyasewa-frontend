import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {
    name: "Bibas Yonghang", // default values, same as your context
    email: "test@gmail.com",
    profilePic: "/default.png",
  },
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    updateProfilePic: (state, action) => {
      state.user.profilePic = action.payload;
    },
    logout: (state) => {
      state.user = null;
    },
  },
});

export const { setUser, updateProfilePic, logout } = authSlice.actions;
export default authSlice.reducer;
