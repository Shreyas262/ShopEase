import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { Product } from "../../types/product";
import type { WishlistState } from "../../types/wishlist";

const initialState: WishlistState = {
  items: [],
};

const wishlistSlice = createSlice({
  name: "wishlist",

  initialState,

  reducers: {
    setWishlist: (
      state,
      action: PayloadAction<Product[]>
    ) => {
      state.items = action.payload;
    },

    addToWishlist: (
      state,
      action: PayloadAction<Product>
    ) => {
      const existingItem = state.items.find(
        (item) => item.id === action.payload.id
      );

      if (existingItem) {
        return;
      }

      state.items.push(action.payload);
    },

    removeFromWishlist: (
      state,
      action: PayloadAction<number>
    ) => {
      state.items = state.items.filter(
        (item) => item.id !== action.payload
      );
    },

    clearWishlist: (state) => {
      state.items = [];
    },
  },
});

export default wishlistSlice.reducer;

export const {
  setWishlist,
  addToWishlist,
  removeFromWishlist,
  clearWishlist,
} = wishlistSlice.actions;