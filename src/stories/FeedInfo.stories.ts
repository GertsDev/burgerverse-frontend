import type { Meta, StoryObj } from '@storybook/react';
import { FeedInfo } from '../components/feed-info/feed-info';

const meta = {
  title: 'Feed Info',
  component: FeedInfo,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof FeedInfo>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    // Remove props previously passed to UI component
    // feed: { ... },
    // readyOrders: [123, 124, 125],
    // pendingOrders: [126, 127]
  }
};
