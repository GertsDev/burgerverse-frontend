import { OrderCard } from '@components';
import { TOrder } from '@utils-types';
import { FC, memo } from 'react';
import styles from './orders-list.module.css';

interface OrdersListProps {
  orders: TOrder[];
}

export const OrdersList: FC<OrdersListProps> = memo(({ orders }) => {
  const orderByDate = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );

  return (
    <div className={`${styles.content}`} data-cy='orders-list'>
      {orderByDate.map((order) => (
        <OrderCard order={order} key={order._id} />
      ))}
    </div>
  );
});
