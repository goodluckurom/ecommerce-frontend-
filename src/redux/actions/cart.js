import axios from "axios";
import { server } from "../../server";

// Add to cart
export const addToCart =
  (productId, quantity, isAuthenticated) => async (dispatch) => {
    try {
      dispatch({
        type: "addToCartRequest",
      });
      if (isAuthenticated) {
        const { data } = await axios.post(
          `${server}/cart/add-to-cart`,
          {
            productId,
            quantity,
          },
          { withCredentials: true }
        );
        dispatch({
          type: "addToCartSuccess",
          payload: data.cart,
        });
      } else {
        let cartItems = localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [];
        const itemIndex = cartItems.findIndex(
          (item) => item.product === productId
        );

        if (itemIndex > -1) {
          cartItems[itemIndex].quantity = quantity;
        } else {
          cartItems.push({ product: productId, quantity });
        }
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch({
          type: "addToCartSuccess",
          payload: cartItems,
        });
      }
    } catch (error) {
      dispatch({
        type: "addToCartFailed",
        payload: error.response.data.message,
      });
    }
  };

// Get cart
export const getCartProducts = (isAuthenticated) => async (dispatch) => {
  try {
    dispatch({ type: "getCartItemsRequest" });

    if (isAuthenticated) {
      const { data } = await axios.get(`${server}/cart/get-cart-items`, {
        withCredentials: true,
      });
      dispatch({ type: "getCartItemsSuccess", payload: data.cart });
    } else {
      let cartItems = localStorage.getItem("cartItems")
        ? JSON.parse(localStorage.getItem("cartItems"))
        : [];

      // Extract product IDs
      const productIds = cartItems.map(
        (item) => item.product._id || item.product
      );

      // Make the request to get product details
      const { data } = await axios.post(
        `${server}/cart/get-cart-product-details`,
        { productIds }
      );
      // Merge product details with local cart items
      const cartWithDetails = cartItems.map((item) => {
        const productDetail = data.products.find(
          (p) => p._id === (item.product._id || item.product)
        );
        return { ...item, product: productDetail };
      });

      dispatch({
        type: "getCartItemsSuccess",
        payload: cartWithDetails,
      });

      // Update local storage with only product IDs and quantities
      const updatedcartItems = cartWithDetails.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));
      // Update local storage
      localStorage.setItem("cartItems", JSON.stringify(updatedcartItems));
    }
  } catch (error) {
    dispatch({
      type: "getCartItemsFailed",
      payload: error.response.data.message,
    });
  }
};

// Remove from cart
export const removeFromCart =
  (productId, isAuthenticated) => async (dispatch) => {
    try {
      dispatch({
        type: "removeCartItemRequest",
      });
      if (isAuthenticated) {
        await axios.post(
          `${server}/cart/remove-cart-item`,
          { productId },
          { withCredentials: true }
        );
        dispatch(getCartProducts(isAuthenticated)); // Fetch the updated cart
        dispatch({
          type: "removeCartItemSuccess",
          payload: productId,
        });
      } else {
        let cartItems = localStorage.getItem("cartItems")
          ? JSON.parse(localStorage.getItem("cartItems"))
          : [];
        cartItems = cartItems.filter((item) => item.product !== productId);
        localStorage.setItem("cartItems", JSON.stringify(cartItems));
        dispatch(getCartProducts(isAuthenticated)); // Fetch the updated cart
        dispatch({
          type: "removeCartItemSuccess",
          payload: productId,
        });
      }
    } catch (error) {
      dispatch({
        type: "removeCartItemFailed",
        payload: error.response.data.message,
      });
    }
  };

// Clear cart
export const clearCart = (isAuthenticated) => async (dispatch) => {
  try {
    dispatch({ type: "clearCartRequest" });

    if (isAuthenticated) {
      await axios.post(
        `${server}/cart/clear-cart`,
        {},
        { withCredentials: true }
      );
    }

    dispatch({ type: "clearCartSuccess" });
  } catch (error) {
    dispatch({
      type: "clearCartFailed",
      payload: error.response.data.message,
    });
  }
};

// Sync cart
export const syncCart = (isAuthenticated) => async (dispatch) => {
  const cartItems = localStorage.getItem("cartItems")
    ? JSON.parse(localStorage.getItem("cartItems"))
    : [];

  try {
    dispatch({
      type: "syncCartRequest",
    });
    if (isAuthenticated) {
      const { data } = await axios.post(
        `${server}/cart/sync-cart-items`,
        {
          cartItems,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "syncCartSuccess",
        payload: data.cart,
      });
    } else {
      dispatch({
        type: "syncCartSuccess",
        payload: cartItems,
      });
    }
  } catch (error) {
    dispatch({
      type: "syncCartFailed",
      payload: error.response.data.message,
    });
  }
};
