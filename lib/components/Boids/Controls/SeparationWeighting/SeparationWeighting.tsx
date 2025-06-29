import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { SliderGroup } from '../SliderGroup';

function SeparationWeighting({ className }: { className?: string }) {
    const { universe, separationWeighting, setSeparationWeighting } = useBoidsContext();

    useEffect(() => {
        universe.set_separation_weighting(separationWeighting);
    }, [separationWeighting])

    return <SliderGroup className={`${className ?? ''}`} name="Separation Weighting" state={Math.round(separationWeighting * 100) / 100} setState={setSeparationWeighting} min={0} max={1} step={0.01} />
};

export { SeparationWeighting }
