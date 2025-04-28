import { TConstructorIngredient } from '@utils-types';
import {
  ConstructorElement,
  MoveButton
} from '@zlden/react-developer-burger-ui-components';
import { FC, memo } from 'react';
import {
  moveIngredient,
  removeIngredient
} from '../../services/slices/constructorSlice';
import { useDispatch } from '../../services/store';
import styles from './burger-constructor-element.module.css';

interface BurgerConstructorElementProps {
  ingredient: TConstructorIngredient;
  index: number;
  totalItems: number;
}

export const BurgerConstructorElement: FC<BurgerConstructorElementProps> = memo(
  ({ ingredient, index, totalItems }) => {
    const dispatch = useDispatch();

    const handleMoveUp = () => {
      if (index <= 0) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index - 1 }));
    };

    const handleMoveDown = () => {
      if (index >= totalItems - 1) return;
      dispatch(moveIngredient({ fromIndex: index, toIndex: index + 1 }));
    };

    const handleClose = () => {
      dispatch(removeIngredient(ingredient.id));
    };

    return (
      <li
        className={`${styles.element} mb-4 mr-2`}
        data-cy={`constructor-element-${ingredient.id}`}
      >
        <MoveButton
          handleMoveDown={handleMoveDown}
          handleMoveUp={handleMoveUp}
          isUpDisabled={index === 0}
          isDownDisabled={index === totalItems - 1}
        />
        <div className={`${styles.element_fullwidth} ml-2`}>
          <ConstructorElement
            text={ingredient.name}
            price={ingredient.price}
            thumbnail={ingredient.image}
            handleClose={handleClose}
          />
        </div>
      </li>
    );
  }
);
