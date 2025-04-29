import type { Meta, StoryObj } from '@storybook/react';
import { OrderCard } from '../order-card/order-card';

const meta = {
  title: 'Order Card',
  component: OrderCard,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof OrderCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    order: {
      _id: '60d3b41abdacab0026a733c6',
      status: 'done',
      name: 'Краторный spicy бургер',
      createdAt: '2024-01-25T10:00:00.000Z',
      updatedAt: '2024-01-25T10:05:00.000Z',
      number: 12345,
      ingredients: [
        '60d3b41abdacab0026a733c6', // Bun _id
        '60d3b41abdacab0026a733c9', // Sauce _id
        '60d3b41abdacab0026a733c7', // Main _id
        '60d3b41abdacab0026a733c6' // Bun _id
      ]
    }
  }
};
