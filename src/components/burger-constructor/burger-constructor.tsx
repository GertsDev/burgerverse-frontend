import { FC, useEffect, useMemo } from 'react';
import { TConstructorIngredient } from '@utils-types';
import { BurgerConstructorUI } from '@ui';
import { useDispatch, useSelector } from '../../services/store';
import { useNavigate } from 'react-router-dom'; // Импортируем useNavigate
import {
  clearConstructor,
  getBurgerState
} from '../../services/slices/burger-slice';
import {
  clearOrder,
  getOrderState,
  placeOrder
} from '../../services/slices/order-slice';
import { getUserState } from '../../services/slices/userSlice'; // Импортируем состояние пользователя

export const BurgerConstructor: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Инициализируем навигацию
  const { isAuthenticated } = useSelector(getUserState); // Получаем состояние авторизации

  const constructorItems = useSelector(getBurgerState);
  const { order, loading: orderRequest, error } = useSelector(getOrderState);

  const orderModalData = order;

  const { bun, ingredients } = constructorItems;

  const onOrderClick = () => {
    if (!isAuthenticated) {
      // Если пользователь не авторизован, перенаправляем на страницу логина
      navigate('/login');
      return;
    }

    if (!constructorItems.bun || orderRequest) return;

    const ingredientIds = [
      constructorItems.bun._id,
      ...ingredients.map((ingredient) => ingredient._id),
      constructorItems.bun._id
    ];

    dispatch(placeOrder(ingredientIds));
  };

  const closeOrderModal = () => {
    dispatch(clearOrder());
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

  useEffect(() => {
    if (order && !orderRequest && !error) {
      dispatch(clearConstructor());
    }
  }, [order, orderRequest, error, dispatch]);

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
