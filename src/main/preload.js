const { ipcRenderer, contextBridge } = require('electron')
const { insertFrame } = require('electron-frame/renderer')

contextBridge.exposeInMainWorld('require', require)

document.addEventListener("DOMContentLoaded", ()=> {
    const isMain = location.href.search('index.html') !== -1

    if(isMain){
        const imageLinks = document.querySelectorAll('ul > li > img')
        imageLinks.forEach( i => {
            i.onclick = event =>{
                const href = event.target.dataset.href

                ipcRenderer.send('new-window',href)

            }
        })
    }else if(process.isMainFrame){
        document.body.style.padding = "5px"
    }

    if(process.isMainFrame){
        insertFrame()
    }    
})