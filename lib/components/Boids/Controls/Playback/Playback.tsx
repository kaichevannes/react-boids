import { useBoidsContext } from "../../context";

function Playback({ className, ...props }: { className?: string }) {
    const { playing, setPlaying } = useBoidsContext();

    return (
        <button
            {...props}
            onClick={() => setPlaying(!playing)}
            className={`${className ?? ''}`}
        >
            {playing ? "Pause" : "Play"}
        </button>
    )
}

export { Playback }
