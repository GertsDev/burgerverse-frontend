import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit';
import { TConstructorIngredient, TIngredient } from '@utils-types';
import { RootState } from 'src/services/store';

interface burgerConstructorState {
  bun: null | TConstructorIngredient;
  ingredients: TConstructorIngredient[];
}

interface MoveIngredientPayload {
  fromIndex: number;
  toIndex: number;
}

const initialState: burgerConstructorState = {
  bun: null,
  ingredients: []
};

export const burgerConstructorSlice = createSlice({
  name: 'burgerConstructor',
  initialState,
  reducers: {
    addIngredient: {
      prepare: (ingredient: TIngredient) => {
        // Check if the ingredient already has an ID, if not, assign one
        const id = ingredient.hasOwnProperty('id')
          ? (ingredient as TConstructorIngredient).id
          : nanoid();
        return { payload: { ...ingredient, id } as TConstructorIngredient };
      },
      reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
        if (action.payload.type !== 'bun') {
          state.ingredients.push(action.payload);
        } else {
          state.bun = action.payload;
        }
      }
    },
    removeIngredient: (state, action: PayloadAction<string>) => {
      // Added PayloadAction typing for clarity
      state.ingredients = state.ingredients.filter(
        (item) => item.id !== action.payload
      );
    },
    moveIngredient: (state, action: PayloadAction<MoveIngredientPayload>) => {
      const { fromIndex, toIndex } = action.payload;
      const ingredients = state.ingredients;

      // Проверяем допустимость индексов
      if (
        fromIndex < 0 ||
        toIndex < 0 ||
        fromIndex >= ingredients.length ||
        toIndex >= ingredients.length
      ) {
        return;
      }

      // Извлекаем перемещаемый элемент
      const [movedItem] = ingredients.splice(fromIndex, 1);

      // Вставляем элемент на новую позицию
      ingredients.splice(toIndex, 0, movedItem);
    },
    clearConstructor: (state) => {
      state.bun = null;
      state.ingredients = [];
    }
  }
});

export const { reducer: burgerConstructorReducer } = burgerConstructorSlice;
export const getBurgerState = (state: RootState): burgerConstructorState =>
  state.burgerConstructor;

export const {
  addIngredient,
  removeIngredient,
  moveIngredient,
  clearConstructor
} = burgerConstructorSlice.actions;
function uuidv4(): string {
  throw new Error('Function not implemented.');
}
