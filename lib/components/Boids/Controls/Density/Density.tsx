import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { LogSliderGroup } from '../LogSliderGroup';

function Density({ className }: { className?: string }) {
    const { universe, density, setDensity } = useBoidsContext();

    useEffect(() => {
        universe.set_density(density);
    }, [density])

    return <LogSliderGroup
        className={`${className ?? ''}`}
        name="Density"
        state={Math.round(density * 100) / 100}
        setState={setDensity}
        min={0.01}
        max={1000}
        decimals
    />
};

export { Density }
