import { useBoidsContext } from "../../context";

function Playback() {
    const { playing, setPlaying } = useBoidsContext();

    return (
        <button onClick={() => setPlaying(!playing)}>{playing ? "Pause" : "Play"}</button>
    )
}

export { Playback }
