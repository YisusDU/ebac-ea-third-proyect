import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../api";
import { CREATE_ORDER } from "../../constants/actionTypes";
import { ASYNC_STATUS } from "../../constants/asyncStatus";

export const createOrder = createAsyncThunk(CREATE_ORDER, async (order) => {
  const response = await api.post("/orders", order);
  return response.data;
});

const orderSlice = createSlice({
  namer: "order",
  initialState: {
    items: [],
    totalAmount: 0,
    status: "idle",
    error: null,
  },
  reducers: {
    clearOrder: (state) => {
      (state.items = []), (state.totalAmount = 0);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createOrder.pending, (state) => {
        state.status = ASYNC_STATUS.PENDING;
      })
      .addCase(createOrder.fulfilled, (state, action) => {
        state.status = ASYNC_STATUS.FULLFILLED;
        state.items = action.payload.items;
        state.totalAmount = action.payload.totalAmount;
      })
      .addCase(createOrder.rejected, (state, action) => {
        state.status = ASYNC_STATUS.REJECTED;
        state.error = action.error.message;
      });
  },
});

export const { clearOrder } = orderSlice.actions;
export default orderSlice.reducer;
