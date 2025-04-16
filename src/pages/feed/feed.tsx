import { useDispatch } from '@redux-store';
import { fetchFeedOrders, getFeedState } from '@slices/feedsSlice';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import { FC, useEffect } from 'react';
import { useSelector } from 'react-redux';

export const Feed: FC = () => {
  const { orders, loading } = useSelector(getFeedState);
  /** TODO: взять переменную из стора */
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchFeedOrders());
  }, [dispatch]);

  if (loading) {
    return <Preloader />;
  }

  return (
    <FeedUI
      orders={orders}
      handleGetFeeds={() => dispatch(fetchFeedOrders())}
    />
  );
};
