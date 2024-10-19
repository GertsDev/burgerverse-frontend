import { combineReducers } from '@reduxjs/toolkit';
import ingredientsReducer from '../features/ingredients/ingredients-slice';

const rootReducer = combineReducers({
  ingredients: ingredientsReducer
});

export default rootReducer;
