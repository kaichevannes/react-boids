import styles from './styles.module.css'
import { Boids } from '../'

function App() {
    return (
        <div className={styles.boidsWrapper}>
            <Boids.Root boidCount={100}>
                <Boids.Canvas />
                <Boids.Controls>
                    <Boids.Playback />
                    <Boids.Multithreaded />
                    <Boids.Count />
                    <Boids.BoidsPerThread />
                    <Boids.Preset />
                </Boids.Controls>
            </Boids.Root>
        </div>
    )
}

export default App
