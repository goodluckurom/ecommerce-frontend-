import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  success: false,
  message: "",
  error: null,
  cart: localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [],
};

export const cartReducer = createReducer(initialState, (builder) => {
  builder
    // add to cart
    .addCase("addToCartRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("addToCartSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.cart = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("addToCartFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    // get cart items
    .addCase("getCartItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getCartItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.cart = action.payload;
    })
    .addCase("getCartItemsFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    // remove item from cart
    .addCase("removeCartItemtRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("removeCartItemtSuccess", (state, action) => {
      state.isLoading = false;
      state.cart = state.cart.filter((item) => item.product !== action.payload);
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("removeCartItemtFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // sync cart
    .addCase("syncCartRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("syncCartSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.cart = action.payload;
      localStorage.setItem("cartItems", JSON.stringify(state.cart));
    })
    .addCase("syncCartFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    // Clear cart
    .addCase("clearCartRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("clearCartSuccess", (state) => {
      state.isLoading = false;
      state.success = true;
      state.cart = [];
      localStorage.removeItem("cartItems");
    })
    .addCase("clearCartFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    });
});
