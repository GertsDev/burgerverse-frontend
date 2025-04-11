import { OrderStatusUI } from '@ui';
import { FC } from 'react';
import { OrderStatusProps } from './type';

const statusText: { [key: string]: string } = {
  pending: 'Cooking in Space',
  done: 'Mission Complete',
  created: 'Order Launched'
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  let textStyle = '';
  switch (status) {
    case 'pending':
      textStyle = '#E52B1A';
      break;
    case 'done':
      textStyle = '#00CCCC';
      break;
    default:
      textStyle = '#F2F2F3';
  }

  return <OrderStatusUI textStyle={textStyle} text={statusText[status]} />;
};
