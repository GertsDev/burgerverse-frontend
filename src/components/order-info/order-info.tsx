import { getIngredientState } from '@slices/ingredients-slice';
import { getOrderByNumber, getOrderState } from '@slices/order-slice';
import { TIngredient } from '@utils-types';
import { FC, useEffect, useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from '../../services/store';
import { OrderInfoUI } from '../ui/order-info';
import { Preloader } from '../ui/preloader';

export const OrderInfo: FC = () => {
  const { getOrderByNumberResponse, request } = useSelector(getOrderState);
  const dispatch = useDispatch();
  const number = Number(useParams().number);

  const { ingredients } = useSelector(getIngredientState);
  useEffect(() => {
    dispatch(getOrderByNumber(number));
  }, []);
  const orderInfo = useMemo(() => {
    if (!getOrderByNumberResponse || !ingredients.length) return null;

    const date = new Date(getOrderByNumberResponse.createdAt);

    type TIngredientsWithCount = {
      [key: string]: TIngredient & { count: number };
    };

    const ingredientsInfo = getOrderByNumberResponse.ingredients.reduce(
      (acc: TIngredientsWithCount, item) => {
        if (!acc[item]) {
          const ingredient = ingredients.find((ing) => ing._id === item);
          if (ingredient) {
            acc[item] = {
              ...ingredient,
              count: 1
            };
          }
        } else {
          acc[item].count++;
        }

        return acc;
      },
      {}
    );

    const total = Object.values(ingredientsInfo).reduce(
      (acc, item) => acc + item.price * item.count,
      0
    );

    return {
      ...getOrderByNumberResponse,
      ingredientsInfo,
      date,
      total
    };
  }, [getOrderByNumberResponse, ingredients]);

  if (!orderInfo || request) {
    return <Preloader />;
  }

  return <OrderInfoUI orderInfo={orderInfo} />;
};
