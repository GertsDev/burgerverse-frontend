import { FC, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { getBurgerState } from '../../services/slices/burger/burger-slice';
import {
  clearOrder,
  getOrderState,
  placeOrder
} from '../../services/slices/order/order-slice';

export const BurgerConstructor: FC = () => {
  /** TODO: взять переменные constructorItems, orderRequest и orderModalData из стора */

  const dispatch = useDispatch();

  const constructorItems = useSelector(getBurgerState);
  const { order, loading: orderRequest, error } = useSelector(getOrderState);

  //const orderRequest = false;

  const orderModalData = null;

  // const onOrderClick = () => {
  //   if (!constructorItems.bun || orderRequest) return;
  // };
  const { bun, ingredients } = constructorItems;

  const onOrderClick = () => {
    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(placeOrder(ingredientIds));
  };
  const closeOrderModal = () => {
    // dispatch(clearOrder());
  };

  const price = useMemo(
    () =>
      (constructorItems.bun ? constructorItems.bun.price * 2 : 0) +
      constructorItems.ingredients.reduce(
        (s: number, v: TConstructorIngredient) => s + v.price,
        0
      ),
    [constructorItems]
  );

  //return null;

  return (
    <BurgerConstructorUI
      price={price}
      orderRequest={orderRequest}
      constructorItems={constructorItems}
      orderModalData={orderModalData}
      onOrderClick={onOrderClick}
      closeOrderModal={closeOrderModal}
    />
  );
};
