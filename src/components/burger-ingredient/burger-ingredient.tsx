import { FC, memo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styles from './burger-ingredient.module.css'; // Assuming CSS Module name follows the component

import {
  AddButton,
  Counter,
  CurrencyIcon
} from '@zlden/react-developer-burger-ui-components';

import { TIngredient } from '@utils-types'; // Assuming TIngredient type exists
import { addIngredient } from '../../services/slices/constructorSlice';
import { useDispatch } from '../../services/store';

// Combine props - maybe adjust TBurgerIngredientProps if it existed in the container
interface BurgerIngredientProps {
  ingredient: TIngredient;
  count: number | null; // Assuming count can be null or number
}

export const BurgerIngredient: FC<BurgerIngredientProps> = memo(
  ({ ingredient, count }) => {
    const location = useLocation();
    const dispatch = useDispatch();
    const { image, price, name, _id } = ingredient;

    // Logic integrated directly
    const handleAdd = () => {
      dispatch(addIngredient(ingredient));
    };

    // Location state for modal background integrated directly
    const locationState = { background: location };

    // UI structure from BurgerIngredientUI
    return (
      <li className={styles.container} data-cy={`ingredient-${_id}`}>
        <Link
          className={styles.article}
          to={`/ingredients/${_id}`}
          state={locationState} // Use integrated locationState
        >
          {!!count && <Counter count={count} />}{' '}
          {/* Use !!count for boolean check */}
          <img
            className={styles.img}
            src={image}
            alt={`${name} ingredient`}
          />{' '}
          {/* Better alt text */}
          <div className={`${styles.cost} mt-2 mb-2`}>
            <p className='text text_type_digits-default mr-2'>{price}</p>
            <CurrencyIcon type='primary' />
          </div>
          <p className={`text text_type_main-default ${styles.text}`}>{name}</p>
        </Link>
        <AddButton
          text='Add'
          onClick={handleAdd} // Use integrated handleAdd
          extraClass={`${styles.addButton} mt-8`}
        />
      </li>
    );
  }
);

// Delete src/components/burger-ingredient/burger-ingredientUI.tsx
// Delete src/components/burger-ingredient/type.ts (if it only defined props for the split components)
// Rename src/components/burger-ingredient/burger-ingredientUI.module.css to burger-ingredient.module.css
