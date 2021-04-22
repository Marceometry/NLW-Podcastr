import { useState } from "react";
import Header from "../components/Header";
import Player from "../components/Player";
import { PlayerContext } from "../contexts/PlayerContext";

import css from '../css/app.module.scss'
import "../css/global.scss"

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  durationAsString: string
  duration: number
  url: string
}

function MyApp({ Component, pageProps }) {
  const [episodeList, setEpisodeList] = useState([])
  const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
  const [isPlaying, setIsPlaying] = useState(false)

  function play(episode: Episode) {
    setEpisodeList([episode])
    setCurrentEpisodeIndex(0)
    setIsPlaying(true)
  }

  function togglePlay() {
    setIsPlaying(!isPlaying)
  }

  function setPlayingState(state: boolean) {
    setIsPlaying(state)
  }

  return (
    <div className={css.wrapper}>
      <PlayerContext.Provider value={{ episodeList, currentEpisodeIndex, play, isPlaying, togglePlay, setPlayingState }}>
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
