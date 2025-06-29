import {
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';

import styles from './styles.module.css';

const SliderGroup = ({ name, state, setState, min, max, step = 1, className }:
    { name: string, state: number, setState: Dispatch<SetStateAction<number>>, min: number, max: number, step?: number, className?: string }
) => {
    return (
        <div className={`${styles.SliderGroup} ${className}`}>
            <div className={styles.SliderGroupLabelWrapper}>
                <span>{name}</span>
                <span>{state}</span>
            </div>
            <Slider.Root
                className={styles.SliderRoot}
                value={[state]}
                onValueChange={([value]) => setState(value)}
                min={min}
                max={max}
                step={step}
            >
                <Slider.Track className={styles.SliderTrack}>
                    <Slider.Range className={styles.SliderRange} />
                </Slider.Track>
                <Slider.Thumb className={styles.SliderThumb} />
            </Slider.Root>
        </div>
    )
};

export { SliderGroup }
