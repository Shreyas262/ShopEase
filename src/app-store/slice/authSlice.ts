import {
  createSlice,
  type PayloadAction,
} from "@reduxjs/toolkit";

import { loadUser } from "../../utils/localStorage";

import type { User, AuthState } from "../../types/user";

const user = loadUser();

const initialState: AuthState = {
  isAuthenticated: Boolean(user),
  user,
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    login: (
      state,
      action: PayloadAction<User>
    ) => {
      state.isAuthenticated = true;
      state.user = action.payload;
    },

    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },

    updateUser: (
      state,
      action: PayloadAction<Partial<User>>
    ) => {
      if (state.user) {
        state.user = {
          ...state.user,
          ...action.payload,
        };
      }
    },
  },
});

export default authSlice.reducer;

export const {
  login,
  logout,
  updateUser,
} = authSlice.actions;