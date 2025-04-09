import axios from "axios";
import { server } from "../../server";

//load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({
      type: "LoadUserRequest",
    });
    const { data } = await axios.get(`${server}/user/getuser`, {
      withCredentials: true,
    });
    dispatch({
      type: "LoadUserSuccess",
      payload: data.user,
    });
  } catch (error) {
    dispatch({
      type: "LoadUserFail",
      payload: error.response.data.message,
    });
  }
};

//update user details
export const updateUserDetails =
  (name, email, phoneNumber, password) => async (dispatch) => {
    try {
      dispatch({
        type: "updateUserRequest",
      });
      const { data } = await axios.put(
        `${server}/user/update-user-info`,
        {
          name,
          email,
          phoneNumber,
          password,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "updateUserSuccess",
        payload: data.user,
      });
    } catch (error) {
      dispatch({
        type: "updateUserFailed",
        payload: error.response.data.message,
      });
    }
  };

//update user address
export const updateUserAddress = (formData) => async (dispatch) => {
  try {
    dispatch({ type: "updateUserAddressRequest" });

    const { data } = await axios.put(
      `${server}/user/update-user-addresses`,
      { formData },
      { withCredentials: true }
    );

    dispatch({
      type: "updateUserAddressSuccess",
      payload: {
        user: data.user,
        message: data.message,
      },
    });
  } catch (error) {
    dispatch({
      type: "updateUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};

//delete user address
export const deleteUserAddress = (addressId) => async (dispatch) => {
  try {
    dispatch({
      type: "deleteUserAddressRequest",
    });
    const { data } = await axios.delete(
      `${server}/user/delete-user-address/${addressId}`,
      { withCredentials: true }
    );
    dispatch({
      type: "deleteUserAddressSuccess",
      payload: {
        successMessage: data.message,
        user: data.user,
      },
    });
  } catch (error) {
    dispatch({
      type: "deleteUserAddressFailed",
      payload: error.response.data.message,
    });
  }
};
