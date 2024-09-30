// src/components/SelledCharts.jsx
import React from 'react';
import SelledChart from './SelledChart';

export default function SelledCharts() {
  // Define your chart data
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Sales',
        data: [65, 59, 80, 81, 56, 55, 40],
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
      <SelledChart data={data} />
    </>
  );
}

