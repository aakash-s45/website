import React from 'react'
import styles from './styles/WeatherChip.module.css';

function WeatherChip(){
  return (
      <div className={styles.box}>
        <h1>12°C, Clear</h1>
        <p>Noida, IN</p>
      </div>
  )
}

export default WeatherChip