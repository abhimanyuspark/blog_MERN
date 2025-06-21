import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import dashSlice from "../features/dashSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dash: dashSlice,
  },
});

export default store;
