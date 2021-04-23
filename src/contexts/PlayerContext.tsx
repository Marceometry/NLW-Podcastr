import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string
    members: string
    thumbnail: string
    duration: number
    url: string
}

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    playNext: () => void
    togglePlay: () => void
    play: (episode: Episode) => void
    playPrevious: (AudioRef: HTMLAudioElement) => void
    setPlayingState: (state: boolean) => void
    playList: (list: Episode[], index: number) => void
}

export const PlayerContext = createContext({} as PlayerContextData)

type PlayerContextProviderProps = {
    children: ReactNode
}

export function PlayerContextProvider({ children }: PlayerContextProviderProps) {
    const [episodeList, setEpisodeList] = useState([])
    const [currentEpisodeIndex, setCurrentEpisodeIndex] = useState(0)
    const [isPlaying, setIsPlaying] = useState(false)

    function play(episode: Episode) {
      setEpisodeList([episode])
      setCurrentEpisodeIndex(0)
      setIsPlaying(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
    }

    function togglePlay() {
      setIsPlaying(!isPlaying)
    }

    function setPlayingState(state: boolean) {
      setIsPlaying(state)
    }

    function playNext() {
        if (currentEpisodeIndex < episodeList.length - 1) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        } else if (currentEpisodeIndex === episodeList.length - 1) {
            setCurrentEpisodeIndex(0)
        }
    }

    function playPrevious(AudioRef: HTMLAudioElement) {
        if (AudioRef.currentTime >= 5) {
            AudioRef.currentTime = 0
        } else {
            if (currentEpisodeIndex > 0) {
                setCurrentEpisodeIndex(currentEpisodeIndex - 1)
            } else if (currentEpisodeIndex === 0) {
                setCurrentEpisodeIndex(episodeList.length - 1)
            }
        }
    }

    return (
        <PlayerContext.Provider
            value={{
                episodeList,
                currentEpisodeIndex,
                play,
                playList,
                playNext,
                playPrevious,
                isPlaying,
                togglePlay,
                setPlayingState
            }}
        >

            {children}
        </PlayerContext.Provider>
    )   
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}