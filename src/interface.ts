export type pathType = {
  dir: string
  include?: string[]
  exclude?: string[]
}
export interface optionsInterface {
  /**
   * 图片路径名称，要和url-loader或者file-loader的name规则保持一致
   */
  name: string 
  /**
   * 是否展示打印日志
   */
  logger: boolean 
  /**
   * 对于生成webp的路径配置，如果不需要生成webp那么设置为false
   */
  webpOptions: {
    src: (src: string) => string
  } | boolean
  /**
   * 对于生成小图的路径和大小配置，如果不需要生成小图，那么设置为false
   */
  miniOptions: {
    src: (src: string) => string
    resize: {
      width?: number
      height?: number
    }
  } | boolean
  /**
   * 必填：要对某一个目录下或者某一个图片进行转换
   * @param string 可以这是为单个路径字符串
   * @param Array 可以设置一组需要处理的图片路径
   * @param Object {dir, include, exclude} 可以配置为对象，dir为路径名称，include代表需要引入的文件名称，exclude代表需要排除的名称
   */
  paths: pathType | pathType[] | string
}

export interface fileInfoInterface {
  dir: String
  base: String
}

export type loadPathDirType = (
  pathDir: string,
  options?: {
    exclude?: string[],
    include?: string[]
  },
  callback?: (fileInfo: fileInfoInterface, fileContent: any) => void
) => void

export type makeImage = (
  compilation: {
    assets: any
  },
  fileInfo: fileInfoInterface,
  fileContent: {
    length: number
  },
  options: optionsInterface
) => void

export type makeAdapter = (
  compilation: {
    assets: any
  },
  path: any
) => void

export type compilation = {
  assets: any
}

export interface utilsInterface{
  isString: (p: any) => boolean
  isNumber: (p: any) => boolean
  isBoolean: (p: any) => boolean
  isSymbol: (p: any) => boolean
  isUndefined: (p: any) => boolean
  isNull: (p: any) => boolean
  isFunction: (p: any) => boolean
  isDate: (p: any) => boolean
  isArray: (p: any) => boolean
  isRegExp: (p: any) => boolean
  isObject: (p: any) => boolean
}