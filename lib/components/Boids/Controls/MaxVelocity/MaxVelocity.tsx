import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { SliderGroup } from '../SliderGroup';

function MaxVelocity({ className }: { className?: string }) {
    const { universe, maxVelocity, setMaxVelocity } = useBoidsContext();

    useEffect(() => {
        universe.set_maximum_velocity(maxVelocity);
    }, [maxVelocity])

    return <SliderGroup className={`${className ?? ''}`} name="Maximum Velocity" state={Math.round(maxVelocity * 100) / 100} setState={setMaxVelocity} min={0} max={1} step={0.01} />
};

export { MaxVelocity }
