import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { API_ROUTES } from "../../lib/routes";
const { BLOG_POSTS } = API_ROUTES;

export const uploadImage = createAsyncThunk(
  "blogs/uploadImage",
  async (formData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(BLOG_POSTS.UPLOAD, formData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchBlogs = createAsyncThunk(
  "blogs/fetchBlogs",
  async (credentials, { rejectWithValue }) => {
    const { page, status } = credentials;
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_ALL, {
        params: { status, page },
      });
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const createBlog = createAsyncThunk(
  "blogs/createBlog",
  async (blogData, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(BLOG_POSTS.CREATE, blogData);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchTrendingBlogs = createAsyncThunk(
  "blogs/fetchTrendingBlogs",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_TRENDING);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const searchBlogs = createAsyncThunk(
  "blogs/searchBlogs",
  async (query, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_SEARCH(query));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchBlogById = createAsyncThunk(
  "blogs/fetchBlogById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_POST_BY_ID(id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const updateBlog = createAsyncThunk(
  "blogs/updateBlog",
  async ({ id, data }, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.put(BLOG_POSTS.UPDATE(id), data);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const deleteBlog = createAsyncThunk(
  "blogs/deleteBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.delete(BLOG_POSTS.DELETE(id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchBlogsByTag = createAsyncThunk(
  "blogs/fetchBlogsByTag",
  async (tagId, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_BY_TAG(tagId));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const fetchBlogBySlug = createAsyncThunk(
  "blogs/fetchBlogBySlug",
  async (slug, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(BLOG_POSTS.GET_BY_SLUG(slug));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const incrementBlogViews = createAsyncThunk(
  "blogs/incrementBlogViews",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(BLOG_POSTS.VIEWS(id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

export const likeBlog = createAsyncThunk(
  "blogs/likeBlog",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.post(BLOG_POSTS.LIKES(id));
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

const initialState = {
  blogs: {},
  blog: {},
  trendings: [],
  searchResults: [],
  byTag: [],
  loading: false,
  error: null,
  success: false,
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
        state.success = true;
        // If page > 1, append; else, replace
        if (action.meta.arg && action.meta.arg.page > 1) {
          state.blogs.posts.push(...action.payload.posts);
          // Optionally update other pagination info if needed, e.g.:

          state.blogs.totalPages = action.payload.totalPages;
        } else {
          state.blogs = action.payload;
        }
      })
      .addCase(fetchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(createBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally, add the new blog to the list if needed
        if (state.blogs.posts) {
          state.blogs.posts.unshift(action.payload);
        }
      })
      .addCase(createBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchTrendingBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendingBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.trendings = action.payload;
      })
      .addCase(fetchTrendingBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(searchBlogs.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(searchBlogs.fulfilled, (state, action) => {
        state.loading = false;
        state.searchResults = action.payload;
      })
      .addCase(searchBlogs.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchBlogById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogById.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(updateBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBlog.fulfilled, (state, action) => {
        state.loading = false;

        // Update the blog in posts array if it exists
        if (state.blogs.posts) {
          state.blogs.posts = state.blogs.posts.map((blog) =>
            blog._id === action.payload._id ? action.payload : blog
          );
        }
      })
      .addCase(updateBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(deleteBlog.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteBlog.fulfilled, (state, action) => {
        state.loading = false;
        // Optionally remove the blog from the posts array
        if (state.blogs.posts) {
          state.blogs.posts = state.blogs.posts.filter(
            (b) => b._id !== action.meta.arg
          );
        }
      })
      .addCase(deleteBlog.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchBlogsByTag.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogsByTag.fulfilled, (state, action) => {
        state.loading = false;
        state.byTag = action.payload;
      })
      .addCase(fetchBlogsByTag.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      .addCase(fetchBlogBySlug.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchBlogBySlug.fulfilled, (state, action) => {
        state.loading = false;
        state.blog = action.payload;
      })
      .addCase(fetchBlogBySlug.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || action.error.message;
      })

      // .addCase(incrementBlogViews.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(incrementBlogViews.fulfilled, (state, action) => {
        // state.loading = false;
        // Optionally update views in current or posts
        if (state.blog && state.blog._id === action.payload._id) {
          state.blog.views = action.payload.views;
        }
      })
      // .addCase(incrementBlogViews.rejected, (state, action) => {
      //   state.loading = false;
      //   state.error = action.payload || action.error.message;
      // })

      // .addCase(likeBlog.pending, (state) => {
      //   state.loading = true;
      //   state.error = null;
      // })
      .addCase(likeBlog.fulfilled, (state, action) => {
        // state.loading = false;
        // Optionally update likes in current or posts
        if (state.blog && state.blog._id === action.payload._id) {
          state.blog.likes = action.payload.likes;
          state.blog.likedBy = action.payload.likedBy;
        }
      });
    // .addCase(likeBlog.rejected, (state, action) => {
    //   state.loading = false;
    //   state.error = action.payload || action.error.message;
    // });
  },
});

export default blogSlice.reducer;
