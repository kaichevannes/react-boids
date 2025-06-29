import styles from './styles.module.css';
import type { ReactNode } from "react";

function Controls({ children, className }: { children: ReactNode, className?: string }) {
    return (
        <div className={`${styles.ControlsDiv} ${className ?? ''}`}>
            {children}
        </div>
    )
}

export { Controls }
