const { ipcRenderer } = require('electron')
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
    }else{
        document.body.style.padding = "5px"
    }

    require("./header-actions-renderer.js")
})