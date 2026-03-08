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
import TechIconGrid from "@/components/IconGrid";
import FeedbackForm from "@/components/FeedbackForm";
import ProjectGrid from "@/components/ProjectGrid";
import WeatherWidget from "@/components/WeatherCard";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function Home() {
  const bio = [
    "I'm a Software Engineer at Microsoft, specializing in backend systems, distributed architectures, and scalable web services.",
    "Previously, I built event-driven systems at Credgenics, contributed to Automotive Grade Linux via GSoC, and worked on AI at Samsung R&D.",
    "I'm always open to learning, discussing cool projects, and building meaningful engineering solutions. Let's connect!",
  ];

  return (
    <main className={styles.main}>
      {/* Header with Weather & ThemeToggle */}
      <header className={styles.header}>
        <ThemeToggle />

        <div className={styles.headerRight}>
          <WeatherWidget />
        </div>
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
          <div
            style={{
              fontSize: "1.5rem",
              fontWeight: 700,
              color: "var(--heading-color)",
              marginBottom: "1rem",
            }}
          >
            Projects
          </div>
          <ProjectGrid />
        </section>
        {/* Tools & Technologies Section */}
        <TechIconGrid />
      </div>

      <footer className={styles.footer}>
        <FeedbackForm />
        {/* <div className="font-semibold bottom-9 opacity-80 flex flex-row items-center" style={{ gap: '6px' }}>
          <p>Made with</p>
          <FaHeadphonesAlt />
          <p>and</p>
          <FaCoffee />
          <p>by Aakash Solanki</p>
        </div> */}
      </footer>
    </main>
  );
}
