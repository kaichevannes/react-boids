import {
    useEffect,
    useState,
} from 'react';

import { useBoidsContext } from "../../context";
import { PercentSliderGroup } from '../PercentageSliderGroup';
import { useDebounce } from 'use-debounce';

function AttractionRadius() {
    const { universe, attractionRadius, setAttractionRadius } = useBoidsContext();
    const grid_size = universe.get_size();
    const [percentageAttractionRadius, setPercentageAttractionRadius] = useState(Math.trunc(100 * attractionRadius / grid_size));
    const [debouncedPercentageAttractionRadius] = useDebounce(percentageAttractionRadius, 15);

    useEffect(() => {
        setAttractionRadius(grid_size * debouncedPercentageAttractionRadius / 100);
    }, [debouncedPercentageAttractionRadius])

    useEffect(() => {
        universe.set_attraction_radius(attractionRadius);
        setPercentageAttractionRadius(Math.trunc(100 * attractionRadius / grid_size));
    }, [attractionRadius])


    return <PercentSliderGroup
        name="Attraction Radius"
        state={percentageAttractionRadius}
        setState={setPercentageAttractionRadius}
    />
};

export { AttractionRadius }
