import { combineReducers } from '@reduxjs/toolkit';
import { burgerConstructorReducer } from './slices/constructorSlice';
import { feedReducer } from './slices/feedsSlice';
import { ingredientsReducer } from './slices/ingredients-slice';
import { orderReducer } from './slices/order-slice';
import { userOrdersReducer } from './slices/userOrdersSlice';
import { userReducer } from './slices/userSlice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer,
  feed: feedReducer,
  user: userReducer,
  userOrders: userOrdersReducer
});
