import Header from "../components/Header"
import Player from "../components/Player"
import { PlayerContextProvider } from "../contexts/PlayerContext"

import "../css/global.css"

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
        <Component {...pageProps} />
    </PlayerContextProvider>
  ) 
}

export default MyApp