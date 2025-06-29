import {
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';
import styles from './styles.module.css';

const LogSliderGroup = ({ name, state, setState, min, max }:
    { name: string, state: number, setState: Dispatch<SetStateAction<number>>, min: number, max: number }
) => {
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    return (
        <div className={styles.SliderGroup}>
            <div className={styles.SliderGroupLabelWrapper}>
                <span>{name}</span>
                <span>{state}</span>
            </div>
            <Slider.Root
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

export { LogSliderGroup }
