import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  TRegisterData,
  TLoginData,
  registerUserApi,
  loginUserApi,
  getUserApi,
  logoutApi,
  refreshToken,
  fetchWithRefresh
} from '@api';
import { TUser } from '@utils-types';
import { deleteCookie, getCookie, setCookie } from '../../utils/cookie';
import { RootState } from '../store';

interface UserState {
  user: TUser | null;
  isAuthenticated: boolean;
  isAuthChecked: boolean;
  loading: boolean;
  error: string | null;
}

const initialState: UserState = {
  user: null,
  isAuthenticated: false,
  isAuthChecked: false,
  loading: false,
  error: null
};

// Асинхронное действие для регистрации пользователя
export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('user/register', async (userData, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(userData);
    // Сохраняем токены
    setCookie('accessToken', response.accessToken); // Сохраняем accessToken
    localStorage.setItem('refreshToken', response.refreshToken); // Сохраняем refreshToken
    return response.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// Асинхронное действие для логина пользователя
export const loginUser = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('user/login', async (loginData, { rejectWithValue }) => {
  try {
    const response = await loginUserApi(loginData);
    // Сохраняем токены
    setCookie('accessToken', response.accessToken); // Сохраняем accessToken
    localStorage.setItem('refreshToken', response.refreshToken); // Сохраняем refreshToken
    return response.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

export const fetchUser = createAsyncThunk<TUser, void, { rejectValue: string }>(
  'user/fetchUser',
  async (_, { rejectWithValue }) => {
    try {
      const accessToken = getCookie('accessToken'); // Проверяем, есть ли токен
      console.log('accessToken:', accessToken); // Логирование accessToken

      if (!accessToken) {
        console.error('Access token is missing');
        throw new Error('Access token is missing');
      }

      // Объявляем заголовки корректно внутри запроса
      const headers: HeadersInit = {
        'Content-Type': 'application/json',
        authorization: `Bearer ${accessToken}`
      };

      const response = await fetchWithRefresh<TUser>('/api/auth/user', {
        method: 'GET',
        headers // Используем переменную заголовков
      });

      console.log('API response:', response); // Логирование ответа API
      return response;
    } catch (err: any) {
      console.error('Ошибка при получении пользователя:', err);
      return rejectWithValue(err.message);
    }
  }
);
// Асинхронное действие для выхода пользователя
export const logoutUser = createAsyncThunk<void, void, { rejectValue: string }>(
  'user/logout',
  async (_, { rejectWithValue }) => {
    try {
      await logoutApi();
      // Удаляем токены
      deleteCookie('accessToken');
      localStorage.removeItem('refreshToken');
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // Дополнительные редьюсеры, если нужны
  },
  extraReducers: (builder) => {
    builder
      // Регистрация пользователя
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при регистрации';
      })
      // Логин пользователя
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || 'Ошибка при входе';
      })
      // Получение информации о пользователе
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action.payload;
        state.isAuthenticated = true;
      })
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload || 'Ошибка при получении данных пользователя';
      })
      // Выход пользователя
      .addCase(logoutUser.fulfilled, (state) => {
        state.user = null;
        state.isAuthenticated = false;
      });
  }
});

export const { reducer: userReducer } = userSlice;
export const getUserState = (state: RootState): UserState => state.user;
