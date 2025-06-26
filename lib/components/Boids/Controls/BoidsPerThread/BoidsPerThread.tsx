import {
    useEffect,
    useState,
} from 'react';

import { useBoidsContext } from "../../context";
import { LogSliderGroup } from '../LogSliderGroup';

function BoidsPerThread() {
    const { universe } = useBoidsContext();

    const [boidsPerThread, setBoidsPerThread] = useState(universe.get_boids_per_thread());

    useEffect(() => {
        universe.set_boids_per_thread(boidsPerThread);
    }, [boidsPerThread])

    return <LogSliderGroup name="Boids per Thread" state={boidsPerThread} setState={setBoidsPerThread} min={1} max={50000} />
};

export { BoidsPerThread }
