import { createReducer } from "@reduxjs/toolkit";

const initialOrderState = {
  isLoading: false,
  orders: [],
  error: null,
  success: false,
  message: "",
};

export const orderReducer = createReducer(initialOrderState, (builder) => {
  builder
    .addCase("createOrderRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("createOrderSuccess", (state, action) => {
      state.isLoading = false;
      state.orders.push(action.payload);
      state.success = true;
    })
    .addCase("createOrderFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    .addCase("getUserOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getUserOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getUserOrdersFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("getAllShopOrdersRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopOrdersSuccess", (state, action) => {
      state.isLoading = false;
      state.orders = action.payload;
    })
    .addCase("getAllOrdersShopFail", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
