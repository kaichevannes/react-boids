import styles from './styles.module.css'
import React from 'react'
import { Slider } from 'radix-ui';

import init, { initThreadPool, init_panic_hook, Universe, Builder, Preset } from '@kaichevannes/wasm-boids'


export function Boids() {
    // Initialisation refs
    const wasmInitialised = React.useRef(false);
    const universe = React.useRef<Universe | null>(null);
    const memory = React.useRef<WebAssembly.Memory | null>(null);

    // Canvas
    const canvasRef = React.useRef<HTMLCanvasElement | null>(null);
    const [canvasSize, setCanvasSize] = React.useState(500);

    // UI
    const [playAnimation, setPlayAnimation] = React.useState(true);
    const playAnimationRef = React.useRef(playAnimation);
    const [boidCount, setBoidCount] = React.useState(0);

    function render() {
        if (!memory.current || !universe.current || !canvasRef.current) {
            return;
        }

        const FLOATS_PER_BOID = 6;
        const boidsPtr = universe.current.get_boids_pointer();
        const data = new Float32Array(memory.current.buffer, boidsPtr, universe.current.get_number_of_boids() * FLOATS_PER_BOID);
        let boids = [];
        for (let i = 0; i < universe.current.get_number_of_boids(); i++) {
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
        const universeSize = universe.current.get_size();
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

        universe.current.tick();
        if (playAnimationRef.current) {
            requestAnimationFrame(render)
        }
    }

    React.useEffect(() => {
        universe.current?.set_number_of_boids(boidCount);
    }, [boidCount])

    React.useEffect(() => {
        playAnimationRef.current = playAnimation;
        if (playAnimation) {
            requestAnimationFrame(render);
        }
    }, [playAnimation]);

    React.useEffect(() => {
        if (wasmInitialised.current) {
            console.log("returning");
            return;
        }
        wasmInitialised.current = true;

        (async () => {
            let wasm = await init();
            memory.current = wasm.memory;
            await initThreadPool(navigator.hardwareConcurrency);
            init_panic_hook();

            const canvas = canvasRef.current;
            if (!canvas) return;

            const observer = new ResizeObserver(() => {
                setCanvasSize(canvas.clientWidth);
            });
            observer.observe(canvas);

            canvas.width = canvasSize;
            canvas.height = canvasSize;

            universe.current = Builder.from_preset(Preset.Basic).number_of_boids(100).build();
            setBoidCount(universe.current.get_number_of_boids());

            requestAnimationFrame(render)
        })();

    }, []);

    return (
        <div className={styles.canvasWrapper}>
            <canvas className={styles.canvas} ref={canvasRef} />
            <button onClick={() => setPlayAnimation(!playAnimation)}>{playAnimation ? "Pause" : "Play"}</button>
            <Slider.Root
                className={styles.SliderRoot}
                defaultValue={[boidCount]}
                onValueChange={([value]) => setBoidCount(value)}
                min={0}
                max={200}
                step={1}
            >
                <Slider.Track className={styles.SliderTrack}>
                    <Slider.Range className={styles.SliderRange} />
                </Slider.Track>
                <Slider.Thumb className={styles.SliderThumb} />
            </Slider.Root>
        </div >
    )
}
