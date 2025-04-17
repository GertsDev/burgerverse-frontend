# Order Flow Feature: In-Progress → Ready → Completed

## 1. Overview

This document describes how to implement a new order flow for BurgerVerse, where orders move through three states: **In Progress**, **Ready**, and **Completed**. The flow is managed via backend state transitions, Redux slices, polling, and UI updates.

---

## 2. Backend Changes (TypeScript)

### 2.1. Interfaces and Models (TypeScript)

Create a shared interface for orders:

**`src/models/types/order.types.ts`**

```ts
export interface IOrderBase {
  name: string;
  ingredients: string[];
  number: number;
  createdAt: Date;
}

export interface IInProgressOrder extends IOrderBase {}
export interface IReadyOrder extends IOrderBase {}
```

Create Mongoose models for in-progress and ready orders:

**`src/models/InProgressOrder.ts`**

```ts
import { Schema, model, Document } from 'mongoose';
import { IInProgressOrder } from './types/order.types';

const InProgressOrderSchema = new Schema<IInProgressOrder & Document>({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  number: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const InProgressOrder = model<IInProgressOrder & Document>(
  'InProgressOrder',
  InProgressOrderSchema
);
```

**`src/models/ReadyOrder.ts`**

```ts
import { Schema, model, Document } from 'mongoose';
import { IReadyOrder } from './types/order.types';

const ReadyOrderSchema = new Schema<IReadyOrder & Document>({
  name: { type: String, required: true },
  ingredients: [{ type: String, required: true }],
  number: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now }
});

export const ReadyOrder = model<IReadyOrder & Document>(
  'ReadyOrder',
  ReadyOrderSchema
);
```

### 2.2. API Routes (TypeScript)

**`src/routes/orders.ts`**

```ts
import { Router } from 'express';
import { InProgressOrder } from '../models/InProgressOrder';
import { ReadyOrder } from '../models/ReadyOrder';
import { Order } from '../models/Order';

const router = Router();

// POST /api/in-progress
router.post('/in-progress', async (req, res) => {
  const { name, ingredients, number } = req.body;
  const order = await InProgressOrder.create({ name, ingredients, number });
  res.json({ success: true, order });
});

// GET /api/in-progress
router.get('/in-progress', async (req, res) => {
  const orders = await InProgressOrder.find().sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

// GET /api/ready
router.get('/ready', async (req, res) => {
  const orders = await ReadyOrder.find().sort({ createdAt: -1 });
  res.json({ success: true, orders });
});

export default router;
```

### 2.3. Background Job for State Transitions (TypeScript)

**(e.g., in `src/index.ts` or a background worker)**

```ts
import { InProgressOrder } from './models/InProgressOrder';
import { ReadyOrder } from './models/ReadyOrder';
import { Order } from './models/Order';

setInterval(async () => {
  const now = new Date();
  // Move in-progress → ready after 30s
  const inProgressOrders = await InProgressOrder.find();
  for (const order of inProgressOrders) {
    if (now.getTime() - order.createdAt.getTime() > 30000) {
      await ReadyOrder.create(order.toObject());
      await InProgressOrder.deleteOne({ _id: order._id });
    }
  }
  // Move ready → completed after 1min
  const readyOrders = await ReadyOrder.find();
  for (const order of readyOrders) {
    if (now.getTime() - order.createdAt.getTime() > 60000) {
      await Order.create(order.toObject());
      await ReadyOrder.deleteOne({ _id: order._id });
    }
  }
}, 5000);
```

---

## 3. DAL (API Helpers)

Add to `src/utils/api/orders-api.ts`:

```ts
// Get all in-progress orders
export const getInProgressOrdersApi = () =>
  fetch(`${BGVERSE_URL}/in-progress`).then((res) =>
    checkResponse<TFeedsResponse>(res)
  );

// Get all ready orders
export const getReadyOrdersApi = () =>
  fetch(`${BGVERSE_URL}/ready`).then((res) =>
    checkResponse<TFeedsResponse>(res)
  );

// Post a new in-progress order
export const postInProgressOrderApi = (order: {
  name: string;
  ingredients: string[];
  number: number;
}) =>
  fetchWithRefresh<TNewOrderResponse>(`${BGVERSE_URL}/in-progress`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json;charset=utf-8',
      authorization: getCookie('accessToken')
    } as HeadersInit,
    body: JSON.stringify(order)
  }).then((data) => {
    if (data?.success) return data;
    return Promise.reject(data);
  });
```

---

## 4. Redux (BLL)

### 4.1. Slices

Create two new slices in `src/services/slices/`:

#### `inProgressOrdersSlice.ts`

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  getInProgressOrdersApi,
  postInProgressOrderApi
} from '@api/orders-api';
import { TOrder } from '@utils-types';
import { RootState } from '@redux-store';

interface InProgressOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: InProgressOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchInProgressOrders = createAsyncThunk<TOrder[]>(
  'inProgressOrders/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getInProgressOrdersApi();
      return data.orders;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

export const addInProgressOrder = createAsyncThunk<
  TOrder,
  { name: string; ingredients: string[]; number: number }
>('inProgressOrders/add', async (order, { rejectWithValue }) => {
  try {
    const data = await postInProgressOrderApi(order);
    return data.order;
  } catch (err: any) {
    return rejectWithValue(err.message);
  }
});

const inProgressOrdersSlice = createSlice({
  name: 'inProgressOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchInProgressOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchInProgressOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchInProgressOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(addInProgressOrder.fulfilled, (state, action) => {
        state.orders.unshift(action.payload);
      });
  }
});

export const { reducer: inProgressOrdersReducer } = inProgressOrdersSlice;
export const getInProgressOrdersState = (state: RootState) =>
  state.inProgressOrders;
```

#### `readyOrdersSlice.ts`

```ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { getReadyOrdersApi } from '@api/orders-api';
import { TOrder } from '@utils-types';
import { RootState } from '@redux-store';

interface ReadyOrdersState {
  orders: TOrder[];
  loading: boolean;
  error: string | null;
}

const initialState: ReadyOrdersState = {
  orders: [],
  loading: false,
  error: null
};

export const fetchReadyOrders = createAsyncThunk<TOrder[]>(
  'readyOrders/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const data = await getReadyOrdersApi();
      return data.orders;
    } catch (err: any) {
      return rejectWithValue(err.message);
    }
  }
);

const readyOrdersSlice = createSlice({
  name: 'readyOrders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchReadyOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchReadyOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchReadyOrders.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }
});

export const { reducer: readyOrdersReducer } = readyOrdersSlice;
export const getReadyOrdersState = (state: RootState) => state.readyOrders;
```

### 4.2. Add Reducers to Root Reducer

```ts
// src/services/root-reducer.ts
import { inProgressOrdersReducer } from '@slices/inProgressOrdersSlice';
import { readyOrdersReducer } from '@slices/readyOrdersSlice';

export const rootReducer = combineReducers({
  // ...existing reducers
  inProgressOrders: inProgressOrdersReducer,
  readyOrders: readyOrdersReducer
});
```

---

## 5. Polling Hook

```ts
// src/hooks/useOrdersPolling.ts
import { useEffect } from 'react';
import { useDispatch } from '@redux-store';
import { fetchInProgressOrders } from '@slices/inProgressOrdersSlice';
import { fetchReadyOrders } from '@slices/readyOrdersSlice';
import { fetchFeedOrders } from '@slices/feedsSlice';

export const useOrdersPolling = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(fetchInProgressOrders());
      dispatch(fetchReadyOrders());
      dispatch(fetchFeedOrders());
    }, 5000);
    return () => clearInterval(interval);
  }, [dispatch]);
};
```

---

## 6. UI Changes

### 6.1. FeedInfo Component

- Use selectors for in-progress, ready, and completed orders.
- Render three columns: In Progress, Ready, Completed.

```tsx
// src/components/ui/feed-info/feed-info.tsx
import { useSelector } from '@redux-store';
import { getInProgressOrdersState } from '@slices/inProgressOrdersSlice';
import { getReadyOrdersState } from '@slices/readyOrdersSlice';
import { getFeedState } from '@slices/feedsSlice';

export const FeedInfoUI: FC = () => {
  const { orders: inProgress } = useSelector(getInProgressOrdersState);
  const { orders: ready } = useSelector(getReadyOrdersState);
  const { orders: completed, total, totalToday } = useSelector(getFeedState);

  return (
    <section>
      <div className={styles.columns}>
        <HalfColumn
          orders={inProgress.map((o) => o.number)}
          title={'In Progress'}
        />
        <HalfColumn
          orders={ready.map((o) => o.number)}
          title={'Ready for Launch'}
          textColor={'blue'}
        />
        <HalfColumn
          orders={completed.map((o) => o.number)}
          title={'Completed'}
          textColor={'green'}
        />
      </div>
      <Column title={'Total Orders Completed'} content={total} />
      <Column title={'Orders Completed Today'} content={totalToday} />
    </section>
  );
};
```

### 6.2. Constructor Page

- On order submit, dispatch `addInProgressOrder` instead of the old order thunk.

```tsx
// src/pages/constructor-page/constructor-page.tsx
import { useDispatch, useSelector } from '@redux-store';
import { addInProgressOrder } from '@slices/inProgressOrdersSlice';
import { getBurgerState } from '@slices/constructorSlice';

const dispatch = useDispatch();
const { bun, ingredients } = useSelector(getBurgerState);

const handleOrderSubmit = () => {
  if (!bun) return;
  const ingredientIds = [bun._id, ...ingredients.map((i) => i._id), bun._id];
  dispatch(
    addInProgressOrder({
      name: 'Space Burger',
      ingredients: ingredientIds,
      number: Date.now()
    })
  );
};
```

---

## 7. Summary Checklist

- [ ] Backend: TypeScript interfaces, models, routes, background job
- [ ] DAL: API helpers for new endpoints
- [ ] Redux: Slices, thunks, selectors, root reducer
- [ ] Polling: useOrdersPolling hook
- [ ] UI: FeedInfo and ConstructorPage integration

---

**This plan and code examples provide a full roadmap for implementing the new order flow in a TypeScript backend and frontend. Adjust naming and details as needed for your codebase.**
