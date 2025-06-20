import styles from './styles.module.css';
import {
    useEffect,
    useState,
    useId,
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';

import { useBoidsContext } from "../../context";

function Count() {
    const { universe, defaultBoidCount } = useBoidsContext();

    const [boidCount, setBoidCount] = useState(defaultBoidCount);

    useEffect(() => {
        universe.set_number_of_boids(boidCount);
    }, [boidCount])

    return <LogSliderGroup name="Number of Boids" state={boidCount} setState={setBoidCount} min={1} max={1000} />
};

const LogSliderGroup = ({ name, state, setState, min, max }:
    { name: string, state: number, setState: Dispatch<SetStateAction<number>>, min: number, max: number }
) => {
    const id = useId();

    const logMin = Math.log(min);
    const logMax = Math.log(max);
    return (
        <div className={styles.SliderGroup}>
            <div className={styles.SliderGroupLabelWrapper}>
                <label htmlFor={id}>{name}</label>
                <span>{state}</span>
            </div>
            <Slider.Root
                id={id}
                className={styles.SliderRoot}
                value={[(Math.log(state) - logMin) / (logMax - logMin)]}
                onValueChange={([value]) => {
                    setState(Math.round(Math.exp(logMin + value * (logMax - logMin))));
                }}
                min={0}
                max={1}
                step={0.01}
            >
                <Slider.Track className={styles.SliderTrack}>
                    <Slider.Range className={styles.SliderRange} />
                </Slider.Track>
                <Slider.Thumb className={styles.SliderThumb} />
            </Slider.Root>
        </div>
    )
};

export { Count }
