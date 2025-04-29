import { FeedInfo, OrdersList } from '@components';
import { useDispatch } from '@redux-store';
import { fetchFeedOrders, getFeedState } from '@slices/feedsSlice';
import { Preloader } from '@ui';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';
import styles from './feed.module.css';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  const handleGetFeeds = () => {
    dispatch(fetchFeedOrders());
  };

  if (loading) {
    return <Preloader />;
  }

  return (
    <main className={styles.containerMain}>
      <div className={`${styles.titleBox} mt-10 mb-5`}>
        <h1 className={`${styles.title} text text_type_main-large`}>
          Order Feed
        </h1>
        <RefreshButton
          text='Refresh'
          onClick={handleGetFeeds}
          extraClass={'ml-30'}
        />
      </div>
      <div className={styles.main}>
        <div className={styles.columnOrders}>
          <OrdersList orders={orders} />
        </div>
        <div className={styles.columnInfo}>
          <FeedInfo />
        </div>
      </div>
    </main>
  );
};
