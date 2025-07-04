import type { Universe } from '../../../wasm/pkg/wasm_boids.js';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

type BoidsContextType = {
    universe: Universe,
    setUniverse: Dispatch<SetStateAction<Universe | undefined>>,
    memory: WebAssembly.Memory,
    boidCount: number,
    setBoidCount: Dispatch<SetStateAction<number>>,
    playing: boolean,
    setPlaying: Dispatch<SetStateAction<boolean>>,
    attractionWeighting: number,
    setAttractionWeighting: Dispatch<SetStateAction<number>>,
    alignmentWeighting: number,
    setAlignmentWeighting: Dispatch<SetStateAction<number>>,
    separationWeighting: number,
    setSeparationWeighting: Dispatch<SetStateAction<number>>,
    attractionRadius: number,
    setAttractionRadius: Dispatch<SetStateAction<number>>,
    alignmentRadius: number,
    setAlignmentRadius: Dispatch<SetStateAction<number>>,
    separationRadius: number,
    setSeparationRadius: Dispatch<SetStateAction<number>>,
    maxVelocity: number,
    setMaxVelocity: Dispatch<SetStateAction<number>>,
    noise: number,
    setNoise: Dispatch<SetStateAction<number>>,
    density: number,
    setDensity: Dispatch<SetStateAction<number>>,
    boidsPerThread: number,
    setBoidsPerThread: Dispatch<SetStateAction<number>>,
    countLimited: boolean,
    setCountLimited: Dispatch<SetStateAction<boolean>>,
    fps: boolean,
    setFps: Dispatch<SetStateAction<boolean>>,
}

const BoidsContext = createContext<BoidsContextType | null>(null);

function useBoidsContext() {
    const ctx = useContext(BoidsContext);
    if (!ctx) {
        throw new Error('useBoidsContext must be used inside a BoidsContext Provider. (This usually means <Boids.Root>)');
    }
    return ctx;
}

export { BoidsContext, useBoidsContext }
