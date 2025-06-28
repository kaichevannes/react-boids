import {
    useEffect,
    useState,
} from 'react';

import { useBoidsContext } from "../../context";
import { PercentSliderGroup } from '../PercentageSliderGroup';
import { useDebounce } from 'use-debounce';

function AlignmentRadius() {
    const { universe, alignmentRadius, setAlignmentRadius } = useBoidsContext();
    const grid_size = universe.get_size();
    const [percentageAlignmentRadius, setPercentageAlignmentRadius] = useState(Math.trunc(100 * alignmentRadius / grid_size));
    const [debouncedPercentageAlignmentRadius] = useDebounce(percentageAlignmentRadius, 15);

    useEffect(() => {
        setAlignmentRadius(grid_size * debouncedPercentageAlignmentRadius / 100);
    }, [debouncedPercentageAlignmentRadius])

    useEffect(() => {
        universe.set_alignment_radius(alignmentRadius);
        setPercentageAlignmentRadius(Math.trunc(100 * alignmentRadius / grid_size));
    }, [alignmentRadius])


    return <PercentSliderGroup
        name="Alignment Radius"
        state={percentageAlignmentRadius}
        setState={setPercentageAlignmentRadius}
    />
};

export { AlignmentRadius }
