import { useEffect, useState } from "react";
import { useBoidsContext } from "../../context";

function Multithreaded() {
    const { universe } = useBoidsContext();
    const [multithreaded, setMultithreaded] = useState<boolean>(() => universe.get_multithreaded());

    useEffect(() => {
        if (multithreaded === null) return;

        // We checked if it's null above. Can't use `if (!multithreaded)` because multithreaded is a
        // boolean value and so will never pass when actually false.
        universe.set_multithreaded(multithreaded!);
    }, [multithreaded])

    if (multithreaded === null) return;

    return <label>Multithreaded
        <input type="checkbox" checked={multithreaded} onChange={e => setMultithreaded(e.target.checked)} />
    </label>
}

export { Multithreaded }
