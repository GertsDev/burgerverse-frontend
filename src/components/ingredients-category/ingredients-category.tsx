import { BurgerIngredient } from '@components';
import { TIngredient } from '@utils-types';
import { forwardRef, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getBurgerState } from '../../services/slices/constructorSlice';
import styles from './ingredients-category.module.css';

interface IngredientsCategoryProps {
  title: string;
  ingredients: TIngredient[];
  titleRef: React.RefObject<HTMLHeadingElement>;
}

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  IngredientsCategoryProps
>(({ title, titleRef, ingredients }, ref) => {
  const constructorState = useSelector(getBurgerState);

  const ingredientsCounters = useMemo(() => {
    const { bun, ingredients: constructorIngredients } = constructorState;
    const counters: { [key: string]: number } = {};
    constructorIngredients.forEach((ingredient: TIngredient) => {
      if (!counters[ingredient._id]) counters[ingredient._id] = 0;
      counters[ingredient._id]++;
    });
    if (bun) counters[bun._id] = 2;
    return counters;
  }, [constructorState]);

  return (
    <>
      <h3 className='text text_type_main-medium mt-10 mb-6' ref={titleRef}>
        {title}
      </h3>
      <ul className={styles.items} ref={ref}>
        {ingredients.map((ingredient) => (
          <BurgerIngredient
            ingredient={ingredient}
            key={ingredient._id}
            count={ingredientsCounters[ingredient._id] || 0}
          />
        ))}
      </ul>
    </>
  );
});
