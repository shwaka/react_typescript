require('@babel/register');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const dist = `${__dirname}/dist`

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: dist,
    filename: "main.js",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader'
      },
      {
        test: /\.(sa|sc|c)ss/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      }
    ]
  },
  resolve: {
    extensions: [ '.ts', '.tsx', '.js', '.json' ]
  },
  target: ['web', 'es5'],
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html'
    })
  ],
  devServer: {
    contentBase: dist,
    watchContentBase: true,
    inline: true,
    hot: true
    /* publicPath: '/',
     * inline: true */
  }
};
