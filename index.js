const buttons = document.querySelectorAll('ul > li')
buttons.forEach( e => {
    e.onclick = event => {
        if(event.target.tagName === 'IMG') return
        const src = event.target.dataset.src
        const iframe = document.querySelector('iframe')
        if(iframe.src !== src) iframe.src = src
        document.getElementById('menu-expand').click()
    }
})

const menuExpand = document.querySelector('#container > #menu-expand')
const menu = document.getElementById('menu')

menuExpand.onclick = () => {
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

window.onresize = () => {
    const container = document.getElementById('container')
    menu.style.left = container.offsetLeft + "px"
}