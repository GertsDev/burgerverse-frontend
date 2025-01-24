import type { JestConfigWithTsJest } from 'ts-jest';
/**
 * For a detailed explanation regarding each configuration property, visit:
 * https://jestjs.io/docs/configuration
 */

const config: JestConfigWithTsJest = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  transform: {
    '^.+\\.tsx?$': 'ts-jest' // Используйте ts-jest для TypeScript файлов
  },
  moduleNameMapper: {
    '^@api(.*)$': '<rootDir>/src/utils/burger-api.ts',
    '^@slices(.*)$': '<rootDir>/src/services/slices$1',
    '^@components(.*)$': '<rootDir>/src/components$1',
    '^@utils-types(.*)$': '<rootDir>/src/utils/types$1'
  }
};

export default config;
