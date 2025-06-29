import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { SliderGroup } from '../SliderGroup';

function AttractionWeighting({ className }: { className?: string }) {
    const { universe, attractionWeighting, setAttractionWeighting } = useBoidsContext();

    useEffect(() => {
        universe.set_attraction_weighting(attractionWeighting);
    }, [attractionWeighting])

    return <SliderGroup className={`${className ?? ''}`} name="Attraction Weighting" state={Math.round(attractionWeighting * 100) / 100} setState={setAttractionWeighting} min={0} max={1} step={0.01} />
};

export { AttractionWeighting }
