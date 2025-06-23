import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { API_ROUTES } from "../../lib/routes";
const { BLOG_POSTS } = API_ROUTES;

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (credentials, { rejectWithValue }) => {
    const { page } = credentials;
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_ALL, {
        params: { page },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  blogs: {},
  loading: false,
  error: null,
};

const blogSlice = createSlice({
  name: "blogs",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        // If page > 1, append; else, replace
        if (action.meta.arg && action.meta.arg.page > 1) {
          state.blogs.posts.push(...action.payload.posts);
          // Optionally update other pagination info if needed, e.g.:
          state.blogs.page = action.payload.page;
          state.blogs.totalPages = action.payload.totalPages;
        } else {
          state.blogs = action.payload;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default blogSlice.reducer;
