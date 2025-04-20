import React from "react";
import Image from "next/image";

type TechIcon = {
  src: string;
  alt: string;
};

type IconsGrouped = {
  [category: string]: TechIcon[];
};

const icons: IconsGrouped = {
  languages_and_frameworks: [
    {
      src: "https://img.shields.io/badge/Python-FFD43B?style=for-the-badge&logo=python&logoColor=blue",
      alt: "Python",
    },
    {
      src: "https://img.shields.io/badge/C%2B%2B-00599C?style=for-the-badge&logo=c%2B%2B&logoColor=white",
      alt: "C++",
    },
    {
      src: "https://img.shields.io/badge/Dart-0175C2?style=for-the-badge&logo=dart&logoColor=white",
      alt: "Dart",
    },
    {
      src: "https://img.shields.io/badge/Kotlin-B125EA?style=for-the-badge&logo=kotlin&logoColor=white",
      alt: "Kotlin",
    },
    {
      src: "https://img.shields.io/badge/Swift-FA7343?style=for-the-badge&logo=swift&logoColor=white",
      alt: "Swift",
    },
    {
      src: "https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E",
      alt: "JavaScript",
    },
    {
      src: "https://img.shields.io/badge/Flutter-02569B?style=for-the-badge&logo=flutter&logoColor=white",
      alt: "Flutter",
    },
    {
      src: "https://img.shields.io/badge/fastapi-109989?style=for-the-badge&logo=FASTAPI&logoColor=white",
      alt: "FastAPI",
    },
    {
      src: "https://img.shields.io/badge/Flask-000000?style=for-the-badge&logo=flask&logoColor=white",
      alt: "Flask",
    },
    {
      src: "https://img.shields.io/badge/next%20js-000000?style=for-the-badge&logo=nextdotjs&logoColor=white",
      alt: "Next.js",
    },
  ],
  Technologies: [
    {
      src: "https://img.shields.io/badge/Apache_Kafka-231F20?style=for-the-badge&logo=apache-kafka&logoColor=white",
      alt: "Apache Kafka",
    },
    {
      src: "https://img.shields.io/badge/redis-CC0000.svg?&style=for-the-badge&logo=redis&logoColor=white",
      alt: "Redis",
    },
    {
      src: "https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white",
      alt: "Docker",
    },
    {
      src: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
      alt: "PostgreSQL",
    },
    {
      src: "https://img.shields.io/badge/dbeaver-382923?style=for-the-badge&logo=dbeaver&logoColor=white",
      alt: "DBeaver",
    },
    {
      src: "https://img.shields.io/badge/Elastic_Search-005571?style=for-the-badge&logo=elasticsearch&logoColor=white",
      alt: "Elastic Search",
    },
    {
      src: "https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white",
      alt: "MongoDB",
    },
    {
      src: "https://img.shields.io/badge/firebase-ffca28?style=for-the-badge&logo=firebase&logoColor=black",
      alt: "firebase",
    },
    {
      src: "https://img.shields.io/badge/Amazon%20RDS-527FFF?style=for-the-badge&logo=amazon-rds&logoColor=white",
      alt: "amazon rds",
    },
    {
      src: "https://img.shields.io/badge/PostgreSQL-316192?style=for-the-badge&logo=postgresql&logoColor=white",
      alt: "CSS3",
    },
  ],
  Tools: [
    {
      src: "https://img.shields.io/badge/VSCode-0078D4?style=for-the-badge&logo=visual%20studio%20code&logoColor=white",
      alt: "VSCode",
    },
    {
      src: "https://img.shields.io/badge/GIT-E44C30?style=for-the-badge&logo=git&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/GitHub-100000?style=for-the-badge&logo=github&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Grafana-F2F4F9?style=for-the-badge&logo=grafana&logoColor=orange&labelColor=F2F4F9",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Kibana-005571?style=for-the-badge&logo=Kibana&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Prometheus-000000?style=for-the-badge&logo=prometheus&labelColor=000000",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Zsh-F15A24?style=for-the-badge&logo=Zsh&logoColor=white",
      alt: "zsh",
    },
    {
      src: "https://img.shields.io/badge/Xcode-007ACC?style=for-the-badge&logo=Xcode&logoColor=white",
      alt: "Xcode",
    },
    {
      src: "https://img.shields.io/badge/Android-3DDC84?style=for-the-badge&logo=android&logoColor=white",
      alt: "Android",
    },
    {
      src: "https://img.shields.io/badge/Debian-A81D33?style=for-the-badge&logo=debian&logoColor=white",
      alt: "Debian",
    },
    {
      src: "https://img.shields.io/badge/mac%20os-000000?style=for-the-badge&logo=apple&logoColor=white",
      alt: "macOS",
    },
    {
      src: "https://img.shields.io/badge/Linux-FCC624?style=for-the-badge&logo=linux&logoColor=black",
      alt: "linux",
    },
    {
      src: "https://img.shields.io/badge/ChatGPT-74aa9c?style=for-the-badge&logo=openai&logoColor=white",
      alt: "chatgpt",
    },
    {
      src: "https://img.shields.io/badge/Jupyter-F37626.svg?&style=for-the-badge&logo=Jupyter&logoColor=white",
      alt: "Jupyter",
    },
    {
      src: "https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=Postman&logoColor=white",
      alt: "Postman",
    },
    {
      src: "https://img.shields.io/badge/Safari-FF1B2D?style=for-the-badge&logo=Safari&logoColor=white",
      alt: "Safari",
    },
    {
      src: "https://img.shields.io/badge/Arc-1638FB?style=for-the-badge&logo=Arc&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Node--Red-8F0000?style=for-the-badge&logo=nodered&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Arduino-00979D?style=for-the-badge&logo=Arduino&logoColor=white",
      alt: "Arduino",
    },
    {
      src: "https://img.shields.io/badge/espressif-E7352C?style=for-the-badge&logo=espressif&logoColor=white",
      alt: "ESP32",
    },
    {
      src: "https://img.shields.io/badge/Raspberry%20Pi-A22846?style=for-the-badge&logo=Raspberry%20Pi&logoColor=white",
      alt: "Raspberry Pi",
    },
  ],
  Miscellaneous: [
    {
      src: "https://img.shields.io/badge/Nextcloud-0082C9?style=for-the-badge&logo=Nextcloud&logoColor=white",
      alt: "Node.js",
    },
    {
      src: "https://img.shields.io/badge/Adobe%20after%20affects-CF96FD?style=for-the-badge&logo=Adobe%20after%20effects&logoColor=393665",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Adobe%20Illustrator-FF9A00?style=for-the-badge&logo=adobe%20illustrator&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Adobe%20Premiere%20Pro-9999FF?style=for-the-badge&logo=Adobe%20Premiere%20Pro&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/blender-%23F5792A.svg?style=for-the-badge&logo=blender&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Unsplash-000000?style=for-the-badge&logo=Unsplash&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/solidworks-005386?style=for-the-badge&logo=dassaultsystemes&logoColor=white",
      alt: "CSS3",
    },
    {
      src: "https://img.shields.io/badge/Markdown-000000?style=for-the-badge&logo=markdown&logoColor=white",
      alt: "CSS3",
    },
  ],
};

// Utility function to format category names
const formatCategoryName = (name: string) =>
  name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const TechIconsGrid: React.FC<{ data: IconsGrouped }> = ({ data }) => {
  return (
    <div className="space-y-10">
      {Object.entries(data).map(([category, icons]) => (
        <section key={category}>
          <h2 className="text-xl font-semibold mb-4">
            {formatCategoryName(category)}
          </h2>
          <div className="flex flex-wrap gap-4">
            {icons.map((icon, index) => {
              const isSVG =
                icon.src.endsWith(".svg") || icon.src.includes("shields.io");
              return (
                <div key={index} className="flex items-center justify-center">
                  {isSVG ? (
                    <img
                      src={icon.src}
                      alt={icon.alt}
                      height={130}
                      title={icon.alt}
                      className="transition-transform duration-200 hover:scale-105"
                    />
                  ) : (
                    <Image
                      src={icon.src}
                      alt={icon.alt}
                      width={64}
                      height={64}
                      title={icon.alt}
                      className="transition-transform duration-200 hover:scale-105"
                    />
                  )}
                </div>
              );
            })}
          </div>
        </section>
      ))}
    </div>
  );
};

export default function IconGridPage() {
  return (
    <main>
      <h1 className="text-2xl font-bold mb-8">Worked With</h1>
      <TechIconsGrid data={icons} />
    </main>
  );
}
