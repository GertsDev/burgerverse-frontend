// webpack.config.js
const path = require('path');
const ESLintPlugin = require('eslint-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');
const { TsconfigPathsPlugin } = require('tsconfig-paths-webpack-plugin');

module.exports = (env, argv) => ({
  entry: path.resolve(__dirname, 'src/index.tsx'),
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(ts)x?$/,
        exclude: /node_modules/,
        use: ['ts-loader']
      },
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.module\.css$/i,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: { modules: true }
          }
        ]
      },
      {
        test: /\.(jpg|jpeg|png|svg)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff|woff2)$/,
        type: 'asset/resource'
      }
    ]
  },
  plugins: [
    new ESLintPlugin({
      extensions: ['.js', '.jsx', '.ts', '.tsx']
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Burgerverse - Cosmic Burger Joint',
      favicon: './public/favicon.ico',
      meta: {
        description:
          'Create your own custom cosmic burger and place orders at this interplanetary burger joint',
        keywords: 'burger, cosmic, space, food, delivery, custom burger',
        author: 'Kirill Gerts',
        'og:title': 'Burgerverse - Cosmic Burger Joint',
        'og:description':
          'Build your own custom cosmic burger and place orders from anywhere in the galaxy',
        'og:type': 'website',
        'og:url': 'https://www.stellarburger.com',
        'og:image': 'https://www.stellarburger.com/og-image.jpg',
        'twitter:card': 'summary_large_image',
        'twitter:title': 'Burgerverse - Cosmic Burger Joint',
        'twitter:description':
          'Build your own custom cosmic burger and place orders from anywhere in the galaxy'
      }
    }),
    new Dotenv({
      path: argv.mode === 'development' ? '.env.development' : '.env',
      systemvars: true
    })
  ],
  resolve: {
    extensions: [
      '.js',
      '.jsx',
      '.ts',
      '.tsx',
      '.json',
      '.css',
      '.scss',
      '.png',
      '.svg',
      '.jpg'
    ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.resolve(__dirname, 'tsconfig.json')
      })
    ]
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  devServer: {
    static: [path.join(__dirname, 'dist'), path.join(__dirname, 'public')],
    compress: true,
    historyApiFallback: true,
    port: 4000
  }
});
