import {
    useEffect,
    useState,
} from 'react';

import { useBoidsContext } from "../../context";
import { LogSliderGroup } from '../LogSliderGroup';

function Count() {
    const { universe, defaultBoidCount } = useBoidsContext();

    const [boidCount, setBoidCount] = useState(defaultBoidCount);

    useEffect(() => {
        universe.set_number_of_boids(boidCount);
    }, [boidCount])

    return <LogSliderGroup name="Number of Boids" state={boidCount} setState={setBoidCount} min={1} max={15000} />
};

export { Count }
