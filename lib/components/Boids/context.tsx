import type { Preset, Universe } from '../../../wasm/pkg/wasm_boids.js';
import { createContext, useContext, type Dispatch, type SetStateAction } from 'react';

type BoidsContextType = {
    universe: Universe;
    setPreset: Dispatch<SetStateAction<Preset>>;
    memory: WebAssembly.Memory;
    boidCount: number;
    setBoidCount: Dispatch<SetStateAction<number>>;
    playing: boolean;
    setPlaying: Dispatch<SetStateAction<boolean>>;
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
