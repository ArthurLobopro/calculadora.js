const iframe = document.querySelector('iframe')
const nameDiv = document.getElementById('calculator-name')

const buttons = document.querySelectorAll('ul > li')
buttons.forEach( e => {
    e.onclick = event => {
        if(event.target.tagName === 'IMG') return
        const src = event.target.dataset.src
        
        if(iframe.src !== src) iframe.src = src
        document.getElementById('menu-expand').click()
        iframe.focus()
        
        nameDiv.innerText = String(event.target.textContent).trim()
        
    }
})

const menuExpand = document.querySelector('#container #menu-expand')
const menu = document.getElementById('menu')

let isLock = false

menuExpand.onclick = () => {
    if(isLock){ return null }

    isLock = true
    setTimeout(() => isLock = false, 1000);

    const fundo = document.getElementById('fundo-invisivel')
    if(fundo.classList.contains('visible')){
        menu.classList.toggle('visible')
        setTimeout(() => {
            fundo.classList.toggle('visible')
        }, 550)
        window.onclick = null
    }else{
        fundo.classList.toggle('visible')
        setTimeout(() => {
            menu.classList.toggle('visible')
            isLock = false
        }, 100)
        menu.onmouseenter = () => window.onclick = null
        menu.onmouseleave = () => {
            window.onclick = () =>{
                document.getElementById('menu-expand').click()
                window.onclick = null
            }
        }
    }
}

const toggleAlwaysOnTop_button = document.getElementById("toggleAlwaysOnTop")
const toggleAlwaysOnTop_image = toggleAlwaysOnTop_button.querySelector("img")
const toggleAlwaysOnTop = () => {
    const isAlwaysOnTop = ipcRenderer.sendSync("toggle-alwaysOnTop")
    toggleAlwaysOnTop_image.src = `./assets/alwaysOnTop-${isAlwaysOnTop}.svg`
}

toggleAlwaysOnTop_button.onclick = toggleAlwaysOnTop

window.onresize = () => {
    const container = document.getElementById('container')
    menu.style.left = container.offsetLeft + "px"
}

iframe.focus()