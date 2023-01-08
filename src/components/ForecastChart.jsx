import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Filler,
  Legend
);

function ForecastChart({ title, items }) {
  const labels = items.map(item => {
    return item.title;
  });

  const options = {
    scales: {
      y: {
        ticks: { color: 'white', stepSize: 1 },
        grace: '5%',
        grid: {
          tickColor: 'transparent',
        },
        border: {
          display: true,
          color: 'white',
        },
      },
      x: {
        ticks: { color: 'white' },
        grid: {
          tickColor: 'transparent',
        },
        border: {
          color: 'white',
        },
      },
    },
    plugins: {
      legend: false,
    },
  };

  const data = {
    labels,
    datasets: [
      {
        fill: false,
        label: title,
        data: items.map(item => {
          return item.temp;
        }),
        borderWidth: 2,
        borderColor: 'cyan',
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
        tension: 0.3,
      },
    ],
  };

  return (
    <div>
      <Line options={options} data={data} />
    </div>
  );
}

export default ForecastChart;
