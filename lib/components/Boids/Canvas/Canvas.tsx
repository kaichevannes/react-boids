import {
    useRef,
    useState,
    useEffect,
    useId,
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';

import styles from './styles.module.css';
import { useBoidsContext } from '../context';

function Canvas() {
    const { universe, memory, boidCount: defaultBoidCount } = useBoidsContext();
    // Canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvasSize, setCanvasSize] = useState(500);

    // UI
    const [playAnimation, setPlayAnimation] = useState(true);
    const playAnimationRef = useRef(playAnimation);
    const [boidCount, setBoidCount] = useState(defaultBoidCount);

    function render() {
        if (!canvasRef.current) {
            return;
        }

        const FLOATS_PER_BOID = 6;
        const boidsPtr = universe.get_boids_pointer();
        const data = new Float32Array(memory.buffer, boidsPtr, universe.get_number_of_boids() * FLOATS_PER_BOID);
        let boids = [];
        for (let i = 0; i < universe.get_number_of_boids(); i++) {
            const offset = i * FLOATS_PER_BOID;

            const boid = {
                x: data[offset],
                y: data[offset + 1],
                vx: data[offset + 2],
                vy: data[offset + 3],
            };

            boids.push(boid);
        }

        const size = canvasSize;
        const ctx = canvasRef.current.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, size, size);
        ctx.fillStyle = "black";
        const universeSize = universe.get_size();
        const triangleSize = universeSize / 15;
        boids.forEach((b) => {
            let x = (b.x / universeSize) * size;
            let y = (b.y / universeSize) * size;
            const angle = Math.atan2(b.vy, b.vx);

            ctx.setTransform(
                Math.cos(angle),
                Math.sin(angle),
                -Math.sin(angle),
                Math.cos(angle),
                x,
                y,
            )

            ctx.beginPath();
            ctx.moveTo(triangleSize, 0);
            ctx.lineTo(-triangleSize, triangleSize);
            ctx.lineTo(-triangleSize, -triangleSize);
            ctx.closePath();
            ctx.fill();

        });
        ctx.setTransform(1, 0, 0, 1, 0, 0);

        universe.tick();
        if (playAnimationRef.current) {
            requestAnimationFrame(render)
        }
    }

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const observer = new ResizeObserver(() => {
            setCanvasSize(canvas.clientWidth);
        });
        observer.observe(canvas);

        canvas.width = canvasSize;
        canvas.height = canvasSize;

        requestAnimationFrame(render)
    }, []);

    useEffect(() => {
        universe.set_number_of_boids(boidCount);
    }, [boidCount])

    useEffect(() => {
        playAnimationRef.current = playAnimation;
        if (playAnimation) {
            requestAnimationFrame(render);
        }
    }, [playAnimation]);

    return (
        <div className={styles.canvasWrapper}>
            <canvas className={styles.canvas} ref={canvasRef} />
            <button onClick={() => setPlayAnimation(!playAnimation)}>{playAnimation ? "Pause" : "Play"}</button>
            <LogSliderGroup name="Number of Boids" state={boidCount} setState={setBoidCount} min={1} max={1000} />
        </div>
    )
}

const LogSliderGroup = ({ name, state, setState, min, max }:
    { name: string, state: number, setState: Dispatch<SetStateAction<number>>, min: number, max: number }
) => {
    const id = useId();

    const logMin = Math.log(min);
    const logMax = Math.log(max);
    return (
        <div className={styles.SliderGroup}>
            <div className={styles.SliderGroupLabelWrapper}>
                <label htmlFor={id}>{name}</label>
                <span>{state}</span>
            </div>
            <Slider.Root
                id={id}
                className={styles.SliderRoot}
                value={[(Math.log(state) - logMin) / (logMax - logMin)]}
                onValueChange={([value]) => {
                    setState(Math.round(Math.exp(logMin + value * (logMax - logMin))));
                }}
                min={0}
                max={1}
                step={0.01}
            >
                <Slider.Track className={styles.SliderTrack}>
                    <Slider.Range className={styles.SliderRange} />
                </Slider.Track>
                <Slider.Thumb className={styles.SliderThumb} />
            </Slider.Root>
        </div>
    )
};

export { Canvas }
