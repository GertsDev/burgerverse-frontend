import { BurgerConstructorElementUI } from '@ui';
import { FC, memo } from 'react';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructorSlice';
import { useDispatch } from '../../services/store';
import { BurgerConstructorElementProps } from './type';

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      if (index <= 0) return; // Нельзя переместить первый элемент выше
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return; // Нельзя переместить последний элемент ниже
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <BurgerConstructorElementUI
        ingredient={ingredient}
        index={index}
        totalItems={totalItems}
        handleMoveUp={handleMoveUp}
        handleMoveDown={handleMoveDown}
        handleClose={handleClose}
      />
    );
  }
);
