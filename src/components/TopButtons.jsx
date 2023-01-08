import React from 'react';

function TopButtons({ setQuery }) {
  const cities = [
    {
      id: 1,
      title: 'Oslo',
    },
    {
      id: 2,
      title: 'Bergen',
    },
    {
      id: 3,
      title: 'Kristiansand',
    },
    {
      id: 4,
      title: 'Tromsø',
    },
    {
      id: 5,
      title: 'Trondheim',
    },
  ];

  return (
    <div className='flex items-center justify-between'>
      {cities.map(city => {
        return (
          <button
            key={city.id}
            className='text-white text-sm md:text-lg md:font-medium'
            onClick={e => setQuery({ q: city.title })}
          >
            {city.title}
          </button>
        );
      })}
    </div>
  );
}

export default TopButtons;
