import axios from "axios";
import { server } from "../../server";

// Add to wishlist
export const addToWishlist =
  (productId, quantity, isAuthenticated) => async (dispatch) => {
    try {
      dispatch({
        type: "addToWishlistRequest",
      });
      if (isAuthenticated) {
        const { data } = await axios.post(
          `${server}/wishlist/add-to-wishlist`,
          {
            productId,
            quantity,
          },
          { withCredentials: true }
        );
        dispatch({
          type: "addToWishlistSuccess",
          payload: data.wishlist,
        });
      } else {
        let wishlistItems = localStorage.getItem("wishlistItems")
          ? JSON.parse(localStorage.getItem("wishlistItems"))
          : [];
        const itemIndex = wishlistItems.findIndex(
          (item) => item.product === productId
        );

        if (itemIndex > -1) {
          wishlistItems[itemIndex].quantity = quantity;
        } else {
          wishlistItems.push({ product: productId, quantity });
        }
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
        dispatch({
          type: "addToWishlistSuccess",
          payload: wishlistItems,
        });
      }
    } catch (error) {
      dispatch({
        type: "addToWishlistFailed",
        payload: error.response.data.message,
      });
    }
  };

// Get wishlist
export const getWishlistProducts = (isAuthenticated) => async (dispatch) => {
  try {
    dispatch({ type: "getWishlistItemsRequest" });

    if (isAuthenticated) {
      const { data } = await axios.get(
        `${server}/wishlist/get-wishlist-items`,
        { withCredentials: true }
      );
      dispatch({ type: "getWishlistItemsSuccess", payload: data.wishlist });
    } else {
      let wishlistItems = localStorage.getItem("wishlistItems")
        ? JSON.parse(localStorage.getItem("wishlistItems"))
        : [];

      // Extract product IDs
      const productIds = wishlistItems.map(
        (item) => item.product._id || item.product
      );

      // Make the request to get product details
      const { data } = await axios.post(
        `${server}/wishlist/get-whislist-product-details`,
        { productIds }
      );

      // Merge product details with local wishlist items
      const wishlistWithDetails = wishlistItems.map((item) => {
        const productDetail = data.products.find(
          (p) => p._id === (item.product._id || item.product)
        );
        return { ...item, product: productDetail };
      });

      // Dispatch the merged wishlist
      dispatch({
        type: "getWishlistItemsSuccess",
        payload: wishlistWithDetails,
      });

      // Update local storage with only product IDs and quantities
      const updatedWishlistItems = wishlistWithDetails.map((item) => ({
        product: item.product._id,
        quantity: item.quantity,
      }));

      // Update local storage
      localStorage.setItem(
        "wishlistItems",
        JSON.stringify(updatedWishlistItems)
      );
    }
  } catch (error) {
    dispatch({
      type: "getWishlistItemsFailed",
      payload: error.response.data.message,
    });
  }
};

// Remove from wishlist
export const removeFromWishlist =
  (productId, isAuthenticated) => async (dispatch) => {
    try {
      dispatch({
        type: "removeWishlistItemtRequest",
      });
      if (isAuthenticated) {
        await axios.post(
          `${server}/wishlist/remove-wishlist-item`,
          { productId },
          { withCredentials: true }
        );
        dispatch({
          type: "removeWishlistItemtSuccess",
          payload: productId,
        });
      } else {
        let wishlistItems = localStorage.getItem("wishlistItems")
          ? JSON.parse(localStorage.getItem("wishlistItems"))
          : [];
        wishlistItems = wishlistItems.filter(
          (item) => item.product !== productId
        );
        localStorage.setItem("wishlistItems", JSON.stringify(wishlistItems));
        dispatch(getWishlistProducts(isAuthenticated));
        dispatch({
          type: "removeWishlistItemtSuccess",
          payload: productId,
        });
      }
    } catch (error) {
      dispatch({
        type: "removeWishlistItemtFailed",
        payload: error.response.data.message,
      });
    }
  };

// Sync wishlist
export const syncwishlist = (isAuthenticated) => async (dispatch) => {
  const wishlistItems = localStorage.getItem("wishlistItems")
    ? JSON.parse(localStorage.getItem("wishlistItems"))
    : [];

  try {
    dispatch({
      type: "syncWishlistRequest",
    });
    if (isAuthenticated) {
      const { data } = await axios.post(
        `${server}/wishlist/sync-wishlist-items`,
        {
          wishlistItems,
        },
        { withCredentials: true }
      );
      dispatch({
        type: "syncWishlistSuccess",
        payload: data.wishlist,
      });
    } else {
      dispatch({
        type: "syncWishlistSuccess",
        payload: wishlistItems,
      });
    }
  } catch (error) {
    dispatch({
      type: "syncWishlistFailed",
      payload: error.response.data.message,
    });
  }
};
