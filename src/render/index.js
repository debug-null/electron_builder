const { ipcRenderer } = require('electron');

var btn = document.querySelector("button");
btn.onclick = function(){
    console.log(ipcRenderer)
    update();
}

let ul = document.querySelector('ul');
let mesStr = '';


ipcRenderer.on('message', (event, {message, data})=>{

    console.log( message, data)
    if(message === "isUpdateNow"){
        if (confirm('存在新版本，是否现在更新？')) {
                ipcRenderer.send('updateNow');
            }
    }else{
        console.log( `<li>触发：${message}| 返回信息: ${JSON.stringify(data)}<li>`)
        mesStr+=`<li>触发：${message}| 返回信息: ${JSON.stringify(data)}<li>`;
        ul.innerHTML= mesStr;
    }
    
})

function update(){
    ipcRenderer.send('update');
}


const versionInfoBtn = document.getElementById('version')

const electronVersion = process.versions.electron
const message = `当前应用正在使用的 Electron 版本: ${electronVersion}`
versionInfoBtn.innerHTML = message
