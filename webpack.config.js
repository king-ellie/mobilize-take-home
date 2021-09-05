const path = require('path');
 
module.exports = { 
  mode: 'development',
  devtool: 'source-map',
  entry: './client/index.js',
  output: {
    filename: './public/bundle.js',
    path: __dirname,
  },
  module: {
    rules: [
      {
        loader: 'babel-loader',
        exclude: /(node_modules)/,
        options: {
          presets: ['@babel/preset-react']
        }
      },
      {
        test: /.css$/i,
        use: ['style-loader', 'css-loader'],
      }
    ],
  }
};
