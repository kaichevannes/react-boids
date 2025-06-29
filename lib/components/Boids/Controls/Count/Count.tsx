import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { LogSliderGroup } from '../LogSliderGroup';

function Count({ className }: { className?: string }) {
    const { universe, boidCount, setBoidCount, countLimited } = useBoidsContext();

    useEffect(() => {
        universe.set_number_of_boids(boidCount);
    }, [boidCount])

    return <LogSliderGroup className={`${className ?? ''}`} name="Number of Boids" state={boidCount} setState={setBoidCount} min={1} max={countLimited ? 4000 : 50000} />
};

export { Count }
