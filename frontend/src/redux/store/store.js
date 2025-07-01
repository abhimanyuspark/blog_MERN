import { configureStore } from "@reduxjs/toolkit";
import authSlice from "../features/authSlice";
import dashSlice from "../features/dashSlice";
import blogSlice from "../features/blogSlice";
import commentSlice from "../features/commentSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    dash: dashSlice,
    blog: blogSlice,
    comment: commentSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store;
