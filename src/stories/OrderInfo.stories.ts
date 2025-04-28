import type { Meta, StoryObj } from '@storybook/react';
import { OrderInfo } from '../components/order-info/order-info';

const meta = {
  title: 'Order Info',
  component: OrderInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof OrderInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

// The component now fetches its own data based on route params and Redux state.
// Displaying it directly in Storybook requires mocking React Router's useParams and Redux state.
// For simplicity, have a default story without args.
export const Default: Story = {
  args: {
    // Remove prop previously passed to UI component
    // orderInfo: { ... }
  }
};
