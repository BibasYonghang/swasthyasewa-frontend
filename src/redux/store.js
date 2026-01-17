import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice.jsx";
import usersReducer from "./auth/UserSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
