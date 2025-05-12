import {
  FaCoffee,
  FaGithub,
  FaHeadphonesAlt,
  FaLinkedin,
} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import MusicWidget from "@/components/MusicWidget";
import ExperienceTimeline from "@/components/ExperienceTimeline";
import styles from "./styles/page.module.css";
import { FaMountain } from "react-icons/fa";
import TechIconGrid from "@/components/IconGrid";
import FeedbackForm from "@/components/FeedbackForm";
import ProjectGrid from "@/components/ProjectGrid";
import WeatherWidget from "@/components/WeatherCard";

export default function Home() {
  const bio = [
    "I'm a software developer with experience in building backend systems, mobile apps, and IoT projects. I did my undergrad at IIT Mandi.",
    "I like working on real-world problems and enjoy finding solutions that are simple, practical, and actually work.",
    "Spent a good part of college in the mountains—learned to keep things calm, simple, and steady. Outside of coding, I’m usually out walking or listening to music.",
  ];
  return (
    <main className={styles.main}>
      {/* Header with Weather */}
      <header className={styles.header}>
        <div className={styles.waveIcon}>
          <FaMountain />
        </div>

        <WeatherWidget />
      </header>

      <div className={styles.mainContainer}>
        {/* Hero Section with Bento Grid */}
        <section className={styles.heroSection}>
          {/* Intro Content */}
          <div className={styles.introCard}>
            <div className={styles.introContent}>
              <div>
                <h2 className={styles.greeting}>Hello, My name is</h2>
                <h1 className={styles.name}>Aakash Solanki</h1>
                <div className={styles.socialLinks}>
                  <a
                    href="https://github.com/aakash-s45"
                    className={styles.socialIcon}
                  >
                    <FaGithub />
                  </a>
                  <a
                    href="https://linkedin.com/in/aakash-s45"
                    className={styles.socialIcon}
                  >
                    <FaLinkedin />
                  </a>
                  <a
                    href="mailto:hey.aakashs@gmail.com"
                    className={styles.socialIcon}
                  >
                    <MdEmail />
                  </a>
                </div>
              </div>
              <p className={styles.bio}>
                {/* use array to render bio */}
                {bio[0]}
              </p>
              <p className={styles.bio}>{bio[1]}</p>
              <div className={styles.quoteBox}>
                <p>{bio[2]}</p>
              </div>
            </div>
          </div>

          {/* Music Widget */}
          <div className={styles.musicWidgetContainer}>
            <MusicWidget />
          </div>
        </section>

        {/* Experience Timeline Section */}
        <section className={styles.sectionContainer}>
          <ExperienceTimeline />
        </section>

        {/* Projects Section */}
        <section className={styles.sectionContainer}>
          <div className="font-bold text-2xl mb-4 text-[var(--primary-text)]">
            Projects
          </div>
          <ProjectGrid />
        </section>
        {/* Tools & Technologies Section */}
        <TechIconGrid />
      </div>

      <footer className={styles.footer}>
        <FeedbackForm />
        <div className="font-semibold bottom-9 opacity-80 flex flex-row gap-2 items-center">
          <p>Made with</p>
          <FaHeadphonesAlt />
          <p>and</p>
          <FaCoffee />
          <p>by Aakash Solanki</p>
        </div>
      </footer>
    </main>
  );
}
