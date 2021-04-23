import { useEffect, useRef, useState } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import Image from "next/image";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import css from "../css/components/Player.module.scss";
import durationToTimeString from "../utils/durationToTimeString";

export default function Player() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const [progress, setProgress] = useState(0)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    isLooping,
    isShuffling,
    togglePlay,
    toggleLoop,
    toggleShuffle,
    setPlayingState,
    playNext,
    playPrevious,
    onlyOne
  } = usePlayer();

  useEffect(() => {
    if (!audioRef.current) {
      return
    }

    if (isPlaying) {
      audioRef.current.play()
    } else {
      audioRef.current.pause()
    }
  }, [isPlaying])

  function setupProgressListener() {
    audioRef.current.currentTime = 0

    audioRef.current.addEventListener('timeupdate', () => {
      setProgress(Math.floor(audioRef.current.currentTime))
    })
  }

  function handleSeek(amount: number) {
    audioRef.current.currentTime = amount
    setProgress(amount)
  }

  const episode = episodeList[currentEpisodeIndex];

  return (
    <div className={css.player}>
      <header>
        <img src="/playing.svg" alt="" />
        <strong>Tocando agora</strong>
      </header>

      {episode ? (
        <div className={css.currentThumbnail}>
          <Image
            width={592}
            height={592}
            src={episode.thumbnail}
            alt="Capa do Episódio"
            objectFit="cover"
          />

          <strong>{episode.title}</strong>
          <span>{episode.members}</span>
        </div>
      ) : (
        <div className={css.emptyThumbnail}>
          <strong>Selecione um podcast para ouvir</strong>
        </div>
      )}

      <footer className={!episode && css.empty}>
        <div className={css.progress}>
          <span>{durationToTimeString(progress)}</span>

          <div className={css.slider}>
            {episode ? (
              <Slider
                max={episode.duration}
                value={progress}
                onChange={handleSeek}
                trackStyle={{ backgroundColor: "#04d361" }}
                railStyle={{ backgroundColor: "#9f75ff" }}
                handleStyle={{
                  backgroundColor: "#04d361",
                  borderColor: "#04d361",
                }}
              />
            ) : (
              <div className={css.emptySlider} />
            )}
          </div>

          <span>{episode?.durationAsString ?? '--:--:--'}</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={audioRef}
            loop={isLooping}
            onLoadedMetadata={setupProgressListener}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            onEnded={playNext}
            autoPlay />
        )}

        <div className={css.buttons}>
          <button type="button" disabled={!episode || onlyOne} onClick={toggleShuffle} className={isShuffling ? css.isActive : ''}>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>

          <button type="button" disabled={!episode} onClick={() => playPrevious(audioRef.current)}>
            <img src="/play-previous.svg" alt="Tocar anterior" />
          </button>

          <button
            type="button"
            disabled={!episode}
            className={css.playButton}
            onClick={togglePlay}
          >
            {isPlaying ? (
              <img src="/pause.svg" alt="Pausar" />
            ) : (
              <img src="/play.svg" alt="Tocar" />
            )}
          </button>

          <button type="button" disabled={!episode || onlyOne} onClick={playNext}>
            <img src="/play-next.svg" alt="Tocar próximo" />
          </button>

          <button type="button" disabled={!episode} onClick={toggleLoop} className={isLooping ? css.isActive : ''}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
