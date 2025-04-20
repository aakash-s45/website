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
}

const experiences: Experience[] = [
  {
    id: 1,
    company: "Credgenics",
    role: "Backend Developer",
    logo: "/images/cg1.png",
    startDate: new Date("2023-06-01"),
    endDate: null, // Current job
    color: "#2c5338",
  },
  {
    id: 2,
    company: "Google Summer of Code - The Linux Foundation",
    role: "Individual Contributor",
    logo: "/images/gsoc.png",
    startDate: new Date("2022-03-01"),
    endDate: new Date("2022-09-30"),
    color: "#2563eb",
  },
  {
    id: 3,
    company: "Samsung Research and Development",
    role: "Software Developer Intern",
    logo: "/images/srib.png",
    startDate: new Date("2022-06-01"),
    endDate: new Date("2022-08-31"),
    color: "#1f2937",
  },
];

export default function ExperienceTimeline() {
  return (
    <div className={styles.container}>
      <div className="font-bold text-2xl"> Worked at </div>
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
                  <h3 className={styles.company}>{exp.company}</h3>
                  <p className={styles.role}>{exp.role}</p>
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
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
