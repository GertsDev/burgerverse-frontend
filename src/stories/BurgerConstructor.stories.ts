import { BurgerConstructor } from '@components/burger-constructor/';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Burger Constructor',
  component: BurgerConstructor,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BurgerConstructor>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultConstructor: Story = {
  args: {
    // Remove props previously passed to UI component
    // constructorItems: { bun: null, ingredients: [] },
    // orderRequest: false,
    // price: 0,
    // orderModalData: null,
    // onOrderClick: () => {},
    // closeOrderModal: () => {}
  }
};
