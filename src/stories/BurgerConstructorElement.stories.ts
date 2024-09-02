import { BurgerConstructorElementUI } from '@ui';
import type { Meta, StoryObj } from '@storybook/react';
import { totalmem } from 'os';

const meta = {
  title: 'Example/BurgerConstructorElement',
  component: BurgerConstructorElementUI,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BurgerConstructorElementUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultElement: Story = {
  args: {
    ingredient: {
      _id: '111',
      id: '222',
      name: 'Булка',
      type: 'top',
      proteins: 12,
      fat: 33,
      carbohydrates: 22,
      calories: 33,
      price: 123,
      image: '',
      image_large: '',
      image_mobile: ''
    },
    index: 0,
    totalItems: 1,
    handleMoveUp: () => {},
    handleMoveDown: () => {},
    handleClose: () => {}
  }
};
