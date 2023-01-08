import './App.css';
import TopButtons from './components/TopButtons';
import Inputs from './components/Inputs';
import TimeAndLocation from './components/TimeAndLocation';
import TemperatureAndDetails from './components/TemperatureAndDetails';
import Forecast from './components/Forecast';
import getFormattedWeatherData from './services/weatherService';
import { useEffect, useState } from 'react';
import ForecastChart from './components/ForecastChart';

function App() {
  const [query, setQuery] = useState({ q: 'honefoss' });
  const [units, setUnits] = useState('metric');
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      const data = await getFormattedWeatherData({ ...query, units });
      setWeather(data);
    };

    fetchWeather();
  }, [query, units]);

  return (
    <div className='mx-auto max-w-screen-lg my-10 px-32'>
      <TopButtons setQuery={setQuery} />
      <Inputs setQuery={setQuery} units={units} setUnits={setUnits} />

      {weather && (
        <div>
          <TimeAndLocation weather={weather} />
          <TemperatureAndDetails weather={weather} />

          <Forecast title='hourly forecast' items={weather.hourly} />
          <ForecastChart title='hourly forecast' items={weather.hourly} />

          <Forecast title='daily forecast' items={weather.daily} />
          <ForecastChart title='daily forecast' items={weather.daily} />
        </div>
      )}
    </div>
  );
}

export default App;
