
const {electron,ipcMain,BrowserWindow} = require('electron'); 
const { autoUpdater } = require('electron-updater');

const feedUrl = `http://127.0.0.1:/electron`; //版本存放的服务器
const Menu  = require('electron').Menu;


// 保持一个对于 window 对象的全局引用，不然，当 JavaScript 被 GC，
// window 会被自动地关闭
var mainWindow = null;
var webContents;

let createWindow = (filePath)=>{
    // 创建浏览器窗口。
    mainWindow = new BrowserWindow({width: 800, height: 600});
 
    webContents = mainWindow.webContents;
 
    // 加载应用的 index.html
    mainWindow.loadURL(filePath);
    
    // 打开开发工具
    mainWindow.openDevTools();
    //菜单配置
    const template = [
     {
       role: 'help',
       submenu: [
         {
           label: '作者信息',
           click () { require('electron').shell.openExternal('http://www.weilai.info') }
         },
         {
           label: '检查更新',
           click () { 
             menuUpdate()
            }
         }
       ]
     }
   ]
 
   
   const menu = Menu.buildFromTemplate(template)
   Menu.setApplicationMenu(menu);

   //每次加载后检查一次版本
   menuUpdate()
   
    // 当 window 被关闭，这个事件会被发出
    mainWindow.on('closed', function() {
      // 取消引用 window 对象，如果你的应用支持多窗口的话，
      // 通常会把多个 window 对象存放在一个数组里面，
      // 但这次不是。
      mainWindow = null;
    });
 
     // 主进程监听渲染进程传来的信息
   ipcMain.on('update', (e, arg) => {
     checkForUpdates();
   });
   

   mainWindow.on('close', () => {
        //回收BrowserWindow对象  
        mainWindow = null;
    });
    //缩放窗口后，刷新页面
    mainWindow.on('resize', () => {
        // mainWindow.reload();
    })

 }
 
    //发送消息
    let sendUpdateMessage = (message, data) => {
        webContents.send('message', { message, data });
    };
    
 
 //更新流程的生命周期
    let checkForUpdates = () => {
    
    let message = {
        error: '检查更新出错',
        checking: '正在检查更新……',
        updateAva: '检测到新版本，正在下载……',
        updateNotAva: '现在使用的就是最新版本，不用更新',
        downloadProgress: '下载进度'
    };
    
    
    autoUpdater.setFeedURL(feedUrl);
    
    autoUpdater.on('error', function (message) {
        sendUpdateMessage('error', message)
    });
    //检查更新
    autoUpdater.on('checking-for-update', function (res) {
        sendUpdateMessage('checking', message.checking + res)
    });
    
    // 事件：update-available有版本更新
    autoUpdater.on('update-available', function (res) {
        sendUpdateMessage('updateAva', message.updateAva + res)
    });
    // 事件：update-not-available未发现更新版本
    autoUpdater.on('update-not-available', function (res) {
        sendUpdateMessage('updateNotAva' ,message.updateNotAva + res)
    });
    
    // 更新下载进度事件
    // 事件：download-progress直接将更新下载至C盘缓存
    autoUpdater.on('download-progress', function (progressObj) {
        sendUpdateMessage('downloadProgress', message.downloadProgress + progressObj)
    })
    // 事件：updated-downloaded更新资源下载完毕
    autoUpdater.on('update-downloaded', function (event, releaseNotes, releaseName, releaseDate, updateUrl, quitAndUpdate) {
        ipcMain.on('updateNow', (e, arg) => {
            //some code here to handle event
            autoUpdater.quitAndInstall();
        })
        sendUpdateMessage('isUpdateNow');
    });
    
    //执行自动更新检查
    autoUpdater.checkForUpdates();
    };
    
    
    // 菜单栏检查更新和默认打开检查更新
    function menuUpdate(){
        checkForUpdates();
    }

 module.exports = createWindow;