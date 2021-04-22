import { GetStaticPaths, GetStaticProps } from "next"
import { format, parseISO } from 'date-fns'
import ptBR from 'date-fns/locale/pt-BR'
import durationToTimeString from "../../utils/durationToTimeString"
import { api } from "../../utils/api"

type EpisodeProps = {
    episode: Episode
}

export default function Episode({ episode }: EpisodeProps) {
    return (
        <h1>{episode.title}</h1>
    )
}

type Episode = {
  id: string
  title: string
  thumbnail: string
  members: string
  publishedAt: string
  description: string
  durationAsString: string
  url: string
}

export const getStaticPaths: GetStaticPaths = async () => {
    return {
        paths: [],
        fallback: 'blocking'
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