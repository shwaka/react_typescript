import HtmlWebpackPlugin from 'html-webpack-plugin';

module.exports = {
  mode: 'development',
  entry: './src/main.tsx',
  output: {
    path: `${__dirname}/dist`,
    filename: "main.js"
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
  ]
};
