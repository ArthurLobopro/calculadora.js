const menuScreens = Array.from(document.querySelectorAll(".screen-wrapper > .screen"))
const menuButtons = document.querySelectorAll(".menu > button")

menuButtons.forEach( button => {
    button.onclick = () => {
        const focusedScreen = menuScreens.find( screen => screen.classList.contains("visible"))
        focusedScreen.classList.remove("visible")
        const newFocusedScreen = menuScreens.find( screen => screen.id === button.dataset.menu)
        newFocusedScreen.classList.toggle("visible")
        menuButtons.forEach( button => button.classList.remove("selected"))
        button.classList.add("selected")
    }
})