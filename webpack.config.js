const path = require('path');
const { DefinePlugin } = require("webpack");
const dotenv = require('dotenv');

const env = dotenv.config().parsed;
let envKeys

// This if else statement helps Webpack know where to get env variables. If there's a .env file (local environment), it will use dotenv to assign environment variables to process.env on client side. If there's no .env file (deployed) it passes the variables at process.env to client side
if(env){
  envKeys = Object.keys(env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});
} else {
  envKeys = Object.keys(process.env).reduce((prev, next) => {
    prev[`process.env.${next}`] = JSON.stringify(process.env[next]);
    return prev;
  }, {});
}
 
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
  },
  plugins: [
    new DefinePlugin(envKeys)
  ]
};
