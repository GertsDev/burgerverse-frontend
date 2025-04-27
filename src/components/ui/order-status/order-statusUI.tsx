import { FC } from 'react';
import { OrderStatusUIProps } from './type';

export const OrderStatusUI: FC<OrderStatusUIProps> = ({ textStyle, text }) => (
  <span
    className='text text_type_main-default pt-2'
    style={{ color: textStyle }}
  >
    {text}
  </span>
);
