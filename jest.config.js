module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src/'],
  setupFilesAfterEnv: ['./jest.setup.js'],
  //   moduleNameMapper: {
  //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  //   },
  testEnvironment: 'jsdom',
};
