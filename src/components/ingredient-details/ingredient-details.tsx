import { FC, useEffect } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useSelector } from 'react-redux';
import {
  getIngredients,
  getIngredientState
} from '../../services/slices/ingredients-slice';
import { useParams } from 'react-router-dom';
import { useDispatch } from '../../services/store';
import { TIngredient } from '@utils-types';

export const IngredientDetails: FC = () => {
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  const params = useParams();

  const { ingredients, loading, error } = useSelector(getIngredientState);
  const { id } = useParams<{ id: string }>();

  useEffect(() => {
    if (ingredients.length === 0 && !loading && !error) {
      dispatch(getIngredients());
    }
  }, [dispatch, ingredients.length, loading, error]);

  const ingredientData = ingredients.find(
    (ingredient: TIngredient) => ingredient._id === id
  );

  if (loading) {
    return <Preloader />;
  } else if (error) {
    return <p>Ошибка при загрузке ингредиентов:{error}</p>;
  }

  return ingredientData ? (
    <IngredientDetailsUI ingredientData={ingredientData} />
  ) : (
    <p>Ингредиент не найден</p>
  );
};
