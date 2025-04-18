import { useDispatch, useSelector } from '@redux-store';
import { IngredientDetailsUI } from '@ui/ingredient-details';
import { Preloader } from '@ui/preloader';
import { TIngredient } from '@utils-types';
import { FC, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  getIngredients,
  getIngredientState
} from '../../services/slices/ingredients-slice';

export const IngredientDetails: FC = () => {
  /** TODO: get variable from store */
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
    return <p>Error loading ingredients: {error}</p>;
  }

  return ingredientData ? (
    <IngredientDetailsUI ingredientData={ingredientData} />
  ) : (
    <p>Ingredient not found</p>
  );
};
