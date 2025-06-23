import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import dashSlice from "../features/dashSlice";
import blogSlice from "../features/blogSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dash: dashSlice,
    blog: blogSlice,
  },
});

export default store;
