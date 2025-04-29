import type { Meta, StoryObj } from '@storybook/react';
import { IngredientDetails } from '../ingredient-details/ingredient-details';

const meta = {
  title: 'Ingredient Details',
  component: IngredientDetails,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof IngredientDetails>;

export default meta;
type Story = StoryObj<typeof meta>;

// The component now fetches its own data based on route params and Redux state.
// Displaying it directly in Storybook requires mocking React Router's useParams and Redux state.
// For simplicity, we can have a default story without args, which might show "Loading..." or "Not Found"
// depending on the mock setup (or lack thereof).
export const Default: Story = {
  args: {
    // Remove prop previously passed to UI component
    // ingredientData: { ... }
  }
};
