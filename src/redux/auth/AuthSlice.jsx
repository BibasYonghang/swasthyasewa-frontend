import { createSlice } from "@reduxjs/toolkit";
import { BACKEND_URL } from "../../config/env.js";

const token = localStorage.getItem("token");
const userFromStorage = localStorage.getItem("user");

const normalizeUser = (user) => {
  if (!user) return user;

  console.log("normalizeUser input:", user);
  console.log("normalizeUser input._id:", user._id);
  
  const normalized = {
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
  
  
  return normalized;
};

const initialState = {
  //if userFromStorage exis we use normalizeuser object if not then default empty User obejct
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
  isAuthenticated: !!token, //converts the token value to true/false:
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
        _id: payload._id || state.user._id, // Ensure _id is never overwritten
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
