import { FC, memo } from 'react';

import styles from './feed.module.css';

import { FeedInfo, OrdersList } from '@components';
import { RefreshButton } from '@zlden/react-developer-burger-ui-components';
import { FeedUIProps } from './type';

export const FeedUI: FC<FeedUIProps> = memo(({ orders, handleGetFeeds }) => (
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
));
