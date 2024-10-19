import { getIngredientsApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TIngredient } from '@utils-types';

interface IngredientsState {
  buns: TIngredient[];
  mains: TIngredient[];
  sauces: TIngredient[];
  loading: boolean;
  error: string | null;
}

const initialState: IngredientsState = {
  buns: [],
  mains: [],
  sauces: [],
  loading: false,
  error: null
};

export const fetchIngredients = createAsyncThunk<TIngredient[]>(
  'ingredients/fetchIngredients',
  async () => {
    const response = await getIngredientsApi();
    return response;
  }
);

const ingredientsSlice = createSlice({
  name: 'ingredients',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchIngredients.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchIngredients.fulfilled, (state, action) => {
        state.loading = false;
        console.log('success');
        const ingredients = action.payload; // Adjust based on your API response structure
        state.buns = ingredients.filter(
          (item: TIngredient) => item.type === 'bun'
        );
        state.mains = ingredients.filter(
          (item: TIngredient) => item.type === 'main'
        );
        state.sauces = ingredients.filter(
          (item: TIngredient) => item.type === 'sauce'
        );
      })
      .addCase(fetchIngredients.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch ingredients';
        console.log(state.error);
      });
  }
});

export default ingredientsSlice.reducer;
