import {
    useRef,
    useEffect,
    type ReactNode,
    useState
} from 'react'

import init, { initThreadPool, init_panic_hook, Universe, Builder, Preset } from '../../../../wasm/pkg/wasm_boids.js'

import { BoidsContext } from '../context';

export function Root({ children, boidCount = 100 }: { children: ReactNode, boidCount: number }) {
    // Initialisation
    const [isReady, setIsReady] = useState(false);
    const wasmInitialised = useRef(false);
    const universe = useRef<Universe | null>(null);
    const memory = useRef<WebAssembly.Memory | null>(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        // This is to prevent the double call on `initThreadPool` in dev. Unsure how to do this
        // better. If `initThreadPool` is called twice then we get a crash and can no longer
        // access WASM linear memory.
        if (wasmInitialised.current) {
            return;
        }
        wasmInitialised.current = true;

        (async () => {
            let wasm = await init();
            memory.current = wasm.memory;
            await initThreadPool(navigator.hardwareConcurrency);
            init_panic_hook();

            universe.current = Builder.from_preset(Preset.Maruyama)
                .number_of_boids(boidCount)
                .multithreaded(true)
                .number_of_boids_per_thread(1000)
                .build();

            setIsReady(true);
        })();

    }, []);

    if (!isReady) return;

    return (
        <BoidsContext.Provider value={{
            // This will always be initialised since we guard above with the isReady flag.
            universe: universe.current!,
            memory: memory.current!,
            defaultBoidCount: boidCount,
            playing,
            setPlaying,
        }}>
            {children}
        </BoidsContext.Provider>
    );
}

