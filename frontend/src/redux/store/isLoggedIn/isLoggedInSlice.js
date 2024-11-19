import { createSlice } from "@reduxjs/toolkit";

const isLoggedInSlice = createSlice({
  name: "isLoggedIn",
  initialState: { value: !!localStorage.getItem("token") },
  reducers: {
    setIsLoggedIn: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setIsLoggedIn } = isLoggedInSlice.actions;
export default isLoggedInSlice.reducer; // Default export for the reducer
