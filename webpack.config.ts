import path from 'path'
import webpack from 'webpack';
import fs from 'fs'
// FROM: http://jlongster.com/Backend-Apps-with-Webpack--Part-I#p28
const nodeModules = {};
fs.readdirSync('node_modules')
    .filter(item => ['.bin'].indexOf(item) === -1)  // exclude the .bin folder
    .forEach((mod) => {
        nodeModules[mod] = 'commonjs ' + mod;
    });
const config:webpack.Configuration = {
  mode: "production",
  entry: "./src/index.ts",
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js'
  },
  resolve: {
    extensions: ['.js', '.ts']
  },
  node: {
    fs: "empty",
    child_process: "empty"
  },
  externals: nodeModules,
  module: {
    rules: [{
      test: /\.ts$/,
      use: {
        loader: 'ts-loader',
        options: {
          context: __dirname,
          configFile: require.resolve('./tsconfig.json')
        }
      }
    }]
  }
}
module.exports = config