import { loadCSS } from "./loadCSS"


export const loadThemes = () => {
    let themes = ['font'];

    themes.forEach(x => {
        loadCSS(`/${x}.css`)
        console.log(`%c[ThemeManager] %cLoaded ${x}.css`, 'color: #3e82e5;', 'color: inherit;')
    })

}