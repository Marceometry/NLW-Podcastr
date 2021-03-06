import { GetStaticProps } from "next"
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import Header from "../components/Header"
import Player from "../components/Player"

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import SimpleBar from 'simplebar-react'

import durationToTimeString from "../utils/durationToTimeString"
import { usePlayer } from "../contexts/PlayerContext"
import { api } from "../utils/api"

import css from '../css/home.module.scss'
import app from '../css/app.module.scss'

type HomeProps = {
  latestEpisodes: Episode[]
  allEpisodes: Episode[]
}

export default function Home({ latestEpisodes, allEpisodes }: HomeProps) {
  const { playList } = usePlayer()

  const episodeList = [...latestEpisodes, ...allEpisodes]

  return (
    <div className={app.wrapper}>
      <main>
        <Header />

        <SimpleBar className={css.home} autoHide={false}>
          <Head>
            <title>Podcastr | Home</title>
          </Head>

          <section className={css.latestEpisodes}>
            <h2>Últimos lançamentos</h2>

            <ul>
              {latestEpisodes.map((episode, index) => {
                return (
                  <li key={episode.id}>
                    <Image width={160} height={160} src={episode.thumbnail} alt="Capa do Episódio" objectFit="cover" />

                    <div className={css.episodeDetails}>
                      <Link href={`/episodes/${episode.id}`}>
                        <a title={episode.title}>{episode.title}</a>
                      </Link>

                        <p>{episode.members}</p>
                        <span>{episode.publishedAt}</span>
                        <span>-</span>
                        <span>{episode.durationAsString}</span>
                    </div>

                    <button type="button" onClick={() => playList(episodeList, index)}>
                      <img src="/play-green.svg" alt="Tocar Episódio"/>
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>

          <section className={css.allEpisodes}>
            <h2>Todos os episódios</h2>

            <table cellSpacing={0}>
              <thead>
                <tr>
                  <th></th>
                  <th>PODCAST</th>
                  <th>INTEGRANTES</th>
                  <th>DATA</th>
                  <th>DURAÇÃO</th>
                </tr>
              </thead>

              <tbody>
                {allEpisodes.map((episode, index) => {
                  return (
                    <tr key={episode.id}>
                      <td>
                        <Image
                          width={192}
                          height={192}
                          src={episode.thumbnail}
                          alt="Capa do Episódio"
                          objectFit="cover"
                        />
                      </td>

                      <td>
                        <Link href={`/episodes/${episode.id}`}>
                        <a>{episode.title}</a>
                        </Link>
                      </td>

                      <td>{episode.members}</td>
                      <td>{episode.publishedAt}</td>
                      <td>{episode.durationAsString}</td>

                      <td>
                        <button type="button" onClick={() => playList(episodeList, index + 2)}>
                          <img src="/play-green.svg" alt="Tocar Episódio"/>
                        </button>
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </section>
        </SimpleBar>
      </main>
      
      <Player />
    </div>
  )
}

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  durationAsString: string
  
  duration: number
  url: string
}

type UntreatedEpisode = {
  id: string
  title: string
  thumbnail: string
  members: string
  published_at: string
  file: {
    duration: string
    url: string
  }
}

export const getStaticProps: GetStaticProps = async () => {
  const { data } = await api.get('/episodes/find', {
    params : {
      _sort: 'published_at',
      _order: 'desc'
    }
  })

  const episodes = data.map((episode: UntreatedEpisode) => {
    return {
      id: episode.id,
      title: episode.title,
      thumbnail: episode.thumbnail,
      members: episode.members,
      publishedAt: format(parseISO(episode.published_at), 'd MMM yy', { locale: ptBR }),
      duration: Number(episode.file.duration),
      durationAsString: durationToTimeString(Number(episode.file.duration)),
      url: episode.file.url
    }
  })

  const latestEpisodes = episodes.slice(0, 2)
  const allEpisodes = episodes.slice(2, episodes.length)

  return {
    props: {
      latestEpisodes,
      allEpisodes
    },
    revalidate: 60 * 60 * 8
  }
}