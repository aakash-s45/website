"use client";

import Image from "next/image";
import { useCallback, useRef } from "react"; 
import useEmblaCarousel from 'embla-carousel-react'
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'

import styles from "./styles/ProjectGrid.module.css";

const projects = [
  {
    title: "Passover - Bluetooth Sync",
    desc: "Personal project - Sync some date between macos and android",
    image: "/images/temp1.avif",
    link: "https://github.com/aakash-s45/Passover-m",
  },
  {
    title: "Pathfinding using topographic maps",
    desc: "Major technical project - Find hikeable path using terrain map",
    image: "/images/temp2.jpeg",
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
    image: "/images/temp3.jpeg",
    link: "https://github.com/aakash-s45/iot_systems/blob/main/project/ReadME.pdf",
  },
  {
    title: "Work - Worker Finder app",
    desc: "ISTP project - An app to help workers to find work and to help contractors to find workers",
    image: "/images/temp1.avif",
    link: "https://github.com/aakash-s45/wtc-istp",
  },
];

export default function ProjectGrid() {
  // Create a ref for the scrollable container
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: false, skipSnaps: true, }, [WheelGesturesPlugin()]);

  // Function to scroll left
  const scrollLeft = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollRight = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);


  // Function to scroll right

  return (
    // Add position relative to position the buttons
    <div className={styles.embla} ref={emblaRef}>
      {/* Attach the ref to the scrollable div */}
      <div className={styles.embla__container} ref={scrollContainerRef}>
        {projects.map((project, index) => (
          <div className={styles.embla__slide} key={index}>
            <div className={styles.card_image}>
              <Image
                src={project.image}
                alt={project.title}
                fill
                className={styles.image} // Use styles.image if defined, otherwise keep className="image"
                priority={index < 3} // Prioritize loading images initially visible
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw" // Example sizes prop
              />
            </div>
            <div className={styles.card_info}>
              <div className={styles.card_text_content}>
                {/* Added wrapper for text */}
                <h3>{project.title}</h3>
                <p>{project.desc}</p>
              </div>
              <button
                className={styles.circle_btn}
                aria-label={`View details for ${project.title}`}
                onClick={() => window.open(project.link, "_blank")}
              >↗</button>
            </div>
          </div>
        ))}
      </div>

      {/* Scroll Buttons Container */}
      <div className={styles.scroll_buttons}>
        <button
          onClick={scrollLeft}
          className={styles.scroll_btn}
          aria-label="Scroll projects left"
        >
          &lt; {/* HTML entity for < */}
        </button>
        <button
          onClick={scrollRight}
          className={styles.scroll_btn}
          aria-label="Scroll projects right"
        >
          &gt; {/* HTML entity for > */}
        </button>
      </div>
    </div>
  );
}
