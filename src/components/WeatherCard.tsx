import styles from "./styles/WeatherCard.module.css";
import { headers } from "next/headers";

type WeatherCardProps = {
  weather: string;
  temp: number;
  icon: string;
  city: string;
  country: string;
  state: string;
  timezone: number;
};

function kelvinToCelsius(k: number) {
  return Math.round(k - 273.15);
}

function WeatherCard({ weather, temp, city, country }: WeatherCardProps) {
  return (
    <div className={styles.card}>
      {/* <Image src={icon} alt={weather} className={styles.icon} width={100} height={100} /> */}
      <div className={styles.info}>
        <div className={styles.condition}>
          {kelvinToCelsius(temp)}°, {weather}
        </div>
        <div className={styles.details}>
          <span>
            {city}, {country}
          </span>
        </div>
      </div>
    </div>
  );
}

export default async function WeatherWidget() {
  const headersList = await headers();
  const host = headersList.get("host");
  const protocol = process.env.NODE_ENV === "development" ? "http" : "https";
  const res = await fetch(`${protocol}://${host}/api/weather`, {
    cache: "no-store",
  });

  if (!res.ok) {
    return <div>Failed to load weather</div>;
  }

  const weatherData = await res.json();

  return <WeatherCard {...weatherData} />;
}
