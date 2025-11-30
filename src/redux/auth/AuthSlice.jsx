// src/auth/AuthSlice.jsx
import { createSlice } from "@reduxjs/toolkit";

// Check if we have a token and user in localStorage
const token = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const initialState = {
  user: userFromStorage
    ? JSON.parse(userFromStorage)
    : {
        _id: null,
        name: "",
        email: "",
        profilePic: "",
      },
  token: token || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      state.user = {
        _id: action.payload._id,
        name: action.payload.name,
        email: action.payload.email,
        profilePic:
          action.payload.profilePic || action.payload.profilePicture || "",
      };
      state.isAuthenticated = true;
      // Save to localStorage for persistence
      localStorage.setItem("user", JSON.stringify(state.user));
    },
    setToken(state, action) {
      state.token = action.payload;
      localStorage.setItem("token", action.payload);
    },
    logout(state) {
      state.user = {
        _id: null,
        name: "",
        email: "",
        profilePic: "",
      };
      state.token = null;
      state.isAuthenticated = false;
      // Clear localStorage
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
