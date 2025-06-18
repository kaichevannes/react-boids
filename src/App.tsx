import styles from './styles.module.css'
import { Boids } from '../'

function App() {
    return <>
        <div className={styles.boidsWrapper}>
            <Boids />
        </div>
    </>
}

export default App
