import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { SliderGroup } from '../SliderGroup';

function Noise() {
    const { universe, noise, setNoise } = useBoidsContext();

    useEffect(() => {
        universe.set_noise_fraction(noise);
    }, [noise])

    return <SliderGroup name="Noise" state={Math.round(noise * 100) / 100} setState={setNoise} min={0} max={1} step={0.01} />
};

export { Noise }
