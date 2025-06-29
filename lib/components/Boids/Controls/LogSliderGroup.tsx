import {
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';
import styles from './styles.module.css';

const LogSliderGroup = ({ className, name, state, setState, min, max, decimals = false }:
    { className?: string, name: string, state: number, setState: Dispatch<SetStateAction<number>>, min: number, max: number, decimals?: boolean }
) => {
    const logMin = Math.log(min);
    const logMax = Math.log(max);
    return (
        <div className={`${styles.SliderGroup} ${className}`}>
            <div className={styles.SliderGroupLabelWrapper}>
                <span>{name}</span>
                <span>{state}</span>
            </div>
            <Slider.Root
                className={styles.SliderRoot}
                value={[(Math.log(state) - logMin) / (logMax - logMin)]}
                onValueChange={([value]) => {
                    if (!decimals) {
                        setState(Math.round(Math.exp(logMin + value * (logMax - logMin))));
                    } else {
                        setState(Math.round((Math.exp(logMin + value * (logMax - logMin))) * 100) / 100);
                    }
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
