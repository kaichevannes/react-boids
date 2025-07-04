import {
    useRef,
    useEffect,
} from 'react';

import styles from './styles.module.css';
import { useBoidsContext } from '../context';

function Canvas({ className, width = 500, height = 500 }: { className?: string, width?: number, height?: number }) {
    const { universe, memory, playing, fps } = useBoidsContext();
    // Canvas
    const canvasRef = useRef<HTMLCanvasElement | null>(null);

    // Refs to keep up to date inside canvas render
    const playAnimationRef = useRef(playing);
    const universeRef = useRef(universe);
    const fpsRef = useRef(fps);

    useEffect(() => {
        console.log(fps);
        fpsRef.current = fps;
    }, [fps])

    useEffect(() => {
        universeRef.current = universe;
    }, [universe])

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        canvas.width = width;
        canvas.height = height;

        requestAnimationFrame(render)
    }, []);

    useEffect(() => {
        playAnimationRef.current = playing;
        if (playing) {
            requestAnimationFrame(render);
        }
    }, [playing]);

    // const TARGET_FPS = 60;
    const TARGET_FPS = 1000;
    const FRAME_INTERVAL = 1000 / TARGET_FPS;

    let lastFrameTime = performance.now();

    function render(timestamp: number) {
        if (!canvasRef.current) {
            return;
        }

        const delta = timestamp - lastFrameTime;
        if (delta < FRAME_INTERVAL) {
            if (playAnimationRef) {
                requestAnimationFrame(render);
            }
            return;
        }

        lastFrameTime = performance.now();

        const FLOATS_PER_BOID = 6;
        const boidsPtr = universeRef.current.get_boids_pointer();
        const data = new Float32Array(memory.buffer, boidsPtr, universeRef.current.get_number_of_boids() * FLOATS_PER_BOID);
        let boids = [];
        for (let i = 0; i < universeRef.current.get_number_of_boids(); i++) {
            const offset = i * FLOATS_PER_BOID;

            const boid = {
                x: data[offset],
                y: data[offset + 1],
                vx: data[offset + 2],
                vy: data[offset + 3],
            };

            boids.push(boid);
        }

        const width = canvasRef.current.width;
        const height = canvasRef.current.height;
        const ctx = canvasRef.current.getContext("2d");

        if (!ctx) {
            return;
        }

        ctx.clearRect(0, 0, width, height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-background').trim();
        ctx.fillRect(0, 0, width, height);
        ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-text').trim();
        const universeSize = universeRef.current.get_size();
        const triangleSize = width / 100;
        boids.forEach((b) => {
            let x = (b.x / universeSize) * width;
            let y = (b.y / universeSize) * height;
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

        if (fpsRef.current === true) {
            const instantaneous_fps = 1000 / delta;
            ctx.fillStyle = getComputedStyle(document.documentElement).getPropertyValue('--color-primary').trim();
            ctx.font = "20px monospace";
            ctx.fillText(`FPS: ${Math.trunc(instantaneous_fps)}`, width - 94, 20);
        }

        // const start = performance.now();
        universeRef.current.tick();
        // const end = performance.now();
        // console.log(`Tick took ${end - start} milliseconds`);
        if (playAnimationRef.current) {
            requestAnimationFrame(render)
        }
    }

    return (
        <canvas className={`${styles.canvas} ${className ?? ''}`} ref={canvasRef} />
    )
}


export { Canvas }
