import React from 'react'
import styles from './styles/Intro.module.css';

function Intro() {
  return (
      <div className={styles.box}>
        <h1 className={styles.greet}>Hello, My name is</h1>
        <h1 className={styles.name}>Aakash Solanki</h1>
        <div className={styles.description}>
          I am a Software developer with experience in building backend systems, mobile apps, and IoT projects.I have completed bachelor’s degree at IIT Mandi.

I enjoy solving real-world problems through practical and efficient solutions.</div>
      </div>
  )
}

export default Intro