import { useEffect, useRef, useState } from 'react';

function useWasmBoids() {
    const wasmInitialised = useRef(false);
    const [ready, setReady] = useState(false);
    const memory = useRef<WebAssembly.Memory | null>(null);
    const module = useRef<any>(null);

    useEffect(() => {
        // This is to prevent the double call on `initThreadPool` in dev. Unsure how to do this
        // better. If `initThreadPool` is called twice then we get a crash and can no longer
        // access WASM linear memory.
        if (wasmInitialised.current) {
            return;
        }
        wasmInitialised.current = true;

        (async () => {
            const jsResp = await fetch('/pkg/wasm_boids.js');
            const jsCode = await jsResp.text();

            const blob = new Blob([jsCode], { type: 'application/javascript' });
            const moduleUrl = URL.createObjectURL(blob);

            const wasmModule = await import(/* @vite-ignore */ moduleUrl);

            URL.revokeObjectURL(moduleUrl);

            console.log("5");
            const wasmMemory = await wasmModule.default(/* @vite-ignore */ moduleUrl);
            await wasmModule.initThreadPool();
            wasmModule.init_panic_hook();
            memory.current = wasmMemory;
            module.current = wasmModule;

            // const wasmUrl = await import('/pkg/wasm_boids_bg.wasm?url');
            // const wasmModule = await import('/pkg/wasm_boids.js' as any);
            // const wasmMemory = await wasmModule.default(wasmUrl);
            // await wasmModule.initThreadPool();
            // wasmModule.init_panic_hook();
            // memory.current = wasmMemory;
            // module.current = wasmModule;

            setReady(true);
        })();
    }, []);

    return {
        ready,
        Universe: module.current?.Universe,
        Builder: module.current?.Builder,
        Preset: module.current?.Preset,
    };
}

export { useWasmBoids };
