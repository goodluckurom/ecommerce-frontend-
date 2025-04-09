import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  isSuccess: false,
  message: "",
  error: null,
  wishlist: localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [],
};

export const wishlistReducer = createReducer(initialState, (builder) => {
  builder
    // add to wishlist
    .addCase("addToWishlistRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("addToWishlistSuccess", (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.wishlist = action.payload;
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })
    .addCase("addToWishlistFailed", (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    })
    // get wishlist items
    .addCase("getWishlistItemsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getWishlistItemsSuccess", (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.wishlist = action.payload;
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })
    .addCase("getWishlistItemsFailed", (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    })
    // remove item from wishlist
    .addCase("removeWishlistItemtRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("removeWishlistItemtSuccess", (state, action) => {
      state.isLoading = false;
      state.wishlist = state.wishlist.filter(
        (item) => item.product._id !== action.payload
      );
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })
    .addCase("removeWishlistItemtFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    // sync wishlist
    .addCase("syncWishlistRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("syncWishlistSuccess", (state, action) => {
      state.isLoading = false;
      state.isSuccess = true;
      state.wishlist = action.payload;
      localStorage.setItem("wishlistItems", JSON.stringify(state.wishlist));
    })
    .addCase("syncWishlistFailed", (state, action) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.error = action.payload;
    });
});
