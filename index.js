const buttons = document.querySelectorAll('ul > li')

buttons.forEach( e => {
    e.onclick = event => {
        const src = event.target.dataset.src
        const iframe = document.querySelector('iframe')
        if(iframe.src !== src) iframe.src = src
        document.getElementById('menu-expand').click()
    }
})

const menuExpand = document.getElementById('menu-expand')

menuExpand.onclick = () => {
    const fundo = document.getElementById('fundo-invisivel')
    if(fundo.classList.contains('visible')){
        menu.classList.toggle('visible')
        setTimeout(() => {
            fundo.classList.toggle('visible')
        }, 550)

    }else{
        fundo.classList.toggle('visible')
        setTimeout(() => {
            menu.classList.toggle('visible')
        }, 100)
    }
}

window.onresize = () => {
    const container = document.getElementById('container')
    menu.style.left = container.offsetLeft + "px"
}

const menu = document.getElementById('menu')
menu.onmouseenter = () => window.onclick = null
menu.onmouseleave = () => {
    window.onclick = () =>{
        document.getElementById('menu-expand').click()
        window.onclick = null
    }
}