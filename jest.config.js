module.exports = {
  roots: ['<rootDir>/src'],
  testTimeout: 60000,
  coverageDirectory: 'coverage',
  testEnvironment: 'node',
  transform: {
    '.+\\.ts$': 'ts-jest'
  },
  preset: '@shelf/jest-mongodb'
}
