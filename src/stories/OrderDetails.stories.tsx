import React from 'react';
import { OrderDetailsUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Example/OrderDetails',
  component: OrderDetailsUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div
        style={{
          width: 'fit-content',
          margin: 20,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof OrderDetailsUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultOrderDetails: Story = {
  args: {
    orderNumber: 12
  }
};
