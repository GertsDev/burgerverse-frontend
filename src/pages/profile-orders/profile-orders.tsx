import { ProfileOrdersUI } from '@ui-pages';
import { TOrder } from '@utils-types';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  fetchUserOrders,
  getUserOrdersState
} from '../../services/slices/userOrdersSlice';
import { useDispatch } from '../../services/store';
import { Preloader } from '@ui';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();

  // Получаем заказы пользователя из состояния
  const { orders, loading, error } = useSelector(getUserOrdersState);

  // При монтировании компонента загружаем заказы пользователя
  useEffect(() => {
    dispatch(fetchUserOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />; // Или компонент прелоадера
  }

  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return <ProfileOrdersUI orders={orders} />;
};
