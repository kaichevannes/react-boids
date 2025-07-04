import { Builder } from "../../../../../wasm/pkg/wasm_boids.js";
import { useBoidsContext } from "../../context";

function Algorithm({ className }: { className?: string }) {
    const { universe, setUniverse } = useBoidsContext();

    return (
        <div className={`${className ?? ''}`}>
            <label htmlFor="algorithm"> Algorithm </label>
            <select
                id="algorithm"
                defaultValue="tiled"
                onChange={(e) => {
                    const builder = Builder.from_default()
                        .number_of_boids(universe.get_number_of_boids())
                        .grid_size(universe.get_size())
                        .noise_fraction(universe.get_noise_fraction())
                        .attraction_weighting(universe.get_attraction_weighting() * 100)
                        .alignment_weighting(universe.get_alignment_weighting() * 100)
                        .separation_weighting(universe.get_separation_weighting() * 100)
                        .attraction_radius(universe.get_attraction_radius())
                        .alignment_radius(universe.get_alignment_radius())
                        .separation_radius(universe.get_separation_radius())
                        .maximum_velocity(universe.get_maximum_velocity())
                        .multithreaded(universe.get_multithreaded())
                        .number_of_boids_per_thread(universe.get_boids_per_thread());

                    switch (e.target.value) {
                        case 'naive':
                            setUniverse(builder.naive(true).build());
                            break;
                        case 'tiled':
                            setUniverse(builder.naive(false).build());
                            break;
                        default:
                            throw new Error(`Algorithm ${e.target.value} not found.`);
                    }
                }}
            >
                <option value="tiled">Tiled</option>
                <option value="naive">Naive</option>
            </select>
        </ div >
    )
}

export { Algorithm }
