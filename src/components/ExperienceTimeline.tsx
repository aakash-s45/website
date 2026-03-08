import Image from "next/image";
import styles from "./styles/ExperienceTimeline.module.css";

interface Experience {
  id: number;
  company: string;
  role: string;
  logo: string;
  startDate: Date;
  endDate: Date | null;
  color: string;
  description: string;
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Microsoft",
    role: "Software Engineer",
    logo: "/images/microsoft.png",
    startDate: new Date("2025-11-01"),
    endDate: null, // Current job
    color: "#2c5338",
    description:
      "Diagnosed and resolved complex OS regressions to ensure pre-release stability. Refactored core Windows components to reduce technical debt.",
  },
  {
    id: 2,
    company: "Credgenics",
    role: "Backend Developer",
    logo: "/images/cg1.png",
    startDate: new Date("2023-06-01"),
    endDate: new Date("2025-11-01"),
    color: "#2c5338",
    description:
      "Built a conversational AI voice-bot and optimized databases, cutting query times by 60%. Enhanced event processing and developed a high-accuracy FastAPI microservice.",
  },
  {
    id: 3,
    company: "Google Summer of Code - The Linux Foundation",
    role: "Individual Contributor",
    logo: "/images/gsoc.png",
    startDate: new Date("2022-05-01"),
    endDate: new Date("2022-09-30"),
    color: "#2563eb",
    description:
      "Developed a Flutter-based Instrument Cluster app for Automotive Grade Linux integrating real-time telemetry. Implemented WebSocket communication for seamless data sync.",
  },
  {
    id: 4,
    company: "Samsung Research and Development",
    role: "Software Developer Intern",
    logo: "/images/srib.png",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2022-08-31"),
    color: "#1f2937",
    description:
      "Implemented SNR estimation models and signal processing techniques to classify audio inputs. Enhanced data preprocessing efficiency for machine learning models.",
  },
];

export default function ExperienceTimeline() {
  return (
    <div className={styles.container}>
      <div
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          color: "var(--heading-color)",
          marginBottom: "1rem",
        }}
      >
        Worked at
      </div>
      {/* Experience items */}
      <div className={styles.experienceList}>
        {experiences.map((exp) => {
          return (
            <div key={exp.id} className={styles.experienceItem}>
              {/* Experience content */}
              <div className={styles.experienceContent}>
                <div className={styles.logoContainer}>
                  <Image
                    src={exp.logo}
                    alt={exp.company}
                    fill
                    style={{ objectFit: "contain", padding: "0.65rem" }}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>

                <div className={styles.experienceDetails}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <p className={styles.company}>{exp.company}</p>
                  <p className={styles.dates}>
                    {exp.startDate.toLocaleDateString("en-US", {
                      month: "long",
                      year: "numeric",
                    })}{" "}
                    -{" "}
                    {exp.endDate
                      ? exp.endDate.toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })
                      : "Present"}
                  </p>
                  <p className={styles.description}>{exp.description}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
