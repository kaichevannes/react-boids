import { useBoidsContext } from "../../context";

function CountLimiter({ className }: { className?: string }) {
    const { countLimited, setCountLimited } = useBoidsContext();

    return (
        <div className={`${className ?? ''}`}>
            <label htmlFor="countlimiter">Number of Boids Limiter</label>
            <input
                id="countlimiter"
                type="checkbox"
                checked={countLimited}
                onChange={e => setCountLimited(e.target.checked)}
            />
        </div>
    )
}

export { CountLimiter }
