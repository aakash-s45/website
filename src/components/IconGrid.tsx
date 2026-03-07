"use client";

import React from "react";

type SkillsGrouped = {
  [category: string]: string[];
};

const skills: SkillsGrouped = {
  languages_and_frameworks: [
    "Python",
    "C++",
    "Dart",
    "Kotlin",
    "Swift",
    "JavaScript",
    "Flutter",
    "FastAPI",
    "Flask",
    "Next.js",
  ],
  Technologies: [
    "Apache Kafka",
    "Redis",
    "Docker",
    "PostgreSQL",
    "Elasticsearch",
    "MongoDB",
    "Firebase",
    "Amazon RDS",
  ],
  Tools: [
    "VS Code",
    "Git",
    "GitHub",
    "Grafana",
    "Kibana",
    "Prometheus",
    "Xcode",
    "Android Studio",
    "Linux",
    "Arduino",
    "ESP32",
    "Raspberry Pi",
  ],
};

const formatCategoryName = (name: string) =>
  name.replace(/_/g, " ").replace(/\b\w/g, (l) => l.toUpperCase());

const TechIconsGrid: React.FC<{ data: SkillsGrouped }> = ({ data }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
      {Object.entries(data).map(([category, items]) => (
        <section key={category}>
          <h2
            style={{
              fontSize: "0.85rem",
              fontWeight: 600,
              textTransform: "uppercase",
              letterSpacing: "0.08em",
              color: "var(--secondary-text)",
              marginBottom: "0.75rem",
            }}
          >
            {formatCategoryName(category)}
          </h2>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "0.5rem",
            }}
          >
            {items.map((item) => (
              <span
                key={item}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  padding: "0.4rem 0.85rem",
                  fontSize: "0.8rem",
                  fontWeight: 500,
                  color: "var(--primary-text)",
                  backgroundColor: "var(--pill-bg)",
                  border: "1px solid var(--pill-border)",
                  borderRadius: "9999px",
                  transition: "all 0.2s ease",
                  cursor: "default",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor =
                    "var(--pill-bg-hover)";
                  e.currentTarget.style.borderColor =
                    "var(--pill-border-hover)";
                  e.currentTarget.style.transform = "translateY(-1px)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = "var(--pill-bg)";
                  e.currentTarget.style.borderColor = "var(--pill-border)";
                  e.currentTarget.style.transform = "translateY(0)";
                }}
              >
                {item}
              </span>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
};

export default function IconGridPage() {
  return (
    <main>
      <h1
        style={{
          fontSize: "1.5rem",
          fontWeight: 700,
          marginBottom: "1.5rem",
          color: "var(--heading-color)",
        }}
      >
        Worked With
      </h1>
      <TechIconsGrid data={skills} />
    </main>
  );
}
