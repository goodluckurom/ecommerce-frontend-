import { createReducer } from "@reduxjs/toolkit";

const initialState = {
  isLoading: true,
  success: false,
  error: null,
  events: null,
};
export const eventReducer = createReducer(initialState, (builder) => {
  builder
    .addCase("createEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("createEventSuccess", (state, action) => {
      state.isLoading = false;
      state.event = action.payload;
      state.success = true;
    })
    .addCase("createEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //get al events of a shop
    .addCase("getAllShopEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllShopEventSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
      state.success = true;
    })
    .addCase("getAllShopEventsFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
      state.success = false;
    })
    //delete event from a shop
    .addCase("deleteEventRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("deleteEventSuccess", (state, action) => {
      state.isLoading = false;
      state.success = true;
      state.message = action.payload;
    })
    .addCase("deleteEventFailed", (state, action) => {
      state.isLoading = false;
      state.success = false;
      state.error = action.payload;
    })
    //get all events
    .addCase("getAllEventsRequest", (state) => {
      state.isLoading = true;
    })
    .addCase("getAllEventsSuccess", (state, action) => {
      state.isLoading = false;
      state.events = action.payload;
    })
    .addCase("getAllEventFailed", (state, action) => {
      state.isLoading = false;
      state.error = action.payload;
    })
    //to clear  all errors
    .addCase("clearErrors", (state) => {
      state.error = null;
    });
});
