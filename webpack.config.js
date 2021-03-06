const HtmlWebPackPlugin = require('html-webpack-plugin')
const path = require('path')

const localIdentName = process.env.NODE_ENV === 'production' ? '[hash:base64:5]' : '[name]__[local]__[hash:base64:3]'

module.exports = {
  entry: './src/js/index.js',
  // output: {
  //   filename: '[name].bundle.js',
  //   path: path.resolve(__dirname, 'dist'),
  // },
  module: {
    rules: [
      {
        test: /\.worker\.js$/,
        use: { loader: 'worker-loader' },
      },
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
          },
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
            },
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName,
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve('src', 'node_modules')],
            },
          },
        ],
      },
      {
        test: /\.s?css$/,
        exclude: /src/,
        use: [
          {
            loader: 'style-loader',
            options: {
              singleton: true,
            },
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: [path.resolve('src', 'node_modules')],
            },
          },
        ],
      },
    ],
  },
  resolve: { extensions: ['.js', '.jsx'] },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
  ],
}
