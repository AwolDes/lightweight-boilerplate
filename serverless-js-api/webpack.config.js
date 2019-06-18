const nodeExternals = require('webpack-node-externals');
const slsw = require('serverless-webpack');
const path = require('path');

module.exports = {
  entry: slsw.lib.entries,
  target: 'node',
  externals: [nodeExternals({
    modulesFromFile: true
  })],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel-loader'],
      exclude: /node_modules/
    }]
  },
  output: {
    libraryTarget: 'commonjs',
    path: path.resolve(__dirname, '.webpack'),
    filename: '[name].js'
  }
};
