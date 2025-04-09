import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isSeller: false,
  isLoading: true,
  seller: null,
  error: null,
};

const sellerReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("LoadSellerRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("LoadSellerSuccess", (state, action) => {
      state.isSeller = true;
      state.isLoading = false;
      state.seller = action.payload;
    })
    .addCase("LoadSellerFail", (state, action) => {
      state.isSeller = false;
      state.isLoading = true;
      state.seller = action.payload;
    })
    .addCase("ClearErrors", (state) => {
      state.error = null;
    });
});
export default sellerReducer;
