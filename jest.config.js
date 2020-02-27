module.exports = {
  moduleNameMapper: {
    '\\.scss$': require.resolve('./test/style-mock'),
    '\\.module\\.scss$': 'identity-obj-proxy'
  },
  setupFilesAfterEnv: ['./jest.setup.js']
};
