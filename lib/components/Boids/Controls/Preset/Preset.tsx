import { Preset as BoidPreset } from "../../../../../wasm/pkg/wasm_boids";
import { useBoidsContext } from "../../context";

function Preset() {
    const { setPreset } = useBoidsContext();

    return (
        <label>
            Preset
            <select
                onChange={(e) => {
                    switch (e.target.value) {
                        case 'basic':
                            setPreset(BoidPreset.Basic);
                            break;
                        case 'maruyama':
                            setPreset(BoidPreset.Maruyama);
                            break;
                        case 'zhang':
                            setPreset(BoidPreset.Zhang);
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
        </label >
    )
}

export { Preset }
