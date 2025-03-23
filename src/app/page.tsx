
import React from 'react';
import Intro from '@/components/Intro';
import Mountain from '@/components/Mountain';
import Experience from '@/components/Experience';
import Projects from '@/components/Projects';
import NowPlaying from '@/components/NowPlaying';
import ContactInfo from '@/components/ContactInfo';
import styles from '@/components/styles/Home.module.css';
import WeatherChip from '@/components/WeatherChip';


const HomePage: React.FC = () => {
  return (
    <div>
      <div className={styles.home}>
        <WeatherChip/>
        <Intro/>
        {/* <Mountain/> */}
      </div>
      {/* <Experience/> */}
      {/* <Projects/> */}
      {/* <NowPlaying/> */}
      {/* <ContactInfo/> */}
    </div>
  )
}

export default HomePage;
