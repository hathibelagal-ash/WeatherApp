import { DateTime } from 'luxon';

const API_KEY = process.env.REACT_APP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';

const getWeatherData = (infoType, searchParams) => {
  const url = new URL(BASE_URL + '/' + infoType);
  url.search = new URLSearchParams({ ...searchParams, appid: API_KEY });

  return fetch(url).then(res => res.json());
};

const formatCurrentWeather = data => {
  const {
    coord: { lat, lon },
    main: { temp, feels_like, temp_min, temp_max, humidity },
    name,
    dt,
    sys: { country, sunrise, sunset },
    weather,
    wind: { speed },
  } = data;

  const { main: details, icon } = weather[0];

  return {
    lat,
    lon,
    temp: Math.round(temp),
    feels_like: Math.round(feels_like),
    temp_min: Math.round(temp_min),
    temp_max: Math.round(temp_max),
    humidity,
    name,
    dt,
    country,
    sunrise,
    sunset,
    details,
    icon,
    speed: Math.round(speed),
  };
};

const formatForecastWeather = data => {
  let { timezone, daily, hourly } = data;

  hourly = hourly.slice(1, 8).map(hour => {
    return {
      title: formatToLocalTime(hour.dt, timezone, 'HH:mm'),
      temp: Math.round(hour.temp),
      icon: hour.weather[0].icon,
    };
  });

  daily = daily.slice(1, 8).map(day => {
    return {
      title: formatToLocalTime(day.dt, timezone, 'ccc'),
      temp: Math.round(day.temp.day),
      temp_min: Math.round(day.temp.min),
      temp_max: Math.round(day.temp.max),
      icon: day.weather[0].icon,
    };
  });

  return { timezone, daily, hourly };
};

const getFormattedWeatherData = async searchParams => {
  const currentWeatherData = await getWeatherData('weather', searchParams);
  const formattedCurrentWeather = formatCurrentWeather(currentWeatherData);

  const { lat, lon } = formattedCurrentWeather;

  const forecastWeatherData = await getWeatherData('onecall', {
    lat,
    lon,
    exclude: 'current, minutely, alerts',
    units: searchParams.units,
  });
  const formattedForecastWeather = formatForecastWeather(forecastWeatherData);

  return { ...formattedCurrentWeather, ...formattedForecastWeather };
};

const formatToLocalTime = (secs, zone, format = "cccc, dd LLL yyyy' | Local time: 'HH:mm") =>
  DateTime.fromSeconds(secs).setZone(zone).toFormat(format);

const iconUrlFromCode = code => `http://openweathermap.org/img/wn/${code}@2x.png`;

export default getFormattedWeatherData;

export { formatToLocalTime, iconUrlFromCode };
