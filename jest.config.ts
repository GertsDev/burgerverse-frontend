/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'Отчёт по тестированию',
        outputPath: 'public/index.html',
        boilerplate: 'test-report/index.html'
      }
    ]
  ]
};
