const electron = require('electron'); 
const app = electron.app; 
var createWindow = require(__dirname + '/src/main/index'); 


var filePath = __dirname + '/src/index.html';

// 当 Electron 完成了初始化并且准备创建浏览器窗口的时候
// 这个方法就被调用
app.on('ready', () => {
  createWindow(filePath);
});


// 当所有窗口被关闭了，退出。
app.on('window-all-closed', function() {
  // 在 OS X 上，通常用户在明确地按下 Cmd + Q 之前
  // 应用会保持活动状态
  if (process.platform != 'darwin') {
    app.quit();
  }
});

app.on('activate', () => {
  if (win == null) {
      createWindow(filePath);
  }
}) 
