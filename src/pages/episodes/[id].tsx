import { GetStaticPaths, GetStaticProps } from "next"
import Head from "next/head"
import Link from 'next/link'
import Image from 'next/image'

import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'

import durationToTimeString from "../../utils/durationToTimeString"
import { usePlayer } from "../../contexts/PlayerContext"
import { api } from "../../utils/api"

import css from '../../css/episode.module.scss'

type EpisodeProps = {
    episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
    const { play } = usePlayer()
    
    return (
        <div className={css.container}>
        <Head>
          <title>{episode.title} | Podcastr</title>
        </Head>
        
        <div className={css.episode}>
            <div className={css.thumbnailContainer}>
                <Link href="/">
                    <button type="button">
                        <img src="/arrow-left.svg" alt="Voltar"/>
                    </button>
                </Link>

                <Image width={700} height={200} src={episode.thumbnail}
                alt="Capa do Episódio" objectFit="cover" />
                
                <button type="button" onClick={() => play(episode)}>
                    <img src="/play.svg" alt="Tocar Episódio"/>
                </button>
            </div>

            <header>
                <h1>{episode.title}</h1>
                <span>{episode.members}</span>
                <span>-</span>
                <span>{episode.publishedAt}</span>
                <span>-</span>
                <span>{episode.durationAsString}</span>
            </header>

            <section dangerouslySetInnerHTML={{ __html: episode.description }} />
        </div>
        </div>
    )
}

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  description: string
  duration: number;
  durationAsString: string
  url: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    const { data } = await api.get('/episodes', {
        params : {
          _sort: 'published_at',
          _order: 'desc'
        }
    })
    
    const paths = data.map((episode: Episode) => {
        return { params: { id: episode.id } }
    })

    return {
        paths, fallback: 'blocking'
    }
}

export const getStaticProps: GetStaticProps = async (ctx) => {
    const { id } = ctx.params

    const { data } = await api.get(`/episodes/${id}`)

    const episode = {
        id: data.id,
        title: data.title,
        thumbnail: data.thumbnail,
        members: data.members,
        publishedAt: format(parseISO(data.published_at), 'd MMM yy', { locale: ptBR }),
        description: data.description,
        duration: Number(data.file.duration),
        durationAsString: durationToTimeString(Number(data.file.duration)),
        url: data.file.url
    }

    return {
        props: { episode },
        revalidate: 60 * 60  * 24
    }
}