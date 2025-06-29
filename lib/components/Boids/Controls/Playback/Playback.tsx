import { useBoidsContext } from "../../context";

function Playback({ className }: { className?: string }) {
    const { playing, setPlaying } = useBoidsContext();

    return (
        <button
            onClick={() => setPlaying(!playing)}
            className={`${className ?? ''}`}
        >
            {playing ? "Pause" : "Play"}
        </button>
    )
}

export { Playback }
