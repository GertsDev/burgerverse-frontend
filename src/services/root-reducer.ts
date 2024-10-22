import { combineReducers } from '@reduxjs/toolkit';
import { ingredientsReducer } from './slices/ingredients/ingredients-slice';
import { burgerConstructorReducer } from './slices/burger/burger-slice';
import { orderReducer } from './slices/order/order-slice';

export const rootReducer = combineReducers({
  ingredients: ingredientsReducer,
  burgerConstructor: burgerConstructorReducer,
  order: orderReducer
});
