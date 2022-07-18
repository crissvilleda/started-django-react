import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "api";

export const getMe = createAsyncThunk("login/me", async () => {
  const response = await api.get("user/me");
  return response;
});

export const login = createAsyncThunk("login/login", async (data) => {
  const response = await api.post("user/login/", data);
  return response;
});

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {},
    loading: false,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMe.fulfilled, (state, action) => {
      state.user = action.payload;
      state.loading = false;
    }),
      builder.addCase(getMe.pending, (state, action) => {
        state.loading = true;
      }),
      builder.addCase(getMe.rejected, (state, action) => {
        state.loading = false;
      }),
      builder.addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      });
    builder.addCase(login.pending, (state, action) => {
      state.loading = true;
    }),
      builder.addCase(login.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export const { setUser } = loginSlice.actions;

export default loginSlice.reducer;
