import { getIngredientState } from '@slices/ingredients-slice';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';

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
