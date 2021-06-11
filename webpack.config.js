const HtmlWebpackPlugin = require('html-webpack-plugin');
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin');
const path = require('path');

const isProd = process.env.NODE_ENV === 'production';

const baseConfig = {
  mode: isProd ? 'production' : 'development',
  devtool: isProd ? false : 'inline-source-map',
  node: {
    __dirname: false,
    __filename: false,
  },
  resolve: {
    extensions: ['.js', '.ts', '.jsx', '.tsx', '.json'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        enforce: 'pre',
        loader: 'eslint-loader',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
      },
    ],
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
  },
};

const main = {
  ...baseConfig,
  target: 'electron-main',
  entry: {
    main: './src/main.ts',
  },
};

const preload = {
  ...baseConfig,
  target: 'electron-preload',
  entry: {
    preload: './src/preload.ts',
  },
};

const renderer = {
  ...baseConfig,
  target: 'electron-renderer',
  entry: {
    index: './src/index.tsx',
    captcha: './src/captcha-index.tsx',
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      chunks: ['index'],
      filename: './public/index.html',
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackPlugin({
      template: './public/captcha-index.html',
      chunks: ['captcha'],
      filename: './public/captcha-index.html',
      inlineSource: '.(js|css)$',
    }),
    new HtmlWebpackInlineSourcePlugin(HtmlWebpackPlugin),
  ],
};

module.exports = [main, preload, renderer];
