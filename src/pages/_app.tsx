import Header from "../components/Header";
import Player from "../components/Player";
import { PlayerContextProvider } from "../contexts/PlayerContext";

import css from '../css/app.module.scss'
import "../css/global.scss"

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
    <div className={css.wrapper}>
      <main>
        <Header />
        <Component {...pageProps} />
      </main>

      <Player />
    </div>
    </PlayerContextProvider>
  ) 
}

export default MyApp
