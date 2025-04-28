import type { Meta, StoryObj } from '@storybook/react';
import { BurgerIngredient } from '../components/burger-ingredient/burger-ingredient';

const meta = {
  title: 'Burger Ingredient',
  component: BurgerIngredient,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  },
  decorators: [
    (Story) => (
      <div style={{ width: 'fit-content', margin: 20 }}>
        <Story />
      </div>
    )
  ]
} satisfies Meta<typeof BurgerIngredient>;

export default meta;
type Story = StoryObj<typeof meta>;

export const DefaultIngredient: Story = {
  args: {
    ingredient: {
      _id: '111',
      name: 'Краторная булка N-200i',
      type: 'bun',
      proteins: 80,
      fat: 24,
      carbohydrates: 53,
      calories: 420,
      price: 1255,
      image: 'https://code.s3.yandex.net/react/code/bun-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
    },
    count: 1
  }
};

export const IngredientWithCount: Story = {
  args: {
    ingredient: {
      _id: '222',
      name: 'Соус Spicy-X',
      type: 'sauce',
      proteins: 30,
      fat: 20,
      carbohydrates: 40,
      calories: 30,
      price: 90,
      image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
      image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
    },
    count: 3
  }
};
