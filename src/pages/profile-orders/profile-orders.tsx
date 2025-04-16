import { useDispatch } from '@redux-store';
import { fetchUserOrders, getUserOrdersState } from '@slices/userOrdersSlice';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

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
