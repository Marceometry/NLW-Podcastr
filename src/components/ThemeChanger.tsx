// import { useSession } from "next-auth/client"
import { useEffect, useState } from "react"
// import { api } from "../services/api"
import css from '../css/components/themeChanger.module.css'

export function ThemeChanger() {
    // const [ session ] = useSession()
    const [ theme, setTheme ] = useState('light')


    // useEffect(() => {
    //     if (props.theme === 'dark' && root.getPropertyValue('--white') !== '#fff') {
    //         changeTheme()
    //     }
    // }, [])

    function changeTheme() {
        const root = document.documentElement.style

        if (theme === 'light') {
            // api.post(`/api/user/update/theme/${session.user.email}?theme=dark`)
            setTheme('dark')
            
            root.setProperty('--white', '#101010')
            root.setProperty('--gray-50', '#202020')
            root.setProperty('--gray-100', '#404040')
            root.setProperty('--gray-200', '#888888')
            root.setProperty('--gray-500', '#aaaaaa')
            root.setProperty('--gray-800', '#cccccc')
        } else if (theme === 'dark') {
            // api.post(`/api/user/update/theme/${session.user.email}?theme=light`)
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