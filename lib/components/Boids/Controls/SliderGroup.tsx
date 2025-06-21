import {
    useId,
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';

import styles from './styles.module.css';

const SliderGroup = ({ name, state, setState, min, max }:
    { name: string, state: number, setState: Dispatch<SetStateAction<number>>, min: number, max: number }
) => {
    const id = useId();

    return (
        <div className={styles.SliderGroup}>
            <div className={styles.SliderGroupLabelWrapper}>
                <label htmlFor={id}>{name}</label>
                <span>{state}</span>
            </div>
            <Slider.Root
                id={id}
                className={styles.SliderRoot}
                value={[state]}
                onValueChange={([value]) => setState(value)}
                min={min}
                max={max}
                step={1}
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
