import {
  getUserApi,
  loginUserApi,
  logoutApi,
  registerUserApi,
  updateUserApi
} from '@api/auth-api';
import { refreshToken } from '@api/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setIsAuthChecked, setUser } from '@slices/userSlice';
import { getCookie, setCookie } from '@utils-cookie';
import { TRegisterData, TUser } from '@utils-types';

export const login = createAsyncThunk(
  'auth/login',
  async (data: { email: string; password: string }, { rejectWithValue }) => {
    try {
      const response = await loginUserApi(data);
      const accessToken = response.accessToken.replace('Bearer ', '');
      setCookie('accessToken', accessToken);
      localStorage.setItem('refreshToken', response.refreshToken);
      return response.user;
    } catch (err: any) {
      // Проверяем, если сообщение об ошибке пришло с сервера
      if (err.message) {
        return rejectWithValue(err.message); // Передаем сообщение от сервера
      } else {
        return rejectWithValue('Ошибка при логине');
      }
    }
  }
);

// Асинхронное действие для логаута
export const logout = createAsyncThunk('auth/logout', async () => {
  await logoutApi();
  localStorage.removeItem('refreshToken');
  setCookie('accessToken', '', { expires: -1 });
  return null;
});

// Асинхронное действие для получения информации о пользователе
export const getUser = createAsyncThunk(
  'auth/getUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await getUserApi();
      return response.user;
    } catch (err) {
      return rejectWithValue('Ошибка при получении данных пользователя');
    }
  }
);

// Асинхронное действие для обновления информации о пользователе
export const updateUser = createAsyncThunk<
  TUser,
  Partial<TRegisterData>,
  { rejectValue: string }
>('auth/updateUser', async (userData, { rejectWithValue }) => {
  try {
    const response = await updateUserApi(userData);
    return response.user;
  } catch (err) {
    return rejectWithValue('Ошибка при обновлении данных пользователя');
  }
});

// Асинхронное действие для регистрации пользователя
export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('auth/registerUser', async (registerData, { rejectWithValue }) => {
  try {
    const response = await registerUserApi(registerData);
    const accessToken = response.accessToken.replace('Bearer ', '');
    setCookie('accessToken', accessToken);
    localStorage.setItem('refreshToken', response.refreshToken);
    return response.user;
  } catch (err: any) {
    // Check if the error has a message from the server
    if (err.message) {
      return rejectWithValue(err.message);
    }
    return rejectWithValue('Ошибка при регистрации');
  }
});

// Асинхронное действие для проверки токена и обновления токена при необходимости
export const checkUserAuth = createAsyncThunk(
  'auth/checkUserAuth',
  async (_, { dispatch }) => {
    const accessToken = getCookie('accessToken');
    if (accessToken) {
      try {
        const userResponse = await dispatch(getUser()).unwrap();
        dispatch(setUser(userResponse));
      } catch (err) {
        // Если ошибка при получении пользователя (например, токен истек)
        await refreshToken(); // Пробуем обновить токен
        const userResponse = await dispatch(getUser()).unwrap();
        dispatch(setUser(userResponse));
      } finally {
        dispatch(setIsAuthChecked(true));
      }
    } else {
      dispatch(setIsAuthChecked(true));
    }
  }
);
