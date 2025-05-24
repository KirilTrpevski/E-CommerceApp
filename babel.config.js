module.exports = {
  presets: ['@babel/preset-env', '@babel/preset-typescript'],
  plugins: [
    [
      '@babel/plugin-proposal-decorators',
      {
        version: '2018-09', // Specify version
        decoratorsBeforeExport: true, // Apply decorators before export
      },
    ],
  ],
};
