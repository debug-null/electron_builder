const { ipcRenderer } = require('electron');

var btn = document.querySelector("button");
btn.onclick = function(){
    console.log(ipcRenderer)
    update();
}

let ul = document.querySelector('ul');
let mesStr = '';

ipcRenderer.on('upload', (event, {message, data})=>{
    alert(data)
})
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