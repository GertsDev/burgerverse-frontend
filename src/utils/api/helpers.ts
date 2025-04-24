// -----------------------------------------------------------------------------
// Shared API helpers for response checking, token refresh, and fetch with auto-refresh
// -----------------------------------------------------------------------------
import { setCookie } from '@utils-cookie';

// API base URLs
export const BGVERSE_URL = process.env.REACT_APP_BGVERSE_API_URL;

// Generic server response type
export type TServerResponse<T> = {
  success: boolean;
} & T;

// Token refresh response type (local, only used here)
type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

// Checks API response and parses JSON or throws error
export const checkResponse = <T>(res: Response): Promise<T> =>
  res.ok ? res.json() : res.json().then((err) => Promise.reject(err));

// Refreshes JWT tokens using refreshToken from localStorage
export const refreshToken = (): Promise<TRefreshResponse> =>
  fetch(`${BGVERSE_URL}/auth/token`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8'
    },
    body: JSON.stringify({
      token: localStorage.getItem('refreshToken')
    })
  })
    .then((res) => checkResponse<TRefreshResponse>(res))
    .then((refreshData) => {
      if (!refreshData.success) {
        return Promise.reject(refreshData);
      }
      localStorage.setItem('refreshToken', refreshData.refreshToken);
      setCookie('accessToken', refreshData.accessToken);
      return refreshData;
    });

// Fetch wrapper that auto-refreshes JWT if expired
export const fetchWithRefresh = async <T>(
  url: RequestInfo,
  options: RequestInit
) => {
  try {
    const res = await fetch(url, options);
    return await checkResponse<T>(res);
  } catch (err) {
    if ((err as { message: string }).message === 'jwt expired') {
      const refreshData = await refreshToken();
      if (options.headers) {
        (options.headers as { [key: string]: string }).authorization =
          refreshData.accessToken;
      }
      const res = await fetch(url, options);
      return await checkResponse<T>(res);
    } else {
      return Promise.reject(err);
    }
  }
};
