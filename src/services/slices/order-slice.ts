import { getOrderByNumberApi, orderBurgerApi } from '@api';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { TConstructorIngredient, TOrder } from '@utils-types';
import { RootState } from 'src/services/store';

interface orderState {
  order: TOrder | null;
  getOrderByNumberResponse: TOrder | null;
  loading: boolean;
  request: boolean;
  error: string | null;
}

export const placeOrder = createAsyncThunk<TOrder, string[]>(
  'order/placeOrder',
  async (ingredientIds, { rejectWithValue }) => {
    try {
      const response = await orderBurgerApi(ingredientIds);
      return response.order;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const getOrderByNumber = createAsyncThunk(
  'order/byNumber',
  async (number: number) => getOrderByNumberApi(number)
);

export const initialState: orderState = {
  order: null,
  getOrderByNumberResponse: null,
  loading: false,
  request: false,
  error: null
};

export const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    clearOrder: (state) => {
      state.order = null;
      state.error = null;
      state.loading = false;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(placeOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(placeOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.order = action.payload;
      })
      .addCase(placeOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
    builder.addCase(getOrderByNumber.pending, (state) => {
      state.error = null;
      state.request = true;
    });
    builder.addCase(getOrderByNumber.rejected, (state, action) => {
      state.error = action.error.message as string;
      state.request = false;
    });
    builder.addCase(getOrderByNumber.fulfilled, (state, action) => {
      state.error = null;
      state.request = false;
      state.getOrderByNumberResponse = action.payload.orders[0];
    });
  }
});

export const { reducer: orderReducer } = orderSlice;
export const getOrderState = (state: RootState): orderState => state.order;

export const { clearOrder } = orderSlice.actions;
