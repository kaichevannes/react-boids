import {
    useEffect,
    useState,
} from 'react';

import { useBoidsContext } from "../../context";
import { PercentSliderGroup } from '../PercentageSliderGroup';
import { useDebounce } from 'use-debounce';

function SeparationRadius() {
    const { universe, separationRadius, setSeparationRadius } = useBoidsContext();
    const grid_size = universe.get_size();
    const [percentageSeparationRadius, setPercentageSeparationRadius] = useState(Math.trunc(100 * separationRadius / grid_size));
    const [debouncedPercentageSeparationRadius] = useDebounce(percentageSeparationRadius, 15);

    useEffect(() => {
        setSeparationRadius(grid_size * debouncedPercentageSeparationRadius / 100);
    }, [debouncedPercentageSeparationRadius])

    useEffect(() => {
        universe.set_seperation_radius(separationRadius);
        setPercentageSeparationRadius(Math.trunc(100 * separationRadius / grid_size));
    }, [separationRadius])


    return <PercentSliderGroup
        name="Separation Radius"
        state={percentageSeparationRadius}
        setState={setPercentageSeparationRadius}
    />
};

export { SeparationRadius }
