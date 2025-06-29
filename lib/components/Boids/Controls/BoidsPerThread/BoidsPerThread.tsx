import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { LogSliderGroup } from '../LogSliderGroup';

function BoidsPerThread({ className }: { className?: string }) {
    const { universe, boidsPerThread, setBoidsPerThread, countLimited } = useBoidsContext();

    useEffect(() => {
        universe.set_boids_per_thread(boidsPerThread);
    }, [boidsPerThread])

    return <LogSliderGroup className={`${className} ?? ''`} name="Boids per Thread" state={boidsPerThread} setState={setBoidsPerThread} min={1} max={countLimited ? 4000 : 50000} />
};

export { BoidsPerThread }
