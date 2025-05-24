module.exports = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  moduleNameMapper: {
    '@/(.*)': '<rootDir>/src/app/$1',
  },
  transform: {
    '^.+\\.(ts|mjs|html|js)$': 'jest-preset-angular',
  },
  testEnvironment: 'jsdom',
  collectCoverage: true,
  coverageReporters: ['html', 'text-summary'],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'json', 'node'], // Extensions Jest should support
  coverageDirectory: '<rootDir>/coverage',
  globals: {
    'ts-jest': {
      tsconfig: 'tsconfig.spec.json',
      stringifyContentPathRegex: '\\.html$',
    },
  },
};

// module.exports = {
//   preset: 'jest-preset-angular', // Use the jest-preset-angular preset
//   testEnvironment: 'jsdom', // Use jsdom for Angular testing
//   transform: {
//     '^.+\\.(ts|js|html)$': 'ts-jest', // Use ts-jest to handle .ts, .js, and .html files
//     '^.+\\.html$': 'jest-preset-angular', // Handle Angular HTML templates
//   },
//   transformIgnorePatterns: [
//     'node_modules/(?!@angular|rxjs|zone.js|)/', // Transform Angular and necessary libraries
//   ],
//   moduleFileExtensions: ['ts', 'js', 'html', 'json'], // File types Jest should support
//   coverageDirectory: '<rootDir>/coverage',
//   coverageReporters: ['html', 'text-summary'],
//   setupFilesAfterEnv: ['<rootDir>/src/setup-jest.ts'], // Setup Jest after environment initialization
//   globals: {
//     'ts-jest': {
//       tsconfig: 'tsconfig.spec.json', // Ensure the correct TypeScript config is used
//     },
//   },
// };
