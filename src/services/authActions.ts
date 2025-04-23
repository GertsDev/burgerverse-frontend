// src/services/authActions.ts
// All your Redux Toolkit thunks, now using apiHelpers

import { AUTH_URL, checkResponse, fetchWithRefresh } from '@api/helpers';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { setCookie } from '@utils-cookie';
import {
  TLoginData,
  TRegisterData,
  TUpdateUserData,
  TUser
} from '@utils-types';

// REGISTER
export const registerUser = createAsyncThunk<
  TUser,
  TRegisterData,
  { rejectValue: string }
>('auth/register', async (form, { rejectWithValue }) => {
  try {
    const res = await fetch(`${AUTH_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include' // ← include cookies if any
    });
    const data = await checkResponse<{
      success: boolean;
      user: TUser;
      accessToken: string;
    }>(res);

    if (!data.success) return rejectWithValue('Registration failed');
    // server set refreshToken cookie, JS can store accessToken
    setCookie('accessToken', data.accessToken);
    return data.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// LOGIN
export const login = createAsyncThunk<
  TUser,
  TLoginData,
  { rejectValue: string }
>('auth/login', async (form, { rejectWithValue }) => {
  try {
    const res = await fetch(`${AUTH_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    });
    const data = await checkResponse<{
      success: boolean;
      user: TUser;
      accessToken: string;
    }>(res);

    if (!data.success) return rejectWithValue('Login failed');
    setCookie('accessToken', data.accessToken);
    return data.user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// CHECK AUTH (refresh only)
export const checkUserAuth = createAsyncThunk<
  void,
  void,
  { rejectValue: string }
>('auth/checkUserAuth', async (_, { rejectWithValue }) => {
  try {
    await fetch(`${AUTH_URL}/auth/token`, {
      method: 'POST',
      credentials: 'include'
    });
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// GET USER (protected)
export const getUser = createAsyncThunk<TUser>('auth/getUser', async () => {
  const { user } = await fetchWithRefresh<{
    success: boolean;
    user: TUser;
  }>(`${AUTH_URL}/auth/user`, { method: 'GET' });
  return user;
});

// UPDATE USER (protected)
export const updateUser = createAsyncThunk<
  TUser, // returned by the thunk
  TUpdateUserData, // ← now accepts password too
  { rejectValue: string }
>('auth/updateUser', async (form, { rejectWithValue }) => {
  try {
    // call our fetchWithRefresh helper, which auto‐retries on 401
    const { user } = await fetchWithRefresh<{
      success: boolean;
      user: TUser;
    }>(`${AUTH_URL}/auth/user`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
      credentials: 'include'
    });
    return user;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

// LOGOUT
export const logout = createAsyncThunk('auth/logout', async () => {
  await fetchWithRefresh(`${AUTH_URL}/auth/logout`, {
    method: 'POST'
  });
  // clear JS‑readable cookie
  setCookie('accessToken', '', { maxAge: 0 });
});
