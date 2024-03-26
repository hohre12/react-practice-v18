module.exports = {
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'ts-jest',
  },
  modulePaths: ['<rootDir>/src/'],
  //   moduleNameMapper: {
  //     '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  //   },
  testEnvironment: 'jsdom',
};
