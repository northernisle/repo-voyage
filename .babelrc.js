const isTest = String(process.env.NODE_ENV) === 'test';

module.exports = {
  presets: [
    [
      '@babel/env',
      {
        modules: isTest ? 'commonjs' : false,
        useBuiltIns: 'entry',
        corejs: '2',
        targets: isTest
          ? {
              node: 'current'
            }
          : {
              browsers: ['>0.25%', 'not ie 11', 'not op_mini all']
            }
      }
    ],
    '@babel/react'
  ],
  plugins: ['@babel/proposal-class-properties']
};
