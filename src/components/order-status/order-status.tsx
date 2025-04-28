import { FC } from 'react';

// Define props inline
interface OrderStatusProps {
  status: string;
}

const statusMap: { [key: string]: { text: string; color: string } } = {
  pending: { text: 'Cooking in Space', color: '#E52B1A' },
  done: { text: 'Mission Complete', color: '#00CCCC' },
  created: { text: 'Order Launched', color: '#F2F2F3' }
};

export const OrderStatus: FC<OrderStatusProps> = ({ status }) => {
  const { text, color } = statusMap[status] || {
    text: status,
    color: '#F2F2F3'
  }; // Default fallback

  return (
    <span className='text text_type_main-default pt-2' style={{ color: color }}>
      {text}
    </span>
  );
};
