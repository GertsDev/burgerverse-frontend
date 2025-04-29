import { OrdersList, ProfileMenu } from '@components';
import { useDispatch } from '@redux-store';
import { fetchUserOrders, getUserOrdersState } from '@slices/userOrdersSlice';
import { Preloader } from '@ui/index';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './profile-orders.module.css';

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
    return <p>Error: {error}</p>;
  }

  return (
    <main className={`${styles.main}`}>
      <div className={`mt-30 mr-15 ${styles.menu}`}>
        <ProfileMenu />
      </div>
      <div className={`mt-10 ${styles.orders}`}>
        <OrdersList orders={orders} />
      </div>
    </main>
  );
};
