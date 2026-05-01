import {
  isVehicleFreeWednesday,
  seasonForDate,
  seasonLabel,
  trafficExpectation,
  weekdayForDate,
  type Season,
  type Weekday,
  type WeatherSummary,
} from './best-time';

export type TodaysConditions = {
  date: Date;
  weekday: Weekday;
  formattedDate: string;
  season: Season;
  seasonNote: string;
  vehicleFreeStatus: string;
  vehicleFreeActive: boolean;
  weather: WeatherSummary | null;
  weatherFahrenheit: number | null;
  trafficExpectation: 'light' | 'moderate' | 'heavy';
  trafficNote: string;
};

const CADES_COVE_LAT = 35.6043;
const CADES_COVE_LON = -83.7833;

const WEATHER_CODE_LABELS: Record<number, string> = {
  0: 'Clear sky',
  1: 'Mostly clear',
  2: 'Partly cloudy',
  3: 'Overcast',
  45: 'Fog',
  48: 'Freezing fog',
  51: 'Light drizzle',
  53: 'Drizzle',
  55: 'Heavy drizzle',
  61: 'Light rain',
  63: 'Rain',
  65: 'Heavy rain',
  71: 'Light snow',
  73: 'Snow',
  75: 'Heavy snow',
  80: 'Rain showers',
  81: 'Heavy rain showers',
  82: 'Violent rain showers',
  95: 'Thunderstorms',
  96: 'Thunderstorms with hail',
  99: 'Severe thunderstorms with hail',
};

const RAINY_CODES = new Set([51, 53, 55, 61, 63, 65, 80, 81, 82, 95, 96, 99]);

export async function fetchWeather(): Promise<WeatherSummary | null> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${CADES_COVE_LAT}&longitude=${CADES_COVE_LON}` +
      `&current=temperature_2m,weather_code,precipitation` +
      `&temperature_unit=fahrenheit&timezone=America%2FNew_York`;

    const res = await fetch(url, {
      next: { revalidate: 600 }, // cache 10 minutes
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return null;
    const data = await res.json();
    const current = data?.current;
    if (!current) return null;

    const code = current.weather_code as number;
    return {
      conditionLabel: WEATHER_CODE_LABELS[code] ?? 'Conditions unknown',
      rainExpected: RAINY_CODES.has(code),
    };
  } catch {
    return null;
  }
}

export async function fetchWeatherWithTemp(): Promise<{
  summary: WeatherSummary | null;
  temperature: number | null;
}> {
  try {
    const url =
      `https://api.open-meteo.com/v1/forecast` +
      `?latitude=${CADES_COVE_LAT}&longitude=${CADES_COVE_LON}` +
      `&current=temperature_2m,weather_code,precipitation` +
      `&temperature_unit=fahrenheit&timezone=America%2FNew_York`;

    const res = await fetch(url, {
      next: { revalidate: 600 },
      signal: AbortSignal.timeout(5000),
    });
    if (!res.ok) return { summary: null, temperature: null };
    const data = await res.json();
    const current = data?.current;
    if (!current) return { summary: null, temperature: null };

    const code = current.weather_code as number;
    return {
      summary: {
        conditionLabel: WEATHER_CODE_LABELS[code] ?? 'Conditions unknown',
        rainExpected: RAINY_CODES.has(code),
      },
      temperature: typeof current.temperature_2m === 'number' ? Math.round(current.temperature_2m) : null,
    };
  } catch {
    return { summary: null, temperature: null };
  }
}

export async function getTodaysConditions(now: Date = new Date()): Promise<TodaysConditions> {
  const weekday = weekdayForDate(now);
  const season = seasonForDate(now);
  const vehicleFree = isVehicleFreeWednesday(now);

  const formattedDate = new Intl.DateTimeFormat('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    timeZone: 'America/New_York',
  }).format(now);

  const { summary, temperature } = await fetchWeatherWithTemp();
  const traffic = trafficExpectation(weekday, season);

  return {
    date: now,
    weekday,
    formattedDate,
    season,
    seasonNote: seasonLabel(season),
    vehicleFreeActive: vehicleFree,
    vehicleFreeStatus: vehicleFree
      ? 'Vehicle-free until 10am — walkers and bikes only'
      : 'Vehicles allowed all day',
    weather: summary,
    weatherFahrenheit: temperature,
    trafficExpectation: traffic,
    trafficNote: trafficNote(traffic, weekday, season),
  };
}

function trafficNote(
  level: 'light' | 'moderate' | 'heavy',
  day: Weekday,
  _season: Season,
): string {
  if (level === 'heavy') {
    return `Expect long backups between 10am and 3pm. Sunrise or after 5pm is your friend.`;
  }
  if (level === 'moderate') {
    if (day === 'Saturday' || day === 'Sunday') {
      return `Weekend crowds will build by mid-morning. Plan around the 10am–2pm peak.`;
    }
    return `Steady mid-day traffic but rarely a true backup. Bear jams are still possible.`;
  }
  return `Light traffic through most of the day — a good day to take your time.`;
}
