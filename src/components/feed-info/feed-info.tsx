import { FC } from 'react';

import { TOrder } from '@utils-types';

const getOrders = (orders: TOrder[], status: string): number[] =>
  orders
    .filter((item) => item.status === status)
    .map((item) => item.number)
    .slice(0, 20);

export const FeedInfo: FC = () =>
  // const readyOrders = getOrders(orders, 'done');

  // const pendingOrders = getOrders(orders, 'pending');

  // return (
  //   <FeedInfoUI
  //     readyOrders={readyOrders}
  //     pendingOrders={pendingOrders}
  //     feed={feed}
  //   />
  // );

  null;
