import { TOrder } from '@utils-types';
import { FC, memo, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { getFeedState } from '../../services/slices/feedsSlice';
import styles from './feed-info.module.css';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

interface HalfColumnProps {
  orders: number[];
  title: string;
  textColor?: 'blue' | string;
}

const HalfColumn: FC<HalfColumnProps> = memo(({ orders, title, textColor }) => (
  <div className={`pr-6 ${styles.column}`}>
    <h3 className={`text text_type_main-medium ${styles.title}`}>{title}:</h3>
    <ul className={`pt-6 ${styles.list}`}>
      {orders.map((item) => (
        <li
          className={`text text_type_digits-default ${styles.list_item}`}
          style={{ color: textColor === 'blue' ? '#00cccc' : '#F2F2F3' }}
          key={item}
        >
          {item}
        </li>
      ))}
    </ul>
  </div>
));

interface TColumnProps {
  title: string;
  content: number;
}

const Column: FC<TColumnProps> = memo(({ title, content }) => (
  <>
    <h3 className={`pt-15 text text_type_main-medium ${styles.title}`}>
      {title}:
    </h3>
    <p className={`text text_type_digits-large ${styles.content}`}>{content}</p>
  </>
));

export const FeedInfo: FC = () => {
  const { orders, total, totalToday } = useSelector(getFeedState);

  const readyOrders = useMemo(() => getOrders(orders, 'done'), [orders]);
  const pendingOrders = useMemo(() => getOrders(orders, 'pending'), [orders]);

  return (
    <section data-cy='feed-info'>
      <div className={styles.columns}>
        <HalfColumn
          orders={readyOrders}
          title={'Ready for Launch'}
          textColor={'blue'}
        />
        <HalfColumn orders={pendingOrders} title={'In Progress'} />
      </div>
      <Column title={'Total Orders Completed'} content={total} />
      <Column title={'Orders Completed Today'} content={totalToday} />
    </section>
  );
};
