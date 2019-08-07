# webpack-plugin-image-transform-webp-and-mini
webpack插件 用于将指定目录下的图片，转换为webp格式和一张压缩后的图片
## 功能
本插件提供了，根据用户传入进去的路径，对图片进行压缩mini和webp格式的图片，配合懒加载的组件功能使用
比如
```
<LazyBackground
  class="test"
  :src = "require('./images/logo.jpg')"
>
  测试地址11123
</LazyBackground>
```
上面的组件是另外一个功能，提供了该组件在加载这个图片的时候，首先会加载小图，然后根据判断浏览器是否支持webp从而加载对应的图片。
组件的详情地址是：

https://www.npmjs.com/package/vue-lazy-background-component

这个插件就是为了解决自动化生成小图和webp而制作的。
对于这两个插件如有任何疑问 欢迎提一些issue 我的QQ：956826374

## 使用
在webpack中引入中使用
```
npm install webpack-plugin-image-transform-webp-and-mini --save-dev

或者

syarn add @belllabs/webpack-plugin-image-transform-webp-and-mini -D


const webpackPluginImageTransformWebpAndMini = require('webpack-plugin-image-transform-webp-and-mini')
...
{
  ...
  plugins: [
    new webpackPluginImageTransformWebpAndMini({
      name: '[name]-[hash:8].[ext]',
      logger: true,
      webpOptions: {
        src: src => src.replace(/(?:\.\w+)(\?|$)/, '.webp$1')
      },
      miniOptions: {
        src: src => src.replace(/\.(\w+?)(\?[\s\S]+)?$/,'-min.$1$2'),
        resize: {
          width: 100
        }
      },
      paths: {
        dir: path.resolve(__dirname, './src/assets'),
        include: ['bg']
      }
    })
  ]
}

```

## 参数说明
```
- name 必填项，主要和图片的file-loader或者url-loader采用的规则一样
- paths 必填项，会根据用户所填的路径进行转换（可递归）
  - 字符串：只是将此路径下的图片进行转换
  - 对象：
    {
      dir: 路径
      include: 字符串数组，只是在该路径下指定的文件进行转换
      exclude: 字符串数组，只是在该路径下除去指定的文件进行转换
    }
- logger 是否打印日志，默认是false
- webpOptions，对生成的webp的路径进行配置，接受一个函数，参数是图片名称，需要返回一个字符串作为图片的名称。默认只是将图片的后缀修改为wepb
  {
    src: src => src
  }
- miniOptions，对生成的小图进行配置，
  {
    src: src => src     // 和上面的功能一样，默认把图片的名称后面加入-min后缀
    resize: {   // 要压缩的图片大小，如果只写一个，那么默认进行比例，默认width为100
      width: xxx
      height: xxx
    }
  }
```
