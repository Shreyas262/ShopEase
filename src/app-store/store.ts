import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./slice/cartSlice";
import wishlistReducer from "./slice/wishlistSlice";
import authReducer from "./slice/authSlice";
import shopApi from "./shopApi"

import persistenceMiddleware from "./middleware/persistenceMiddleware";

import {
  loadCart,
  loadUser,
  loadWishlist,
} from "../utils/localStorage";
import { setupListeners } from "@reduxjs/toolkit/query";

const user = loadUser();

const cartItems = user
  ? loadCart(user.id)
  : [];

const wishlistItems = user
  ? loadWishlist(user.id)
  : [];

const store = configureStore({
  reducer: {
    auth: authReducer,
    cart: cartReducer,
    wishlist: wishlistReducer,
    [shopApi.reducerPath]: shopApi.reducer, 
  },

  middleware: (getDefaultMiddleware) => (
    getDefaultMiddleware()
    .concat(shopApi.middleware, persistenceMiddleware)
  ),

  preloadedState: {
    auth: {
      isAuthenticated: Boolean(user),
      user,
    },

    cart: {
      items: cartItems,
    },

    wishlist: {
      items: wishlistItems,
    },
  },
});

setupListeners(store.dispatch);

export type RootState =
  ReturnType<typeof store.getState>;

export type AppDispatch =
  typeof store.dispatch;

export default store;