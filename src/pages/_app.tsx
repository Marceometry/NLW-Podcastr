import Header from "../components/Header";
import Player from "../components/Player";

import css from '../css/app.module.scss'
import "../css/global.scss"

function MyApp({ Component, pageProps }) {
  return (
    <div className={css.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </div>
  ) 
}

export default MyApp
