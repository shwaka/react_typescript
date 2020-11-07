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
        test: /\.css/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: { url: false }
          }
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
