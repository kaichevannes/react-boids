import styles from './styles.module.css'
import { Boids } from '../'

function App() {
    return <>
        <div className={styles.boidsWrapper}>
            <Boids.Root>
                <Boids.Canvas />
            </Boids.Root>
        </div>
    </>
}

export default App
