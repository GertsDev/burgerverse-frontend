import { useSelector } from '@redux-store';

import styles from './constructor-page.module.css';

import { BurgerConstructor, BurgerIngredients } from '@components';
import { getIngredientState } from '@slices/ingredients-slice';
import { Preloader } from '@ui';
import { FC } from 'react';

export const ConstructorPage: FC = () => {
  const isIngredientsLoading = useSelector(getIngredientState).loading;

  return (
    <>
      {isIngredientsLoading ? (
        <Preloader />
      ) : (
        <main className={styles.containerMain}>
          <h1
            className={`${styles.title} text text_type_main-large mt-10 mb-5 pl-5`}
          >
            Build Your Space Burger
          </h1>
          <div className={`${styles.main} pl-5 pr-5`}>
            <BurgerIngredients />
            <BurgerConstructor />
          </div>
        </main>
      )}
    </>
  );
};
