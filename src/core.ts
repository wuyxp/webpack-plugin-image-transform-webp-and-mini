
import fs from 'fs'
import path from 'path'
import { loadPathDirType, makeImage, makeAdapter, fileInfoInterface, optionsInterface, compilation, pathType } from './interface'
import utils from './utils'
import {successLog, errorLog} from './logger'
const sharp = require('sharp')
const { interpolateName } = require('loader-utils')


/**
 * 递归所有文件将所有的符合条件的文件进行调用
 * @param pathDir 递归目录
 * @param options 是否有排除或者引入
 * @param callback 将符合规则的进行回调
 */
const loadPathDir:loadPathDirType = (pathDir, options = {}, callback = () => {}) => {
  const files = fs.readdirSync(pathDir)
  // 遍历当前文件夹下的所有文件
  files.forEach((file: string) => {
    const newPathDir = path.resolve(__dirname, pathDir, file)
    fs.stat(newPathDir, (err: any, stats: any) => {
      if(err){
        console.log(err)
        return
      }
      if(stats.isDirectory()){
        // 还是目录继续递归
        this.loadPathDir(newPathDir, options, callback)
      } else {
        // 如果是文件
        const {exclude, include} = options
        const fileInfo = path.parse(newPathDir)
        // 如果只有排除，没有引入
        if(Array.isArray(exclude) && !include){
          if(exclude.indexOf(fileInfo.name) < 0){
            const fileContent = fs.readFileSync(newPathDir)
            callback( fileInfo, fileContent )
          }
        }
        // 如果只有引入，没有排除
        else if(Array.isArray(include) && !exclude){
          if(include.indexOf(fileInfo.name) > -1){
            const fileContent = fs.readFileSync(newPathDir)
            callback( fileInfo, fileContent )
          }
        }
        // 如果既有引入，又有排除
        else if(Array.isArray(include) && Array.isArray(exclude)){
          if(exclude.indexOf(fileInfo.name) < 0 && include.indexOf(fileInfo.name) > -1){
            const fileContent = fs.readFileSync(newPathDir)
            callback( fileInfo, fileContent )
          }
        }
        // 如果两个参数都没有
        else {
          const fileContent = fs.readFileSync(newPathDir)
          callback( fileInfo, fileContent )
        }
      }
    })
  })
}

/**
 * 将普通文件转换为webp格式进行存储到compiler对象上
 * @param compilation webpack构造对象
 * @param fileInfo 文件名称信息
 * @param fileContent 文件详细内容
 */
const makeWebp: makeImage = async (compilation, fileInfo, fileContent, options:any) => {
  const loaderContext = {
    resourcePath: fileInfo.dir + '/' + fileInfo.base
  }
  const str = interpolateName(loaderContext, options.name, {
    content: fileContent
  });
  if(options.webpOptions && utils.isFunction(options.webpOptions.src)){
    const src = options.webpOptions.src(str)
    try{
      const g = await sharp(fileContent).webp().toBuffer()
      if(options.logger){
        const oldSize = fileContent.length
        const newSize = g.length
        const change = (oldSize - newSize) / 1000
        successLog(`\n${change > 0 ? '-' : '+'} ${loaderContext.resourcePath}图片更改webp。${change > 0 ? '减少了' : '增加了'}  ${change} kib`)
      }
      compilation.assets[src] = {
        source: function() {
          return g;
        },
        size: function() {
          return g.length;
        }
      };
    } catch (e) {
      errorLog(`${loaderContext.resourcePath}更改webp格式失败`)
    }
  }
}

/**
 * 将普通文件转换进行压缩成小图存储到compiler对象上
 * @param compilation webpack构造对象
 * @param fileInfo 文件名称信息
 * @param fileContent 文件详细内容
 */
const makeMini: makeImage = async (compilation, fileInfo, fileContent, options:any) => {
  const loaderContext = {
    resourcePath: fileInfo.dir + '/' + fileInfo.base
  }
  const str = interpolateName(loaderContext, options.name, {
    content: fileContent
  });
  if(options.miniOptions && utils.isFunction(options.miniOptions.src)){
    const src = options.miniOptions.src(str)
    try{
      const g = await sharp(fileContent).resize(options.miniOptions.resize.width, options.miniOptions.resize.height).sharpen().toBuffer()
      if(options.logger){
        const oldSize = fileContent.length
        const newSize = g.length
        const change = (oldSize - newSize) / 1000
        successLog(`\n${change > 0 ? '-' : '+'} ${loaderContext.resourcePath}图片压缩mini图片。${change > 0 ? '减少了' : '增加了'}  ${change} kib`)
      }
      compilation.assets[src] = {
        source: function() {
          return g;
        },
        size: function() {
          return g.length;
        }
      };
    } catch (e) {
      console.log(e)
      errorLog(`${loaderContext.resourcePath}压缩mini图片失败`)
    }
  } 
}
/**
 * 生成需要格式的图片
 * @param compilation webpack构造对象 
 * @param path options配置path信息
 */
// function makeAdapterfun (compilation:compilation, options:optionsInterface):void {
function makeAdapterfun (compilation:compilation, options:any):void {
  const callback = (fileInfo: fileInfoInterface, fileContent: any) => {
    makeWebp(compilation, fileInfo, fileContent, options)
    makeMini(compilation, fileInfo, fileContent, options)
  }
  if(utils.isString(options.paths)){
    loadPathDir(options.paths, {}, callback)
  }

  else if(utils.isObject(options.paths)){
    const {dir, include, exclude} = options.paths
    loadPathDir(dir, {
      include,
      exclude
    }, callback)
  }

  else if(utils.isArray(options.paths)){
    options.paths.forEach((p:string) => {
      makeAdapterfun(compilation, p)
    })
  }
}

export default makeAdapterfun
