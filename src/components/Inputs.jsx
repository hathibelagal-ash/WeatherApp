import React, { useState } from 'react';
import { UilSearch, UilLocationPoint } from '@iconscout/react-unicons';

function Inputs({ setQuery, units, setUnits }) {
  const [city, setCity] = useState('');

  const handleClick = () => {
    if (city) setQuery({ q: city });
    setCity('');
  };

  const handleKeyDown = e => {
    if (e.key === 'Enter') handleClick();
  };

  const handleLocationClick = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        let lat = position.coords.latitude;
        let lon = position.coords.longitude;

        setQuery({ lat, lon });
      });
    }
  };

  const handleUnitsClick = e => {
    const currentUnit = e.target.name;
    if (currentUnit !== units) setUnits(currentUnit);
  };

  return (
    <div className='flex flex-row justify-center my-6'>
      <div className='flex flex-row w-3/4 items-center justify-start space-x-4'>
        <input
          value={city}
          onChange={e => setCity(e.target.value)}
          onKeyDown={handleKeyDown}
          type='text'
          placeholder='Search for city...'
          className='text-xl font-light p-2 w-full shadow-xl rounded-lg  focus:outline-none capitalize placeholder:lowercase'
        />
        <UilSearch
          size={25}
          onClick={handleClick}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
        />
        <UilLocationPoint
          size={25}
          onClick={handleLocationClick}
          className='text-white cursor-pointer transition ease-out hover:scale-125'
        />
      </div>
      <div className='flex flex-row w-1/4 items-center justify-end'>
        <button
          name='metric'
          onClick={handleUnitsClick}
          className='text-xl text-white font-light transition ease-out hover:scale-125'
        >
          °C
        </button>
        <p className='text-xl text-white mx-1'>|</p>
        <button
          name='imperial'
          onClick={handleUnitsClick}
          className='text-xl text-white font-light transition ease-out hover:scale-125'
        >
          °F
        </button>
      </div>
    </div>
  );
}

export default Inputs;
