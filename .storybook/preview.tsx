import React from 'react';
import type { Preview } from '@storybook/react';
import { BrowserRouter } from 'react-router-dom';

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    }
  },
  decorators: [
    (Story) => (
      <BrowserRouter>
        <div style={{ padding: 20, width: 'fit-content' }}>
          <Story />
        </div>
      </BrowserRouter>
    )
  ]
};

export default preview;
