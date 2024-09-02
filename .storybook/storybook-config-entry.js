module.exports = {
  stories: ['../src/**/*.stories.@(js|jsx|ts|tsx)'],
  addons: ['@storybook/addon-essentials'],
  webpackFinal: async (config) => {
    config.entry.push(require.resolve('../.storybook/preview.tsx'));

    return config;
  }
};
