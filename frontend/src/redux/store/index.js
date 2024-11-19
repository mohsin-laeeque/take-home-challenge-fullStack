import { configureStore } from "@reduxjs/toolkit";
import isLoggedInReducer from "./isLoggedIn/isLoggedInSlice";

export const store = configureStore({
  reducer: {
    isLoggedIn: isLoggedInReducer,
  },
});
