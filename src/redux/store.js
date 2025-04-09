import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./reducers/user";
import sellerReducer from "./reducers/seller";
import { productReducer } from "./reducers/product";
import { eventReducer } from "./reducers/event";
import { cartReducer } from "./reducers/cart";
import { wishlistReducer } from "./reducers/wishlist";
import { orderReducer } from "./reducers/order";

const store = configureStore({
  reducer: {
    user: userReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    seller: sellerReducer,
    products: productReducer,
    events: eventReducer,
    orders: orderReducer,
  },
});

export default store;
