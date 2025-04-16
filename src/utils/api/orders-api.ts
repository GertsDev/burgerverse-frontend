// -----------------------------------------------------------------------------
// Orders API: create order, get order by number, get feeds, get user orders
// -----------------------------------------------------------------------------

import {
  BGVERSE_URL,
  checkResponse,
  fetchWithRefresh,
  TServerResponse
} from '@api-helpers';
import { getCookie } from '@utils-cookie';
import { TOrder } from '@utils-types';

// Types only used in this file
type TOrderResponse = TServerResponse<{ orders: TOrder[] }>;
type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;
type TNewOrderResponse = TServerResponse<{ order: TOrder; name: string }>;

// Create a new burger order (requires auth)
export const orderBurgerApi = (data: string[]) =>
  fetchWithRefresh<TNewOrderResponse>(`${BGVERSE_URL}/orders`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify({
      ingredients: data
    })
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });

// Get order details by order number (public)
export const getOrderByNumberApi = (number: number) =>
  fetch(`${BGVERSE_URL}/orders/${number}`).then((res) =>
    checkResponse<TOrderResponse>(res)
  );

// Get all public order feeds (public)
export const getFeedsApi = () =>
  fetch(`${BGVERSE_URL}/orders/all`)
    .then((res) => checkResponse<TFeedsResponse>(res))
    .then((data) => {
      if (data?.success) return data;
      return Promise.reject(data);
    });

// Get all orders for the current user (requires auth)
export const getOrdersApi = () =>
  fetchWithRefresh<TFeedsResponse>(`${BGVERSE_URL}/orders`, {
    method: 'GET',
    headers: {
      authorization: getCookie('accessToken')
    } as HeadersInit
  }).then((data) => {
    if (data?.success) return data.orders;
    return Promise.reject(data);
  });
