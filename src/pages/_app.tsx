import { useState } from "react";
import Header from "../components/Header";
import Player from "../components/Player";
import { PlayerContext } from "../contexts/PlayerContext";

import css from '../css/app.module.scss'
import "../css/global.scss"

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)

  function play(episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
  }

  return (
    <div className={css.wrapper}>
      <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play}}>
        <main>
          <Header />
          <Component {...pageProps} />
        </main>

        <Player />
      </PlayerContext.Provider>
    </div>
  ) 
}

export default MyApp
