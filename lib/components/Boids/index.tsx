import styles from './styles.module.css'
import React from 'react'

import init, { initThreadPool, Universe, Preset } from '@kaichevannes/wasm-boids'

export function Boids() {
    React.useEffect(() => {
        (async () => {
            const wasmModule = await init();
            await initThreadPool(navigator.hardwareConcurrency);

            const universe = Universe.build_from_preset(Preset.Basic);
            const number_of_boids = universe.get_number_of_boids();
            console.log(`number_of_boids: ${number_of_boids}`);
            const boidsPtr = universe.get_boids_pointer();
            const boids = new Float32Array(wasmModule.memory.buffer, boidsPtr, number_of_boids * 6);
            console.log(boids);
        })();
    }, []);

    return <div className={styles.div} >
        Hello from Boids
    </div >
}
