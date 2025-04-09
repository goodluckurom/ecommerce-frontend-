import axios from "axios";
import { server } from "../../server";

//create event action
export const createEvent = (data) => async (dispatch) => {
  try {
    dispatch({
      type: "createEventRequest",
    });
    const response = await axios.post(`${server}/event/create-event`, data);
    dispatch({
      type: "createEventSuccess",
      payload: response.data.event,
    });
    console.log(response);
  } catch (error) {
    dispatch({
      type: "createEventFailed",
      payload: error.response.data.message,
    });
  }
};

//get all events of a shop
export const getAllShopEvents = (shopId) => async (dispatch) => {
  try {
    dispatch({
      type: "getAllShopEventsRequest",
    });
    const { data } = await axios.get(
      `${server}/event/get-all-events/${shopId}`
    );
    dispatch({
      type: "getAllShopEventSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllShopEventsFailed",
      payload: error.response.data.message,
    });
  }
};
//delete event of  a particular shop
export const deleteEvent = (id) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteEventRequest",
    });
    const { data } = axios.delete(`${server}/event/delete-shop-event/${id}`, {
      withCredentials: true,
    });
    dispatch({
      type: "deleteEventSuccess",
      payload: data.message,
    });
  } catch (error) {
    dispatch({
      type: "deleteEventFailed",
      payload: error.response.data.message,
    });
  }
};

//get all events
export const getAllEvents = () => async (dispatch) => {
  try {
    dispatch({
      type: "getAllEventsRequest",
    });
    const allEventsUrl = `${server}/event/get-all-events`;
    const { data } = await axios.get(allEventsUrl);
    dispatch({
      type: "getAllEventsSuccess",
      payload: data.events,
    });
  } catch (error) {
    dispatch({
      type: "getAllEventFailed",
      payload: error.response.data.message,
    });
  }
};
