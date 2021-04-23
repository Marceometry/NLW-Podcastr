import { createContext, ReactNode, useContext, useState } from 'react'

type Episode = {
    title: string
    members: string
    thumbnail: string
    durationAsString: string
    duration: number
    url: string
}

type PlayerContextData = {
    episodeList: Episode[]
    currentEpisodeIndex: number
    isPlaying: boolean
    isLooping: boolean
    isShuffling: boolean
    onlyOne: boolean
    playNext: () => void
    togglePlay: () => void
    toggleLoop: () => void
    toggleShuffle: () => void
    play: (episode: Episode) => void
    playPrevious: (audioRef: HTMLAudioElement) => void
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
    const [isLooping, setIsLooping] = useState(false)
    const [isShuffling, setIsShuffling] = useState(false)
    const [onlyOne, setOnlyOne] = useState(false)

    function play(episode: Episode) {
        setEpisodeList([episode])
        setCurrentEpisodeIndex(0)
        setIsPlaying(true)
        setOnlyOne(true)
    }

    function playList(list: Episode[], index: number) {
        setEpisodeList(list)
        setCurrentEpisodeIndex(index)
        setIsPlaying(true)
        setOnlyOne(false)
    }

    function togglePlay() {
        setIsPlaying(!isPlaying)
    }

    function toggleLoop() {
        setIsLooping(!isLooping)
    }

    function toggleShuffle() {
        setIsShuffling(!isShuffling)
    }

    function setPlayingState(state: boolean) {
        setIsPlaying(state)
    }

    function playNext() {
        if (isShuffling) {
            const nextRandomEpisodeIndex = Math.floor(Math.random() * episodeList.length)
            setCurrentEpisodeIndex(nextRandomEpisodeIndex)
        } else if (currentEpisodeIndex < episodeList.length - 1) {
            setCurrentEpisodeIndex(currentEpisodeIndex + 1)
        } else if (currentEpisodeIndex === episodeList.length - 1) {
            setCurrentEpisodeIndex(0)
        }
    }

    function playPrevious(audioRef: HTMLAudioElement) {
        if (audioRef.currentTime >= 5) {
            audioRef.currentTime = 0
        } else if (!onlyOne) {
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
                isLooping,
                isShuffling,
                togglePlay,
                toggleLoop,
                toggleShuffle,
                setPlayingState,
                onlyOne
            }}
        >

            {children}
        </PlayerContext.Provider>
    )   
}

export const usePlayer = () => {
    return useContext(PlayerContext)
}