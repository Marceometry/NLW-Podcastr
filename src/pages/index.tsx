import Head from 'next/head'
import Link from 'next/link'

import css from '../css/landing.module.scss'


export default function Home() {
  
  return (
    <div className={css.container}>
      <Head>
        <title>Podcastr | Ouça agora mesmo</title>
      </Head>

      <section>
        <img src="/logo-light.svg" alt="Podcastr"/>
        <p>Ouça todos os episódios do Faladev, o podcast da Rocketseat, onde e quando quiser.</p>
        <Link href="/home">
          <button>
            Ouvir agora
          </button>
        </Link>
      </section>

      <img src="/woman-listening-playlist.svg" alt="Ilustração" />
    </div>
  )
}