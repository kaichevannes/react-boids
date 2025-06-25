import styles from './styles.module.css';
import type { ReactNode } from "react";

function Controls({ children }: { children: ReactNode }) {
    return (
        <div className={styles.ControlsDiv}>
            {children}
        </div>
    )
}

export { Controls }
