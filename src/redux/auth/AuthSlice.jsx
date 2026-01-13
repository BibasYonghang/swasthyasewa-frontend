import { createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config/env.js";

const token = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const normalizeUser = (user) => {
  if (!user) return user;

  return {
    ...user,
    profilePicture: user.profilePicture
      ? user.profilePicture.startsWith("http")
        ? user.profilePicture
        : `${BACKEND_URL}/${user.profilePicture}`
      : "",
    coverPicture: user.coverPicture
      ? user.coverPicture.startsWith("http")
        ? user.coverPicture
        : `${BACKEND_URL}/${user.coverPicture}`
      : "",
  };
};

const initialState = {
  user: userFromStorage
    ? normalizeUser(JSON.parse(userFromStorage))
    : {
        _id: null,
        name: "",
        email: "",
        profilePicture: "",
        coverPicture: "",
      },
  token: token || null,
  isAuthenticated: !!token,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser(state, action) {
      const payload = action.payload.user ?? action.payload;
      state.user = normalizeUser({
        ...state.user,
        ...payload,
      });

      state.isAuthenticated = true;
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
        profilePicture: "",
        coverPicture: "",
      };
      state.token = null;
      state.isAuthenticated = false;
      localStorage.removeItem("token");
      localStorage.removeItem("user");
    },
  },
});

export const { setUser, setToken, logout } = authSlice.actions;
export default authSlice.reducer;
