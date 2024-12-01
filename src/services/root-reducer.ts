import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients-slice';
import { burgerConstructorReducer } from './slices/burger-slice';
import { orderReducer } from './slices/order-slice';
import { feedReducer } from './slices/feedsSlice';
import { userReducer } from './slices/userSlice';
import { userOrdersReducer } from './slices/userOrdersSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer,
  userOrders: userOrdersReducer
});
