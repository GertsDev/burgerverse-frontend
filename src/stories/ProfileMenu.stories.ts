import type { Meta, StoryObj } from '@storybook/react';
import { ProfileMenu } from '../components/profile-menu/profile-menu';

const meta = {
  title: 'Profile Menu',
  component: ProfileMenu,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'centered'
  }
} satisfies Meta<typeof ProfileMenu>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    // Remove props previously passed to UI component
    // pathname: '/profile',
    // handleLogout: () => {}
  }
  // To show active states, you might need Router mocking
};
