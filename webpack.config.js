const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require("terser-webpack-plugin");

const public = 'public';
const ASSETS_DIR = 'assets';

module.exports = function (env, argv) {
  const isProduction = argv.mode === 'production';
  return {
    entry: {
      main: './src/index.tsx',
    },
    output: {
      path: path.resolve( __dirname, 'dist'),
      filename: `${ASSETS_DIR}/js/[name].js`,
      publicPath: '/',
      assetModuleFilename: `${ASSETS_DIR}/resources/[name][ext]`,
    },
    devServer: {
      historyApiFallback: true,
      contentBase: path.join(__dirname, public),
      compress: true,
      port: 8080,
    },
    devtool: isProduction ? false : 'inline-source-map',
    module: {
      rules: [
        {
          test: /\.css$/i,
          use: [
            MiniCssExtractPlugin.loader,
            { loader:  'css-loader',
              options: {
                  modules: true,
              }
            },
            'postcss-loader', 'sass-loader'
          ],
        },
        {
          test: /\.html$/i,
          use: 'html-loader',
        },
        {
          test: /\.tsx?$/i,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.(png|svg|jpg|jpeg|gif|ico|woff|woff2|otf)$/,
          type: 'asset/resource',
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js', '.json'],
      alias: {
        '@': path.resolve(__dirname, 'src/'),
      },
    },
    optimization: {
      minimize: true,
      minimizer: [
        new CssMinimizerPlugin(),
        new TerserPlugin()
      ],
    },
    plugins: [
      new CleanWebpackPlugin(),
      new MiniCssExtractPlugin({
        filename: `${ASSETS_DIR}/css/[name].css`,
      }),
      new HtmlWebpackPlugin({
        inject: true,
        template: `${public}/index.html`,
      }),
    ],
  };
};
