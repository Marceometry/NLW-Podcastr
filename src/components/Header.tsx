import format from 'date-fns/format'
import ptBR from 'date-fns/locale/pt-BR'

import css from '../css/components/Header.module.scss'
import { ThemeChanger } from './ThemeChanger'

export default function Header() {
    const currentDate = format(new Date(), 'EEEEEE, d MMMM', {
        locale: ptBR
    })

    return (
        <header className={css.header}>
            <img src="/logo.svg" alt="Podcastr"/>

            <p>O melhor para você ouvir, sempre.</p>

            <ThemeChanger />

            <span>{ currentDate }</span>
        </header>
    )
}