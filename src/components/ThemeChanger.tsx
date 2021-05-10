import { useState } from "react"
import css from '../css/components/themeChanger.module.css'

export function ThemeChanger() {
    const [ theme, setTheme ] = useState('light')

    function changeTheme() {
        const root = document.documentElement.style

        if (theme === 'light') {
            setTheme('dark')
            root.setProperty('--white', '#101010')
            root.setProperty('--gray-50', '#202020')
            root.setProperty('--gray-100', '#404040')
            root.setProperty('--gray-200', '#888888')
            root.setProperty('--gray-500', '#aaaaaa')
            root.setProperty('--gray-800', '#cccccc')
        } else if (theme === 'dark') {
            setTheme('light')
            root.setProperty('--white', '#fff')
            root.setProperty('--gray-50', '#F7F8FA')
            root.setProperty('--gray-100', '#E6E8EB')
            root.setProperty('--gray-200', '#AFB2B1')
            root.setProperty('--gray-500', '#808080')
            root.setProperty('--gray-800', '#494D4B')
        }
    }

    return (
        <button className={css.themeChanger} onClick={changeTheme}>
            <span>{theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}</span>
        </button>
    )
}