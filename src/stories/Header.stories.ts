import type { Meta, StoryObj } from '@storybook/react';
// Import the combined component
import { AppHeader } from '../app/app-header/app-header';

const meta = {
  title: 'App Header',
  // Update component reference
  component: AppHeader,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof AppHeader>; // Update type reference

export default meta;
type Story = StoryObj<typeof meta>;

// The default story likely doesn't need args anymore, as the component gets user data from Redux.
// Specific states like LoggedIn/LoggedOut would require Redux state mocking.
export const Default: Story = {
  args: {
    // Remove props previously passed to UI component
    // userName: 'John Doe' or undefined
  }
};

// export const LoggedIn: Story = { ... }; // Requires Redux mock
// export const LoggedOut: Story = { ... }; // Requires Redux mock
