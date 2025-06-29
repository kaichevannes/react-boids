import {
    type Dispatch,
    type SetStateAction,
} from 'react';
import { Slider } from 'radix-ui';
import styles from './styles.module.css';

const PercentSliderGroup = ({ name, state, setState }:
    { name: string, state: number, setState: Dispatch<SetStateAction<number>> }
) => {
    return (
        <div className={styles.SliderGroup}>
            <div className={styles.SliderGroupLabelWrapper}>
                <span>{name}</span>
                <span>{state}</span>
            </div>
            <Slider.Root
                className={styles.SliderRoot}
                value={[state]}
                onValueChange={([value]) => setState(value)}
                min={0}
                max={100}
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

export { PercentSliderGroup }
