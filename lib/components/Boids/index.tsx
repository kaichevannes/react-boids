import styles from './styles.module.css'
import React from 'react'

import init, { initThreadPool, Universe, Preset } from '@kaichevannes/wasm-boids'
// import init, { initThreadPool, init_panic_hook } from '@kaichevannes/wasm-boids'
// import init, { Universe, Preset } from '@kaichevannes/wasm-boids'

export function Boids() {
    React.useEffect(() => {
    }, []);

    return <div className={styles.div} >
        Hello from Boids
        <button onClick={async () => {
            let wasm = await init();
            await initThreadPool(navigator.hardwareConcurrency);

            const universe = Universe.build_from_preset(Preset.Basic);
            const number_of_boids = universe.get_number_of_boids();
            console.log(`number_of_boids: ${number_of_boids}`);
            const boidsPtr = universe.get_boids_pointer();
            console.log(`boidsPtr: ${boidsPtr}`);
            console.log(`wasm.memory.buffer: ${wasm.memory.buffer}`);
            const bytes = new Uint8Array(wasm.memory.buffer, 0, 64); // first 64 bytes
            console.log([...bytes]); // or console.table(bytes)
            const boids1 = new Float32Array(wasm.memory.buffer, boidsPtr, number_of_boids * 6);
            console.log(boids1);
            universe.tick();
            const boids2 = new Float32Array(wasm.memory.buffer, boidsPtr, number_of_boids * 6);
            console.log(boids2);
        }
        }>Run once</button>
    </div >
}
