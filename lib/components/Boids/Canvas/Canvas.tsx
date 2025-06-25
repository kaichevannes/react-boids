import {
    useRef,
    useState,
    useEffect,
} from 'react';

import styles from './styles.module.css';
import { useBoidsContext } from '../context';

function Canvas() {
    const { universe, memory, playing } = useBoidsContext();
    // Canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);
    const [canvasSize, setCanvasSize] = useState(500);

    // UI
    const playAnimationRef = useRef(playing);

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
        playAnimationRef.current = playing;
        if (playing) {
            requestAnimationFrame(render);
        }
    }, [playing]);

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
        const triangleSize = size / 100;
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

        // const start = performance.now();
        universe.tick();
        // const end = performance.now();
        // console.log(`Tick took ${end - start} milliseconds`);
        if (playAnimationRef.current) {
            requestAnimationFrame(render)
        }
    }

    return (
        <>
            <div className={styles.canvasWrapper}>
                <canvas className={styles.canvas} ref={canvasRef} />
            </div>
            <button onClick={() => {
                universe.tick();
                requestAnimationFrame(render);
            }}>Tick</button>
        </>
    )
}


export { Canvas }
