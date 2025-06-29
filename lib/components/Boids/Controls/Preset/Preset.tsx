import { Preset as BoidPreset, Universe } from '../../../../../wasm/pkg/wasm_boids';
import { useBoidsContext } from "../../context";

function Preset({ className }: { className?: string }) {
    const { setUniverse } = useBoidsContext();

    return (
        <div className={`${className ?? ''}`}>
            <label htmlFor="preset"> Preset</label>
            <select
                id="preset"
                onChange={(e) => {
                    switch (e.target.value) {
                        case 'basic':
                            setUniverse(Universe.build_from_preset(BoidPreset.Basic));
                            break;
                        case 'maruyama':
                            setUniverse(Universe.build_from_preset(BoidPreset.Maruyama));
                            break;
                        case 'zhang':
                            setUniverse(Universe.build_from_preset(BoidPreset.Zhang));
                            break;
                        default:
                            throw new Error(`Preset ${e.target.value} not found.`);
                    }
                }}
            >
                <option value="basic">Basic</option>
                <option value="maruyama">Maruyama</option>
                <option value="zhang">Zhang</option>
            </select>
        </div>
    )
}

export { Preset }
