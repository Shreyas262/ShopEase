import { isAction, type Middleware } from "@reduxjs/toolkit";

import {
  removeUser,
  saveUser,
  saveCart,
  saveWishlist,
} from "../../utils/localStorage";

import updateStoredUser from "../../utils/updateStoredUser";

const persistenceMiddleware: Middleware =
  (store) => (next) => (action) => {
    const result = next(action);

    if (!isAction(action)) {
      return result;
    }

    const state = store.getState();
    const user = state.auth.user;

    if (/^auth\//.test(action.type)) {
      if (user === null) {
        removeUser();
      } else {
        saveUser(user);
        updateStoredUser(user);
      }
    }

    if (/^cart\//.test(action.type)) {
      if (user !== null) {
        saveCart(
          user.id,
          state.cart.items
        );
      }
    }

    if (/^wishlist\//.test(action.type)) {
      if (user !== null) {
        saveWishlist(
          user.id,
          state.wishlist.items
        );
      }
    }

    return result;
  };

export default persistenceMiddleware;