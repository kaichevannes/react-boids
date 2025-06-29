import styles from './styles.module.css'
import { Boids } from '../'

function App() {
    return (
        <div className={styles.boidsWrapper}>
            <Boids.Root>
                <Boids.Canvas />
                <Boids.Controls>
                    <Boids.Playback />
                    <Boids.Multithreaded />
                    <Boids.Count />
                    <Boids.BoidsPerThread />
                    <Boids.Preset />
                    <Boids.AttractionWeighting />
                    <Boids.AlignmentWeighting />
                    <Boids.SeparationWeighting />
                    <Boids.AttractionRadius />
                    <Boids.AlignmentRadius />
                    <Boids.SeparationRadius />
                    <Boids.MaxVelocity />
                    <Boids.Noise />
                    <Boids.Algorithm />
                    <Boids.Density />
                    <Boids.CountLimiter />
                </Boids.Controls>
            </Boids.Root>
        </div>
    )
}

export default App
