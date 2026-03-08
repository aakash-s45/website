"use client";

import Image from "next/image";
import styles from "./styles/ProjectGrid.module.css";

const projects = [
  {
    title: "Passover",
    desc: "Personal project - Sync clipboard data between macos and android",
    image: "/images/passover-1.png",
    link: "https://github.com/aakash-s45/Passover-m",
  },
  {
    title: "Pathfinding using topographic maps",
    desc: "Major technical project - Find hikeable path using terrain map",
    image: "/images/pathfinding-1.png",
    link: "https://github.com/aakash-s45/mtp/wiki",
  },
  {
    title: "Instrument Cluster Demo - AGL",
    desc: "Google Summer of Code - Instrument Cluster for AGL flutter build",
    image: "/images/ic.png",
    link: "https://github.com/aakash-s45/ic",
  },
  {
    title: "Climate control System using 10 Node network",
    desc: "Course project - Network of 10 devices like Arduino, Node-MCU, ESP-32, Xbee Modules, Raspberry Pi",
    image: "/images/iot.png",
    link: "https://github.com/aakash-s45/iot_systems/blob/main/project/ReadME.pdf",
  },
  {
    title: "Work - Worker Finder app",
    desc: "ISTP project - An app to help workers find work and contractors find workers",
    image: "/images/work-2.png",
    link: "https://github.com/aakash-s45/wtc-istp",
  },
];

export default function ProjectGrid() {
  return (
    <div id="project-grid" className={styles.grid}>
      {projects.map((project, index) => (
        <div
          className={styles.card}
          key={index}
          onClick={() => window.open(project.link, "_blank")}
          role="link"
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === "Enter") window.open(project.link, "_blank");
          }}
        >
          <div className={styles.card_image}>
            <Image
              src={project.image}
              alt={project.title}
              fill
              className={styles.image}
              priority={index < 2}
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
          <div className={styles.card_overlay} />
          <div className={styles.card_info}>
            <div className={styles.card_text}>
              <h3>{project.title}</h3>
              <p>{project.desc}</p>
            </div>
            <button
              className={styles.circle_btn}
              aria-label={`View ${project.title}`}
              onClick={(e) => {
                e.stopPropagation();
                window.open(project.link, "_blank");
              }}
            >
              ↗
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
