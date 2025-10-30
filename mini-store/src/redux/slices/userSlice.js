import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { CREATE_USER, FETCH_USER } from "../../constants/actionTypes";
import { ASYNC_STATUS } from "../../constants/asyncStatus";

// Para list o retrive de usuarios
export const fetchUser = createAsyncThunk(FETCH_USER, async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
});

// Para Create de usuarios
export const createUser = createAsyncThunk(CREATE_USER, async (user) => {
  const response = await api.post("/users", {
    email: user.email,
    name: user.name,
    password: user.password,
  });

  return response.data;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: {
      email: "",
      name: "",
    },
    status: "idle",
    error: null,
  },
  reducers: {
    clearUser: (state) => {
      state.currentUser = { email: "", name: "" };
    },
  },
  extraReducers: (builder) => {
    builder
      // Casos de fetchUser
      .addCase(fetchUser.pending, (state) => {
        state.status = ASYNC_STATUS.PENDING;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = ASYNC_STATUS.FULLFILLED;
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = ASYNC_STATUS.REJECTED;
        state.items = action.error.message;
      })
      //   Casos de createUser
      .addCase(createUser.pending, (state) => {
        state.status = ASYNC_STATUS.PENDING;
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = ASYNC_STATUS.FULLFILLED;
        state.currentUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = ASYNC_STATUS.REJECTED;
        state.items = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
