module.exports = {
  testEnvironment: 'jsdom',
  moduleNameMapper: {
    '\\.scss$': require.resolve('./styles/mock'),
    '\\.mp4$': require.resolve('./assets/mock')
  },
  setupTestFrameworkScriptFile: require.resolve('./setup')
}