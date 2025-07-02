import { useBoidsContext } from "../../context";

function Fps({ className }: { className?: string }) {
    const { fps, setFps } = useBoidsContext();

    return (
        <div className={`${className ?? ''}`}>
            <label htmlFor="fps">Show FPS</label>
            <input
                id="fps"
                type="checkbox"
                checked={fps}
                onChange={e => setFps(e.target.checked)}
            />
        </div>
    )
}

export { Fps }
