import { useEffect, useRef } from "react";
import { usePlayer } from "../contexts/PlayerContext";
import Image from "next/image";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";

import css from "../css/components/Player.module.scss";

export default function Player() {
  const AudioRef = useRef<HTMLAudioElement>(null)

  const {
    episodeList,
    currentEpisodeIndex,
    isPlaying,
    togglePlay,
    setPlayingState,
    playNext,
    playPrevious
  } = usePlayer();

  useEffect(() => {
    if (!AudioRef.current) {
      return
    }

    if (isPlaying) {
      AudioRef.current.play()
    } else {
      AudioRef.current.pause()
    }
  }, [isPlaying])

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
          <span>00:00</span>

          <div className={css.slider}>
            {episode ? (
              <Slider
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

          <span>--:--</span>
        </div>

        {episode && (
          <audio
            src={episode.url}
            ref={AudioRef}
            onPlay={() => setPlayingState(true)}
            onPause={() => setPlayingState(false)}
            autoPlay />
        )}

        <div className={css.buttons}>
          <button type="button" disabled={!episode}>
            <img src="/shuffle.svg" alt="Aleatório" />
          </button>

          <button type="button" disabled={!episode} onClick={() => playPrevious(AudioRef.current)}>
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

          <button type="button" disabled={!episode} onClick={playNext}>
            <img src="/play-next.svg" alt="Tocar próximo" />
          </button>

          <button type="button" disabled={!episode}>
            <img src="/repeat.svg" alt="Repetir" />
          </button>
        </div>
      </footer>
    </div>
  );
}
