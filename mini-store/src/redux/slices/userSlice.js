import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";

// Para list o retrive de usuarios
const fetchUser = createAsyncThunk("user/fetchUser", async (userId) => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
});

// Para Create de usuarios
const createUser = createAsyncThunk("user/createUser", async (user) => {
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
        state.status = "loading";
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.status = "failed";
        state.items = action.error.message;
      })
      //   Casos de createUser
      .addCase(createUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(createUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.currentUser = action.payload;
      })
      .addCase(createUser.rejected, (state, action) => {
        state.status = "failed";
        state.items = action.error.message;
      });
  },
});

export const { clearUser } = userSlice.actions;
export default userSlice.reducer;
