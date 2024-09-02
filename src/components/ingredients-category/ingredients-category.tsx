import { forwardRef } from 'react';
import { TIngredientsCategoryProps } from './type';

export const IngredientsCategory = forwardRef<
  HTMLUListElement,
  TIngredientsCategoryProps
>(
  ({ title, titleRef, ingredients }, ref) =>
    // const ingredientsCounters = useMemo(() => {
    //   const counters: { [key: string]: number } = {};
    //   ingredients.forEach((ingredient: TIngredient) => {
    //     if (!counters[ingredient._id]) counters[ingredient._id] = 0;
    //     counters[ingredient._id]++;
    //   });
    //   if (bun) counters[bun._id] = 2;
    //   return counters;
    // }, [burgerConstructor]);

    // <IngredientsCategoryUI
    //   title={title}
    //   titleRef={titleRef}
    //   ingredients={ingredients}
    //   ingredientsCounters={ingredientsCounters}
    //   ref={ref}
    // />

    null
);
