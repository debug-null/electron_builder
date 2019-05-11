### electron打包工具和热更新

##使用方法
*   安装模块  npm i
*   运行    npm start
*   打包    npm run dist  //正式打包，会依据build的配置来生成文件
            npm run pack // 一般用来快速测试使用，只有一个文件夹



## 测试更新的方法
*   打包，将打包后的文件放到你的服务器对应的目录下，也就是feedUrl这个变量
*   修改package.json的vesion，改下版本号，随你
*   继续打包
*   安装exe文件，打开软件，默认就会进行检测

## 目录结构
*   build 打包时用的一些文件
*   dist 打包后的存放目录 默认没有，打包后自动生成
*   src/main   主进程
*   src/render 子进程
*   dev-app-update.yml 测试环境下，测试更新时所用，可忽略
*   build-note.md 打包时的配置说明文件，只是用来参考而已

### 若是遇到错误，请参考下面的博客，我都写到这里了
[博客地址](http://www.weilai.info/rear_end/339.html)


