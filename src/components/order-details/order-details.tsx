import React from 'react';
import doneImg from '@images/done.svg';
import styles from './order-details.module.css';
import { OrderDetailsProps } from './type';

export const OrderDetails: React.FC<OrderDetailsProps> = ({ orderNumber }) => (
  <>
    <h2
      className={`${styles.title} text text_type_digits-large mt-2 mb-4`}
      data-cy='order-number'
    >
      {orderNumber}
    </h2>
    <p className='text text_type_main-medium'>Space Order ID</p>
    <img className={styles.img} src={doneImg} alt='order status image' />
    <p className='text text_type_main-default mb-1'>
      Your space burger is being prepared
    </p>
    <p className={`${styles.text} text text_type_main-default`}>
      Await completion at the orbital station
    </p>
  </>
);
