import {
  getIngredients,
  ingredientsReducer,
  initialState
} from '@slices/ingredients-slice';
import ingredientsFixture from '../__fixtures__/ingredients.json';

describe('ingredientsReducer', () => {
  it('should return the initial state', () => {
    // Проверяем, что редьюсер возвращает корректное начальное состояние
    const state = ingredientsReducer(undefined, { type: '@@INIT' });
    expect(state).toEqual(initialState);
  });

  it('should handle getIngredients.pending', () => {
    // Проверяем, что состояние обновляется при запросе (pending)
    const action = { type: getIngredients.pending.type };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(true);
    expect(state.error).toBeNull();
  });

  it('should handle getIngredients.fulfilled', () => {
    // Проверяем, что ингредиенты добавляются в стор при успешном запросе
    const action = {
      type: getIngredients.fulfilled.type,
      payload: ingredientsFixture.data
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.ingredients).toEqual(ingredientsFixture.data);
  });

  it('should handle getIngredients.rejected', () => {
    // Проверяем, что ошибка добавляется в стор при неудачном запросе
    const action = {
      type: getIngredients.rejected.type,
      error: { message: 'Failed to fetch ingredients' }
    };
    const state = ingredientsReducer(initialState, action);

    expect(state.loading).toBe(false);
    expect(state.error).toBe('Failed to fetch ingredients');
  });
});
