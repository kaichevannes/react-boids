import styles from './styles.module.css'
import React from 'react'

import * as wasm from '@kaichevannes/wasm-boids'

export function Boids() {

  React.useEffect(() => {
  }, []);

  return <div className={styles.div} >
    Hello from Boids
    <button onClick={() => { wasm.greet("from wasm") }}>greet from wasm</button>
  </div >
}
