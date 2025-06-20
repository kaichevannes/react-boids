import type { ReactNode } from "react";

function Controls({ children }: { children: ReactNode }) {
    return (
        <div>
            {children}
        </div>
    )
}

export { Controls }
