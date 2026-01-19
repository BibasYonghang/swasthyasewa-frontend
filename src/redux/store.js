import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/AuthSlice.jsx";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});
