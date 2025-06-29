import {
    useRef,
    useEffect,
    type ReactNode,
    useState
} from 'react'

import init, { initThreadPool, init_panic_hook, Universe, Builder, Preset } from '../../../../wasm/pkg/wasm_boids.js'

import { BoidsContext } from '../context';

export function Root({ children, boidCount = 100 }: { children: ReactNode, boidCount: number }) {
    const wasmInitialised = useRef(false);
    const memory = useRef<WebAssembly.Memory | null>(null);
    const [universe, setUniverse] = useState<Universe>();
    const [playing, setPlaying] = useState(true);
    const [currentBoidCount, setCurrentBoidCount] = useState(boidCount);
    const [attractionWeighting, setAttractionWeighting] = useState(0);
    const [alignmentWeighting, setAlignmentWeighting] = useState(0);
    const [separationWeighting, setSeparationWeighting] = useState(0);
    const [attractionRadius, setAttractionRadius] = useState(0);
    const [alignmentRadius, setAlignmentRadius] = useState(0);
    const [separationRadius, setSeparationRadius] = useState(0);
    const [maxVelocity, setMaxVelocity] = useState(0);
    const [noise, setNoise] = useState(0);

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

            const universe = Builder.from_preset(Preset.Basic)
                .number_of_boids(boidCount)
                .multithreaded(true)
                .number_of_boids_per_thread(200)
                .build();
            setUniverse(universe);

            // Required for initial render, unsure why the useEffect doesn't handle this.
            setCurrentBoidCount(universe.get_number_of_boids());
            setAttractionWeighting(universe.get_attraction_weighting());
            setAlignmentWeighting(universe.get_alignment_weighting());
            setSeparationWeighting(universe.get_separation_weighting());
            setAttractionRadius(universe.get_attraction_radius());
            setAlignmentRadius(universe.get_alignment_radius());
            setSeparationRadius(universe.get_separation_radius());
            setMaxVelocity(universe.get_maximum_velocity());
            setNoise(universe.get_noise_fraction());
        })();

    }, []);

    useEffect(() => {
        if (!universe) {
            return;
        }
        setCurrentBoidCount(universe.get_number_of_boids());
        setAttractionWeighting(universe.get_attraction_weighting());
        setAlignmentWeighting(universe.get_alignment_weighting());
        setSeparationWeighting(universe.get_separation_weighting());
        setAttractionRadius(universe.get_attraction_radius());
        setAlignmentRadius(universe.get_alignment_radius());
        setSeparationRadius(universe.get_separation_radius());
        setMaxVelocity(universe.get_maximum_velocity());
        setNoise(universe.get_noise_fraction());
    }, [universe])

    if (!universe) return;

    return (
        <BoidsContext.Provider value={{
            // This will always be initialised since we guard above with the isReady flag.
            universe,
            setUniverse,
            memory: memory.current!,
            boidCount: currentBoidCount,
            setBoidCount: setCurrentBoidCount,
            attractionWeighting,
            setAttractionWeighting,
            alignmentWeighting,
            setAlignmentWeighting,
            separationWeighting,
            setSeparationWeighting,
            attractionRadius,
            setAttractionRadius,
            alignmentRadius,
            setAlignmentRadius,
            separationRadius,
            setSeparationRadius,
            maxVelocity,
            setMaxVelocity,
            playing,
            setPlaying,
            noise,
            setNoise,
        }}>
            {children}
        </BoidsContext.Provider>
    );
}

