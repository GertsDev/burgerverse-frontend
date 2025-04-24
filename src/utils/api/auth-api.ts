//-----------------------------------------------------------------------------
// Authentication API: register, login, user info, update, logout, password reset
// -----------------------------------------------------------------------------
import { BGVERSE_URL, checkResponse, fetchWithRefresh, TServerResponse } from '@api-helpers';
import { getCookie } from '@utils-cookie';
import { TRegisterData, TUser } from '@utils-types';

// Types only used in this file
type TLoginData = { email: string; password: string };
type TUserResponse = TServerResponse<{ user: TUser }>;
type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

// Get current user info (requires auth)
export const getUserApi = () =>
  fetchWithRefresh<TUserResponse>(`${BGVERSE_URL}/auth/user`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit
  });

// Update user info (requires auth)
export const updateUserApi = (user: Partial<TRegisterData>) =>
  fetchWithRefresh<TUserResponse>(`${BGVERSE_URL}/auth/user`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(user)
  });

// Register new user
export const registerUserApi = (data: TRegisterData) =>
  fetch(`${BGVERSE_URL}/auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Login user
export const loginUserApi = (data: TLoginData) =>
  fetch(`${BGVERSE_URL}/auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TAuthResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Request password reset email
export const forgotPasswordApi = (data: { email: string }) =>
  fetch(`${BGVERSE_URL}/auth/password-reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Reset password with token
export const resetPasswordApi = (data: { password: string; token: string }) =>
  fetch(`${BGVERSE_URL}/auth/password-reset/reset`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify(data)
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Logout user (invalidate refresh token)
export const logoutApi = () =>
  fetch(`${BGVERSE_URL}/auth/logout`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TServerResponse<{}>>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });
