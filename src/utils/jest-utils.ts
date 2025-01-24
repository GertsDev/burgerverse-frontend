export { rootReducer } from '../services/root-reducer';

// INITIAL STATES
export { initialState as ingredientsInitialState } from '../services/slices/ingredients-slice';
export { initialState as burgerConstructorInitialState } from '../services/slices/constructorSlice';
export { initialState as orderInitialState } from '../services/slices/order-slice';
export { initialState as feedInitialState } from '../services/slices/feedsSlice';
export { initialState as userInitialState } from '../services/slices/userSlice';
export { initialState as userOrdersInitialState } from '../services/slices/userOrdersSlice';

// REDUCERS

export { burgerConstructorReducer } from '../services/slices/constructorSlice';
export { ingredientsReducer } from '../services/slices/ingredients-slice';

// ACTIONS [constructor]
export { addIngredient } from '../services/slices/constructorSlice';
export { removeIngredient } from '../services/slices/constructorSlice';
export { moveIngredient } from '../services/slices/constructorSlice';
