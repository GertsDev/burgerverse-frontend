// ../utils/getRandomIngredient.ts
export const getRandomIngredient = (ingredients: any, type?: any) => {
  const filteredIngredients = type
    ? ingredients.filter((ingredient: any) => ingredient.type === type)
    : ingredients;
  const randomIndex = Math.floor(Math.random() * filteredIngredients.length);
  return filteredIngredients[randomIndex];
};
