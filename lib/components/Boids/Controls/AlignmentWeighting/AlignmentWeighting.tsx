import {
    useEffect,
} from 'react';

import { useBoidsContext } from "../../context";
import { SliderGroup } from '../SliderGroup';

function AlignmentWeighting({ className }: { className?: string }) {
    const { universe, alignmentWeighting, setAlignmentWeighting } = useBoidsContext();

    useEffect(() => {
        universe.set_alignment_weighting(alignmentWeighting);
    }, [alignmentWeighting])

    return <SliderGroup className={`${className ?? ''}`} name="Alignment Weighting" state={Math.round(alignmentWeighting * 100) / 100} setState={setAlignmentWeighting} min={0} max={1} step={0.01} />
};

export { AlignmentWeighting }
