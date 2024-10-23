import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getIngredientState } from '../../services/slices/ingredients-slice';

// ImagePreloader preloads images as soon as ingredients are loaded to avoid delay in ingredient modal opening
export const ImagePreloader = () => {
  const { ingredients } = useSelector(getIngredientState);

  useEffect(() => {
    ingredients.forEach((ingredient) => {
      const img = new Image();
      img.src = ingredient.image_large;
    });
  }, [ingredients]);

  return null;
};
