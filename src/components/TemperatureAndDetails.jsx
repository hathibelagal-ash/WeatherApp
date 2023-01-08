import React from 'react';
import {
  UilArrowUp,
  UilArrowDown,
  UilTemperature,
  UilTear,
  UilWind,
  UilSun,
  UilSunset,
} from '@iconscout/react-unicons';
import { formatToLocalTime, iconUrlFromCode } from '../services/weatherService';

function TemperatureAndDetails({
  weather: {
    details,
    temp,
    feels_like,
    temp_max,
    temp_min,
    humidity,
    speed,
    sunrise,
    sunset,
    timezone,
    icon,
  },
}) {
  return (
    <div>
      <div className='flex items-center justify-center my-6 text-xl text-cyan-300'>
        <p>{details}</p>
      </div>

      <div className='flex flex-row items-center justify-between text-white my-6'>
        <img src={iconUrlFromCode(icon)} alt='' className='w-20' />

        <p className='text-5xl'>{temp}°</p>

        <div className='flex flex-col space-y-2'>
          <div className='flex font-light text-xs md:text-sm items-center justify-end'>
            <UilTemperature size={18} className='mr-1' /> Real feel:
            <span className='font-medium ml-1'>{feels_like}°</span>
          </div>

          <div className='flex font-light text-xs md:text-sm items-center justify-center'>
            <UilTear size={18} className='mr-1' /> Humidity:
            <span className='font-medium ml-1'>{humidity}%</span>
          </div>

          <div className='flex font-light text-xs md:text-sm items-center justify-center'>
            <UilWind size={18} className='mr-1' /> Wind:
            <span className='font-medium ml-1'>{speed} km/h</span>
          </div>
        </div>
      </div>

      <div className='flex flex-row items-center justify-between text-white text-xs md:text-sm my-6'>
        <div className='flex flex-row justify-center items-center md:space-x-2'>
          <UilSun />
          <p className='font-light'>
            Rise:
            <span className='font-medium mx-1 md:ml-1'>
              {formatToLocalTime(sunrise, timezone, 'HH:mm')}
            </span>
          </p>
        </div>
        <p className='font-light'>|</p>

        <div className='flex flex-row justify-center items-center md:space-x-2'>
          <UilSunset />
          <p className='font-light'>
            Set:
            <span className='font-medium mx-1 md:ml-1'>
              {formatToLocalTime(sunset, timezone, 'HH:mm')}
            </span>
          </p>
        </div>
        <p className='font-light'>|</p>

        <div className='flex flex-row justify-center items-center md:space-x-2'>
          <UilArrowUp />
          <p className='font-light'>
            High: <span className='font-medium mx-1 md:ml-1'>{temp_max}°</span>
          </p>
        </div>
        <p className='font-light'>|</p>

        <div className='flex flex-row justify-center items-center md:space-x-2'>
          <UilArrowDown />
          <p className='font-light'>
            Low: <span className='font-medium ml-1'>{temp_min}°</span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default TemperatureAndDetails;
