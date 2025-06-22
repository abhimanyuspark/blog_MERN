import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../lib/axios";
import { API_ROUTES } from "../../lib/routes";
const { DASHBOARD } = API_ROUTES;

// Async thunk for get dashboard
export const getDashBoard = createAsyncThunk(
  "app/dashBoard",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosInstance.get(DASHBOARD.GET_DATA);
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
      .addCase(getDashBoard.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(getDashBoard.fulfilled, (state, action) => {
        state.loading = false;
        state.dash = action.payload;
        state.success = true;
      })
      .addCase(getDashBoard.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
        state.success = false;
      });
  },
});

export default dashSlice.reducer;
