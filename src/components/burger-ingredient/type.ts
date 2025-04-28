import { TIngredient } from '@utils-types';

export type TBurgerIngredientProps = {
  ingredient: TIngredient;
  count: number;
};

import { Location } from 'react-router-dom';

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
