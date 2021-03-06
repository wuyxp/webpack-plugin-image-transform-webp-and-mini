import path from 'path'
import webpack from 'webpack'

import { optionsInterface } from './interface'
import makeAdapter from './core'

class webpackPluginImageTransformWebpAndMini {
  public options: optionsInterface
  constructor(options: optionsInterface){
    // 最后需要得到一个paths的文件目录
    const defaultOptions: optionsInterface = {
      /* vue.config.js 默认 */
      name: 'img/[name].[hash:8].[ext]',
      logger: false,
      webpOptions: {
        src: src => src.replace(/(?:\.\w+)(\?|$)/, '.webp$1')
      },
      miniOptions: {
        src: src => src.replace(/\.(\w+?)(\?[\s\S]+)?$/,'-min.$1$2'),
        resize: {
          width: 50
        }
      }
    }
    this.options = Object.assign({}, defaultOptions, options)
  }
  apply(compiler: webpack.Compiler){
    compiler.hooks.thisCompilation.tap('webpackPluginImageTransformWebpAndMini', compilation => {
      makeAdapter(compilation, this.options)
    })
  }
}
export default webpackPluginImageTransformWebpAndMini