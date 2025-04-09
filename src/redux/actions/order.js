import axios from "axios";
import { server } from "../../server";

//create order action
export const createOrder = (orderData) => async (dispatch) => {
  try {
    dispatch({
      type: "createOrderRequest",
    });
    const response = await axios.post(
      `${server}/order/create-order`,
      { orderData },
      { withCredentials: true }
    );

    dispatch({
      type: "createOrderSuccess",
      payload: response.data.orders,
    });
  } catch (error) {
    dispatch({
      type: "createOrderFail",
      payload: error.response.data.message,
    });
  }
};

//get all orders for a user
export const getUserOrders = (userId) => async (dispatch) => {
  try {
    dispatch({
      type: "getUserOrdersRequest",
    });

    const response = await axios.get(
      `${server}/order/get-all-orders/${userId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getUserOrdersSuccess",
      payload: response.data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getUserOrdersFail",
      payload: error.response.data.message,
    });
  }
};

export const getAllShopOrders = (sellerId) => async (dispatch) => {
  try {
    dispatch({ type: "getAllShopOrdersRequest" });
    const { data } = await axios.get(
      `${server}/order/get-all-shop-orders/${sellerId}`,
      {
        withCredentials: true,
      }
    );

    dispatch({
      type: "getAllShopOrdersSuccess",
      payload: data.orders,
    });
  } catch (error) {
    dispatch({
      type: "getAllOrdersShopFail",
      payload: error.response.data.message,
    });
  }
};

//clear all errors
export const clearErrors = () => (dispatch) => {
  dispatch({ type: "clearErrors" });
};
