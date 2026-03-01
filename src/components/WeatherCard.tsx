import styles from "./styles/WeatherCard.module.css";
import { getWeatherData } from "../app/api/weather/route";

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
  let weatherData;

  try {
    weatherData = await getWeatherData();
  } catch {
    return <div>Failed to load weather</div>;
  }

  return <WeatherCard {...weatherData} />;
}
