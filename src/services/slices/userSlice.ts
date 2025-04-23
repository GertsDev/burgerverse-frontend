// Add rejected handler for checkUserAuth so isAuthChecked always flips.
import { createSlice } from '@reduxjs/toolkit';
import { TUser } from '@utils-types';
import { checkUserAuth } from '../authActions';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

export const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loading: false,
  error: null
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {},
  extraReducers: (b) => {
    b
      // … register/login/logout/get/update handlers …

      // CHECK AUTH
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      })
      .addCase(checkUserAuth.rejected, (state) => {
        state.loading = false;
        state.isAuthChecked = true; // ← ensure we leave the "spinner" state
        state.isAuthenticated = false; // ← we know we're not logged in
      });
  }
});

export const userReducer = authSlice.reducer;
export const getUserState = (state: any) => state.user;
