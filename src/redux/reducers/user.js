import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  loading: false,
  user: null,
  error: null,
  UpdatedSuccess: false,
  updateAddressLoading: false,
  updateAddressSuccess: false,
  UpdateAddressSuccessMessage: "",
  updateAddressError: "",
  deleteAddressLoading: false,
  deleteAddressSuucessMessage: "",
  deleteAddressError: "",
};

const userReducer = createReducer(initialState, (builder) => {
  builder
    //load user on load
    .addCase("LoadUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("LoadUserSuccess", (state, action) => {
      state.isAuthenticated = true;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("LoadUserFail", (state, action) => {
      state.isAuthenticated = false;
      state.loading = false;
      state.user = action.payload;
    })
    .addCase("ClearErrors", (state) => {
      state.error = null;
    })
    //update user information
    .addCase("updateUserRequest", (state) => {
      state.loading = true;
    })
    .addCase("updateUserSuccess", (state, action) => {
      state.loading = false;
      state.user = action.payload;
      state.UpdatedSuccess = true;
    })
    .addCase("updateUserFailed", (state, action) => {
      state.loading = false;
      state.error = action.payload;
    })
    //update user address
    .addCase("updateUserAddressRequest", (state) => {
      state.updateAddressLoading = true;
    })
    .addCase("updateUserAddressSuccess", (state, action) => {
      state.updateAddressLoading = false;
      state.user = action.payload.user;
      state.updateAddressSuccess = true;
      state.UpdateAddressSuccessMessage = action.payload.message;
    })
    .addCase("updateUserAddressFailed", (state, action) => {
      state.updateAddressLoading = false;
      state.updateAddressSuccess = false;
      state.updateAddressError = action.payload;
    })
    //delete user address
    .addCase("deleteUserAddressRequest", (state) => {
      state.deleteAddressLoading = true;
    })
    .addCase("deleteUserAddressSuccess", (state, action) => {
      state.deleteAddressLoading = false;
      state.user = action.payload.user;
      state.deleteAddressSuucessMessage = action.payload.message;
    })
    .addCase("deleteUserAddressFailed", (state, action) => {
      state.deleteAddressLoading = false;
      state.deleteAddressError = action.payload;
    });
});

export default userReducer;
