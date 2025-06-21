import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";

// Async thunk for get dashboard
export const dashBoard = createAsyncThunk(
  "app/dashBoard",
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get("/dashboard", credentials);
      return response.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message);
    }
  }
);

// Initial state
const initialState = {
  dash: null,
  loading: false,
  error: null,
  success: false,
};

// dash slice
const dashSlice = createSlice({
  name: "app",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(dashBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(dashBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.dash = action.payload;
        state.success = true;
      })
      .addCase(dashBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default dashSlice.reducer;
