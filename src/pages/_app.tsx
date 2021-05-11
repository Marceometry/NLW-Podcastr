import { PlayerContextProvider } from "../contexts/PlayerContext"
import Router from 'next/router'
import Nprogress from 'nprogress'
import 'simplebar/dist/simplebar.min.css';
import 'nprogress/nprogress.css'
import '../css/global.css'

Nprogress.configure({
  showSpinner: false,
  trickleSpeed: 300
})

Router.events.on('routeChangeStart', () => {
  Nprogress.start()
})

Router.events.on('routeChangeComplete', () => {
  Nprogress.done()
})

Router.events.on('routeChangeError', () => {
  Nprogress.done()
})

function MyApp({ Component, pageProps }) {
  return (
    <PlayerContextProvider>
        <Component {...pageProps} />
    </PlayerContextProvider>
  ) 
}

export default MyApp