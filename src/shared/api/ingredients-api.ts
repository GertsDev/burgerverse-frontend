// -----------------------------------------------------------------------------
// Ingredients API: fetch all available burger ingredients
// -----------------------------------------------------------------------------

import { BGVERSE_URL, checkResponse, TServerResponse } from '@api/helpers';
import { TIngredient } from '@utils-types';

// Type only used in this file
type TIngredientsResponse = TServerResponse<{ data: TIngredient[] }>;

// Get all available ingredients (public)
export const getIngredientsApi = () =>
  fetch(`${BGVERSE_URL}/ingredients`)
    .then((res) => checkResponse<TIngredientsResponse>(res))
    .then((data) => {
      if (data?.success) return data.data;
      return Promise.reject(data);
    });
