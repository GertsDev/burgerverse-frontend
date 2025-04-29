import type { Meta, StoryObj } from '@storybook/react';
import { BurgerConstructorElement } from '../burger-constructor-element/burger-constructor-element';

const meta = {
  title: 'Burger Constructor Element',
  component: BurgerConstructorElement,
  // This component will have an automatically generated Autodocs entry: https://storybook.js.org/docs/writing-docs/autodocs
  tags: ['autodocs'],
  parameters: {
    // More on how to position stories at: https://storybook.js.org/docs/configure/story-layout
    layout: 'fullscreen'
  }
} satisfies Meta<typeof BurgerConstructorElement>;

export default meta;
type Story = StoryObj<typeof meta>;

const defaultIngredient = {
  _id: '60d3b41abdacab0026a733c6',
  id: 'randomuuid1',
  name: 'Краторная булка N-200i',
  type: 'bun' as const, // Use const assertion for type safety
  proteins: 80,
  fat: 24,
  carbohydrates: 53,
  calories: 420,
  price: 1255,
  image: 'https://code.s3.yandex.net/react/code/bun-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/bun-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/bun-02-mobile.png'
};

const anotherIngredient = {
  _id: '60d3b41abdacab0026a733c9',
  id: 'randomuuid2',
  name: 'Соус Spicy-X',
  type: 'sauce' as const,
  proteins: 30,
  fat: 20,
  carbohydrates: 40,
  calories: 30,
  price: 90,
  image: 'https://code.s3.yandex.net/react/code/sauce-02.png',
  image_large: 'https://code.s3.yandex.net/react/code/sauce-02-large.png',
  image_mobile: 'https://code.s3.yandex.net/react/code/sauce-02-mobile.png'
};

// First element (index 0 of 2)
export const FirstElement: Story = {
  args: {
    ingredient: defaultIngredient,
    index: 0,
    totalItems: 2
    // Handlers removed as they are internal
  }
};

// Middle element (index 1 of 3)
export const MiddleElement: Story = {
  args: {
    ingredient: anotherIngredient,
    index: 1,
    totalItems: 3
  }
};

// Last element (index 1 of 2)
export const LastElement: Story = {
  args: {
    ingredient: anotherIngredient,
    index: 1,
    totalItems: 2
  }
};
