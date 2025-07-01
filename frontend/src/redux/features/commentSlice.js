import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { API_ROUTES } from "../../lib/routes";
const { COMMENTS } = API_ROUTES;

const initialState = {
  comments: [],
  loading: false,
  error: null,
};

export const fetchCommentsByPostId = createAsyncThunk(
  "comments/fetchCommentsByPostId",
  async (postId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(COMMENTS.GET_COMMENT_BY_POST(postId));
      return res.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data?.message || error.message
      );
    }
  }
);

export const fetchComments = createAsyncThunk(
  "comments/fetchComments",
  async (postId, thunkAPI) => {
    try {
      const res = await axiosInstance.get(COMMENTS.GET_ALL);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const addComment = createAsyncThunk(
  "comments/addComment",
  async ({ postId, parentComment, content }, thunkAPI) => {
    try {
      const res = await axiosInstance.post(
        COMMENTS.CREATE_COMMENT_BY_POST(postId),
        { parentComment, content }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err?.response?.data?.error
      );
    }
  }
);

export const updateComment = createAsyncThunk(
  "comments/updateComment",
  async ({ commentId, content }, thunkAPI) => {
    try {
      const res = await axiosInstance.put(
        COMMENTS.UPDATE_COMMENT_BY_ID(commentId),
        {
          content,
        }
      );
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

export const deleteComment = createAsyncThunk(
  "comments/deleteComment",
  async (commentId, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(
        COMMENTS.DELETE_COMMENT_BY_ID(commentId)
      );
      return response.data;
    } catch (err) {
      return thunkAPI.rejectWithValue(
        err.response?.data?.message || err.message
      );
    }
  }
);

const commentSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Fetch comments by postId
      .addCase(fetchCommentsByPostId.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCommentsByPostId.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(fetchCommentsByPostId.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Add
      .addCase(addComment.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(addComment.fulfilled, (state, action) => {
        state.loading = false;
        // If the new comment is a reply (has parentComment), add it to the parent's replies array
        const newComment = action.payload;
        if (newComment.parentComment) {
          const parentIdx = state.comments.findIndex(
            (c) => c._id === newComment.parentComment
          );
          if (parentIdx !== -1) {
            if (!state.comments[parentIdx].replies) {
              state.comments[parentIdx].replies = [];
            }
            state.comments[parentIdx].replies.push(newComment);
          }
        } else {
          // Top-level comment
          state.comments.push(newComment);
        }
      })
      .addCase(addComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update
      .addCase(updateComment.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(updateComment.fulfilled, (state, action) => {
        state.loading = false;
        const idx = state.comments.findIndex(
          (c) => c._id === action.payload._id
        );
        if (idx !== -1) state.comments[idx] = action.payload;
      })
      .addCase(updateComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete
      .addCase(deleteComment.pending, (state) => {
        // state.loading = true;
        state.error = null;
      })
      .addCase(deleteComment.fulfilled, (state, action) => {
        state.loading = false;

        const deletedComment = action.payload;
        if (deletedComment.parentComment) {
          const parentIdx = state.comments.findIndex(
            (c) => c._id === deletedComment.parentComment
          );
          if (parentIdx !== -1) {
            if (!state.comments[parentIdx].replies) {
              state.comments[parentIdx].replies = [];
            }
            state.comments[parentIdx].replies = state.comments[
              parentIdx
            ].replies.filter((f) => deletedComment?._id !== f?._id);
          }
        } else {
          // Top-level comment
          state.comments = state.comments.filter(
            (f) => deletedComment?._id !== f?._id
          );
        }
      })
      .addCase(deleteComment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export default commentSlice.reducer;
