const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const ImageminWebpackPlugin = require('imagemin-webpack-plugin').default;
const ImageminMozjpeg = require('imagemin-mozjpeg');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const WorkboxWebpackPlugin = require('workbox-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  entry: {
    app: path.resolve(__dirname, 'src/scripts/index.js'),
    sw: path.resolve(__dirname, 'src/scripts/sw.js'),
  },
  output: {
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: 'all',
      minSize: 20000,
      maxSize: 70000,
      minChunks: 1,
      maxAsyncRequests: 30,
      maxInitialRequests: 30,
      automaticNameDelimiter: '~',
      enforceSizeThreshold: 50000,
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CleanWebpackPlugin(),

    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, 'src/templates/index.html'),
    }),

    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, 'src/public/'),
          to: path.resolve(__dirname, 'dist/'),
          globOptions: {
            ignore: ['**/heros/**'],
          },
        },
        {
          from: path.resolve(__dirname, 'src/public/heros/'),
          to: path.resolve(__dirname, 'dist/heros/'),
        },
      ],
    }),

    new ImageminWebpackPlugin({
      plugins: [
        ImageminMozjpeg({
          quality: 20,
          progressive: true,
        }),
      ],
      test: /\.jpe?g$/,
    }),

    new WorkboxWebpackPlugin.GenerateSW({
      swDest: './sw.bundle.js',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/list'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-api-dicoding-list',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/images/'),
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'restaurant-api-dicoding-images',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://restaurant-api.dicoding.dev/detail/'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'restaurant-api-dicoding-detail',
          },
        },
        {
          urlPattern: /^https:\/\/fonts\.gstatic\.com/,
          handler: 'StaleWhileRevalidate',
          options: {
            cacheName: 'google-fonts-webfonts',
          },
        },
        {
          urlPattern: ({ url }) => url.href.startsWith('https://kit.fontawesome.com/4d69af1ea6.js'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'fontawesome-kit',
          },
        },
      ],
    }),

    new BundleAnalyzerPlugin(),
  ],
};
