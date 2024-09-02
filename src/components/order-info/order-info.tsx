import { FC } from 'react';

export const OrderInfo: FC = () =>
  /* Готовим данные для отображения */
  // const orderInfo = useMemo(() => {
  //   if (!orderData || !ingredients.length) return null;

  //   const date = new Date(orderData.createdAt);

  //   type TIngredientsWithCount = {
  //     [key: string]: TIngredient & { count: number };
  //   };

  //   const ingredientsInfo = orderData.ingredients.reduce(
  //     (acc: TIngredientsWithCount, item) => {
  //       if (!acc[item]) {
  //         const ingredient = ingredients.find((ing) => ing._id === item);
  //         if (ingredient) {
  //           acc[item] = {
  //             ...ingredient,
  //             count: 1
  //           };
  //         }
  //       } else {
  //         acc[item].count++;
  //       }

  //       return acc;
  //     },
  //     {}
  //   );

  //   const total = Object.values(ingredientsInfo).reduce(
  //     (acc, item) => acc + item.price * item.count,
  //     0
  //   );

  //   return {
  //     ...orderData,
  //     ingredientsInfo,
  //     date,
  //     total
  //   };
  // }, [orderData, ingredients]);

  // if (!orderInfo) {
  //   return <Preloader />;
  // }

  // return <OrderInfoUI orderInfo={orderInfo} />;

  null;
