import type { Universe } from '@kaichevannes/wasm-boids';
import { createContext, useContext } from 'react';

type BoidsContextType = {
    universe: Universe;
    memory: WebAssembly.Memory;
    boidCount: number;
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
