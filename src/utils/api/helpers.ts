// src/api/apiHelpers.ts
// Central fetch wrapper + token‑rotation that uses HTTP‑only cookie for refresh.

import { setCookie } from '@utils-cookie';

export const AUTH_URL = process.env.REACT_APP_BGVERSE_API_URL!;
export const BGVERSE_URL = process.env.REACT_APP_BURGER_API_URL!;

export type TServerResponse<T> = { success: boolean } & T;

// Check response or throw
export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

// Call /auth/token to rotate tokens (backend sets new refresh cookie)
export const refreshToken = (): Promise<{ accessToken: string }> =>
  fetch(`${AUTH_URL}/auth/token`, {
    method: 'POST',
    credentials: 'include' // ← force sending refresh‑cookie
  })
    .then(checkResponse<{ success: boolean; accessToken: string }>)
    .then((data) => {
      if (!data.success) return Promise.reject(data);
      // store new access token in JS‑readable cookie
      setCookie('accessToken', data.accessToken);
      return { accessToken: data.accessToken };
    });

// fetch wrapper that auto‑retries once on 401
export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit = {}
): Promise<T> => {
  options.credentials = 'include'; // ← always send cookies
  let res = await fetch(url, options);
  try {
    return await checkResponse<T>(res);
  } catch (err: any) {
    // on expired access token, rotate & retry
    if (res.status === 401 || err.message === 'jwt expired') {
      const { accessToken } = await refreshToken();
      options.headers = {
        ...(options.headers || {}),
        Authorization: accessToken // already “Bearer …” from server
      };
      const retry = await fetch(url, options);
      return await checkResponse<T>(retry);
    }
    return Promise.reject(err);
  }
};
