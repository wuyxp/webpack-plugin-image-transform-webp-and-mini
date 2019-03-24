import path from 'path'
import webpack from 'webpack'

import { optionsInterface } from './interface'
import makeAdapter from './core'

class webpackPluginImageTransformWebpAndMini {
  public options: optionsInterface
  constructor(options: optionsInterface){
    // 最后需要得到一个paths的文件目录
    const defaultOptions: optionsInterface = {
      logger: false,
      webpOptions: {
        src: src => src.replace(/(?:\.\w+)(\?|$)/, '.webp$1')
      },
      miniOptions: {
        src: src => src.replace(/\.(\w+?)(\?[\s\S]+)?$/,'-min.$1$2'),
        resize: {
          width: 100
        }
      }
    }
    this.options = Object.assign({}, defaultOptions, options)
  }
  apply(compiler: webpack.Compiler){
    compiler.hooks.compilation.tap('webpackPluginImageTransformWebpAndMini', compilation => {
      makeAdapter(compilation, this.options)
    })
  }
}
export default webpackPluginImageTransformWebpAndMini