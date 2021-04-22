import css from '../css/components/Player.module.scss'

export default function Player() {
    return (
        <div className={css.player}>
            <header>
                <img src="/playing.svg" alt=""/>
                <strong>Tocando agora</strong>
            </header>

            <div className={css.emptyPlayer}>
                <strong>Selecione um podcast para ouvir</strong>
            </div>

            <footer className={css.empty}>
                <div className={css.progress}>
                    <span>00:00</span>

                    <div className={css.slider}>
                        <div className={css.emptySlider} />
                    </div>

                    <span>--:--</span>
                </div>

                <div className={css.buttons}>
                    <button type="button">
                        <img src="/shuffle.svg" alt="Aleatório"/>
                    </button>

                    <button type="button">
                        <img src="/play-previous.svg" alt="Tocar anterior"/>
                    </button>

                    <button type="button" className={css.playButton}>
                        <img src="/play-green.svg" alt="Tocar"/>
                    </button>
                    
                    <button type="button">
                        <img src="/play-next.svg" alt="Tocar próximo"/>
                    </button>
                    
                    <button type="button">
                        <img src="/repeat.svg" alt="Repetir"/>
                    </button>
                </div>
            </footer>
        </div>
    )
}