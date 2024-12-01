import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  login,
  logout,
  getUser,
  registerUser,
  checkUserAuth,
  updateUser
} from '../authActions';
import { TUser } from '@utils-types';
import { RootState } from '../store';

type TAuthState = {
  user: TUser | null;
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  loading: boolean;
  error: string | null;
};

const initialState: TAuthState = {
  user: null,
  isAuthChecked: false,
  isAuthenticated: false,
  loading: false,
  error: null
};

export const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TUser | null>) => {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    setIsAuthChecked: (state, action: PayloadAction<boolean>) => {
      state.isAuthChecked = action.payload;
    }
  },
  extraReducers: (builder) => {
    builder
      // Регистрация
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.error = action.error.message || 'Ошибка при регистрации';
        state.loading = false;
      })

      // Логин
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.isAuthChecked = true;
        state.loading = false;
      })
      .addCase(login.rejected, (state, action) => {
        // Приводим action.payload к строке, так как rejectWithValue возвращает строку
        state.error = (action.payload as string) || 'Ошибка при логине';
        state.loading = false;
      })

      // Логаут
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
        state.isAuthChecked = true;
      })

      // Получение пользователя
      .addCase(getUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isAuthenticated = true;
        state.loading = false;
      })
      .addCase(getUser.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка при получении данных пользователя';
        state.isAuthenticated = false;
        state.loading = false;
      })
      // Обновление пользователя
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.user = action.payload;
        state.loading = false;
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.error =
          action.error.message || 'Ошибка при обновлении данных пользователя';
        state.loading = false;
      })

      // Проверка токена (checkUserAuth)
      .addCase(checkUserAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkUserAuth.fulfilled, (state) => {
        state.loading = false;
        state.isAuthChecked = true;
      });
  }
});

export const { setUser, setIsAuthChecked } = authSlice.actions;
export const userReducer = authSlice.reducer;
export const getUserState = (state: RootState) => state.user;
