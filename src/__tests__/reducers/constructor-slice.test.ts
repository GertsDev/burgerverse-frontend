import {
  addIngredient,
  removeIngredient,
  moveIngredient,
  burgerConstructorReducer,
  burgerConstructorInitialState
} from '../../utils/jest-utils';

import ingredientsFixture from '../__fixtures__/ingredients.json';

describe('burgerConstructorReducer', () => {
  it('should handle addIngredient action', () => {
    // Берем ингредиент из фикстуры
    const ingredient = ingredientsFixture.data.find(
      (item) => item.type === 'main'
    );

    if (!ingredient) {
      throw new Error('Ingredient not found');
    }

    // Добавляем ингредиент в редьюсер
    const newState = burgerConstructorReducer(
      burgerConstructorInitialState,
      addIngredient(ingredient)
    );

    // Проверяем, что ингредиент добавлен (сравниваем без сгенерированного ID)
    expect(newState.ingredients).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: ingredient._id,
          name: ingredient.name,
          type: ingredient.type
        })
      ])
    );
  });

  it('should handle removeIngredient action', () => {
    const ingredient = ingredientsFixture.data.find(
      (item) => item.type === 'main'
    );

    if (!ingredient) {
      throw new Error('Ingredient not found');
    }

    // Создаем начальное состояние с тестовым ингредиентом
    const initialState = {
      ...burgerConstructorInitialState,
      ingredients: [{ ...ingredient, id: 'test-id' }]
    };

    // Удаляем ингредиент по ID
    const newState = burgerConstructorReducer(
      initialState,
      removeIngredient('test-id')
    );

    // Проверяем, что ингредиент удален
    expect(newState.ingredients).toHaveLength(0);
  });

  it('should handle moveIngredient action', () => {
    // Дополняем объекты из фикстуры
    const ingredient1 = { ...ingredientsFixture.data[0], id: '1' };
    const ingredient2 = { ...ingredientsFixture.data[1], id: '2' };

    // Создаем начальное состояние
    const initialState = {
      ...burgerConstructorInitialState,
      ingredients: [ingredient1, ingredient2]
    };

    // Меняем местами ингредиенты
    const newState = burgerConstructorReducer(
      initialState,
      moveIngredient({ fromIndex: 0, toIndex: 1 })
    );

    // Проверяем, что ингредиенты поменяли местами
    expect(newState.ingredients[0].id).toBe('2');
    expect(newState.ingredients[1].id).toBe('1');
  });
});
