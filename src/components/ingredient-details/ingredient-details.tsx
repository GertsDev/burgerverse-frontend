import { Preloader } from '@ui/preloader';
import { TIngredient } from '@utils-types';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getIngredients,
  getIngredientState
} from '../../services/slices/ingredients-slice';
import { useDispatch, useSelector } from '../../services/store';
import styles from './ingredient-details.module.css';

export const IngredientDetails: FC = () => {
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  const { ingredients, loading, error } = useSelector(getIngredientState);

  useEffect(() => {
    if (!ingredients.length && !loading && !error) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length, loading, error]);

  const ingredientData = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id
  );

  if (loading) {
    return <Preloader />;
  } else if (error) {
    return <p>Error loading ingredient data: {error}</p>;
  } else if (!ingredientData) {
    return <p>Ingredient not found.</p>;
  }

  return (
    <div className={styles.content}>
      <img
        src={ingredientData.image_large}
        alt={`${ingredientData.name} large view`}
        className={styles.img}
      />
      <h3 className={`mt-4 text text_type_main-medium ${styles.title}`}>
        {ingredientData.name}
      </h3>
      <ul className={`${styles.nutritional_values} mt-8`}>
        <li className={`${styles.value} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>
            Calories, kcal
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredientData.calories}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>
            Proteins, g
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredientData.proteins}
          </p>
        </li>
        <li className={`${styles.value} mr-5`}>
          <p className='text text_type_main-default text_color_inactive'>
            Fat, g
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredientData.fat}
          </p>
        </li>
        <li className={styles.value}>
          <p className='text text_type_main-default text_color_inactive'>
            Carbs, g
          </p>
          <p className='text text_type_digits-default text_color_inactive'>
            {ingredientData.carbohydrates}
          </p>
        </li>
      </ul>
    </div>
  );
};
