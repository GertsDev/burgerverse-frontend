import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { forgotPasswordApi, resetPasswordApi } from '@api';
import { RootState } from '../store';

// Интерфейс для состояния сброса пароля
interface PasswordState {
  resetSuccess: boolean;
  forgotPasswordSuccess: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: PasswordState = {
  resetSuccess: false,
  forgotPasswordSuccess: false,
  loading: false,
  error: null
};

// Асинхронное действие для сброса пароля
export const resetPassword = createAsyncThunk<
  void,
  { password: string; token: string },
  { rejectValue: string }
>('password/resetPassword', async (data, { rejectWithValue }) => {
  try {
    await resetPasswordApi(data); // Вызов API сброса пароля
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Асинхронное действие для запроса сброса пароля (например, отправка email)
export const forgotPassword = createAsyncThunk<
  void,
  string, // email
  { rejectValue: string }
>('password/forgotPassword', async (email, { rejectWithValue }) => {
  try {
    // Вызов API для отправки запроса на сброс пароля
    await forgotPasswordApi({ email });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Слайс для управления сбросом пароля
const passwordSlice = createSlice({
  name: 'password',
  initialState,
  reducers: {
    clearPasswordState: (state) => {
      state.resetSuccess = false;
      state.forgotPasswordSuccess = false;
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Сброс пароля
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.resetSuccess = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при сбросе пароля';
      })
      // Забыли пароль
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state) => {
        state.loading = false;
        state.forgotPasswordSuccess = true;
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при запросе сброса пароля';
      });
  }
});

export const { reducer: passwordReducer } = passwordSlice;
export const { clearPasswordState } = passwordSlice.actions;
export const getPasswordState = (state: RootState): PasswordState =>
  state.password;
