import React, { useEffect, useState } from 'react';
import { iconUrlFromCode } from '../services/weatherService';

function Forecast({ title, items }) {
  const [forecastSwitch, setForecastSwitch] = useState();

  useEffect(() => {
    if (title === 'hourly forecast') setForecastSwitch(0);
    else setForecastSwitch(1);
  }, []);

  return (
    <div className='my-10'>
      <div className='flex items-center justify-start'>
        <p className='text-white font-medium uppercase'>{title}</p>
      </div>
      <hr className='my-4' />

      <div className='flex flex-row items-center justify-between text-white'>
        {items.map((item, i) => {
          return (
            <div key={i} className='flex flex-col items-center justify-center'>
              <p className='font-light text-sm'>{item.title}</p>
              <img src={iconUrlFromCode(item.icon)} alt='' className='w-12 my-1' />

              {forecastSwitch ? (
                <p className='font-medium'>
                  {item.temp_min}°<span className='font-extralight'> / </span>
                  {item.temp_max}°
                </p>
              ) : (
                <p className='font-medium'>{item.temp}°</p>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Forecast;
