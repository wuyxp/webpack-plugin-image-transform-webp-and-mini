import * as path from 'path'
import * as webpack from 'webpack';
const config:webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [{
      test: /^\.ts$/,
      use: {
        loader: 'ts-loader'
      }
    }]
  }
}
module.exports = config