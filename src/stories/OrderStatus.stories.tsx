import type { Meta, StoryObj } from '@storybook/react';
import { OrderStatus } from '../components/order-status/order-status';

const meta = {
  title: 'Order Status',
  component: OrderStatus,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ margin: 20 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OrderStatus>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Done: Story = {
  args: {
    status: 'done'
  }
};

export const Pending: Story = {
  args: {
    status: 'pending'
  }
};

export const Created: Story = {
  args: {
    status: 'created'
  }
};

export const Unknown: Story = {
  args: {
    status: 'cancelled'
  }
};
